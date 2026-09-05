import { StateGraph, type GraphNode, StateSchema, START, END, type CompiledStateGraph  } from "@langchain/langgraph";
import z from "zod";
import { geminiModel, cohereModel, groqModel } from "./model.ai.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";

const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_feedback: z.string().default(""),
    solution_2_feedback: z.string().default(""),
  }),
});

const solutionNode: GraphNode<typeof state> = async (state) => {
    const [groqResponse, cohereResponse] = await Promise.all([
        groqModel.invoke(state.problem),
        cohereModel.invoke(state.problem)
    ])
    return {
        solution_1: groqResponse.text,
        solution_2: cohereResponse.text,
    }
};


const judgeNode: GraphNode<typeof state> = async (state) => {
  const { problem, solution_1, solution_2 } = state

  const judge = createAgent({
    model: geminiModel,
    responseFormat: providerStrategy(z.object({
      solution_1_score: z.number().min(0).max(10),
      solution_2_score: z.number().min(0).max(10),
      solution_1_feedback: z.string(),
      solution_2_feedback: z.string(),
    })),
    systemPrompt: `
You are an impartial and strict judge evaluating two answers generated
independently by two different AI models in response to the same user problem.

Each answer represents a competing solution from a different AI model.
Evaluate both answers solely on their quality and merits. Do not favor either
answer based on its position, writing style, length, or assumed model identity.

Evaluate each solution independently and score it from 0 to 10.

Your primary priority is correctness and whether the answer successfully
solves the user's original problem.

Evaluate the solutions using these criteria where applicable:

1. Correctness and factual accuracy
   - Verify reasoning, claims, calculations, conclusions, and answers.
   - Identify logical errors, contradictions, unsupported claims, or mistakes.

2. Requirement compliance
   - Determine whether the answer follows all instructions and requirements
     given in the original problem.

3. Reasoning and problem-solving quality
   - Evaluate whether the reasoning is logically sound and the approach is
     appropriate for the problem.

4. Completeness
   - Determine whether important parts of the problem were left unanswered.

5. Clarity and usefulness
   - Evaluate whether the answer is understandable, relevant, and useful.

When evaluating programming or technical solutions, also consider:
- Correctness of implementation
- Edge cases
- Algorithm efficiency
- Validity of tests and technical claims

Do not reward an answer simply for being longer, more verbose, or containing
more detail.

A concise correct answer should score higher than a verbose answer containing
errors or unnecessary information.

Do not assume either AI model's answer is correct. Carefully evaluate the
actual content of both answers.

If both solutions are correct, score them based on quality, completeness,
clarity, and how well they satisfy the user's request.

Provide concise, specific feedback explaining the score for each solution.
`
  });
  const judgeResponse = await judge.invoke({
    messages: [
  new HumanMessage(`
                Problem: ${problem}
                Solution 1: ${solution_1}
                Solution 2: ${solution_2}
                Please evaluate the solutions and provide scores and reasoning.
                `)
    ]
  })

  const { solution_1_score, solution_2_score, solution_1_feedback, solution_2_feedback } = judgeResponse.structuredResponse

  return  {
    judge: {
      solution_1_score,
      solution_2_score,
      solution_1_feedback,
      solution_2_feedback
    }
  }
}


const graph = new StateGraph(state)
.addNode("solution", solutionNode)
.addNode("judge_node", judgeNode)
.addEdge(START, "solution")
.addEdge("solution", "judge_node")
.addEdge("judge_node",END)
.compile()


export default async function runGraph(problem:string) {
  const result = await graph.invoke({
    problem: problem
  })
  return result
  
}