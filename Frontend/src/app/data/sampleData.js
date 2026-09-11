export const SAMPLE_DATA = {
  problem: `You are given an array of integers and a target integer.

Write a JavaScript function that returns the indices of two numbers whose sum equals the target.

Requirements:
- Return the indices of the two numbers.
- You may not use the same array element twice.
- Aim for better than O(n²) time complexity.
- Handle edge cases appropriately.

Also provide Jest test cases and briefly explain the time and space complexity.`,

  solution_1: `**Solution Overview**

We can solve the classic "two‑sum" problem in linear time by scanning the array once while keeping a map (\`value → index\`) of the numbers we have already seen.

For each element \`num\` at position \`i\` we compute the complement  
\`complement = target - num\`.  
If the complement is already in the map, we have found the two required indices:
\`[map.get(complement), i]\`.  
Otherwise we store the current value and its index for future look‑ups.

Because we only ever insert/look‑up in a plain JavaScript \`Map\`, both operations are **O(1)** on average, giving an overall **O(n)** time algorithm and **O(n)** extra space.

---

## Implementation (ES‑2023)

\`\`\`js
// twoSum.js
/**
 * Returns the indices of the two numbers whose sum equals the target.
 *
 * @param {number[]} nums   - Input array of integers (may contain duplicates).
 * @param {number}   target - Desired sum.
 * @returns {number[]}      - Array with two indices, e.g. [i, j].
 *                            Returns an empty array if no such pair exists.
 *
 * @throws {TypeError} If \`nums\` is not an array or \`target\` is not a number.
 */
function twoSum(nums, target) {
  // ----- validation ---------------------------------------------------------
  if (!Array.isArray(nums)) {
    throw new TypeError('First argument must be an array of numbers.');
  }
  if (typeof target !== 'number' || Number.isNaN(target)) {
    throw new TypeError('Second argument must be a valid number.');
  }

  // ----- core algorithm ------------------------------------------------------
  const seen = new Map(); // value → index

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (typeof current !== 'number' || Number.isNaN(current)) {
      continue; // skip invalid entries
    }

    const complement = target - current;

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    if (!seen.has(current)) {
      seen.set(current, i);
    }
  }

  return []; // No pair found
}

module.exports = { twoSum };
\`\`\`

## Complexity Analysis

| Aspect        | Description                          |
|---------------|--------------------------------------|
| **Time**      | One pass through \`nums\` → **O(n)** |
| **Space**     | At most one entry per distinct number → **O(n)** |
| **Best case** | O(1) extra work if pair is found early |
| **Worst case**| No pair exists → full scan → O(n) time, O(n) space |

## Jest Test Suite

\`\`\`js
// twoSum.test.js
const { twoSum } = require('./twoSum');

describe('twoSum', () => {
  test('basic example', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  test('duplicate values that form the target', () => {
    expect(twoSum([3, 3, 4, 5], 6)).toEqual([0, 1]);
  });

  test('no solution returns empty array', () => {
    expect(twoSum([1, 2, 3], 7)).toEqual([]);
  });

  test('negative numbers', () => {
    expect(twoSum([-3, 4, 1, 2], 1)).toEqual([0, 2]);
  });

  test('throws on invalid first argument', () => {
    expect(() => twoSum('not an array', 5)).toThrow(TypeError);
  });

  test('throws on invalid second argument', () => {
    expect(() => twoSum([1, 2, 3], '5')).toThrow(TypeError);
  });
});
\`\`\``,

  solution_2: `Below is a concise JavaScript function that solves the Two Sum problem in O(n) time using a hash map approach.

### JavaScript Function

\`\`\`javascript
/**
 * Returns the indices of two numbers in the array that sum up to the target.
 * @param {number[]} nums - The array of integers.
 * @param {number} target - The target sum.
 * @returns {number[]|null} - The indices of the two numbers, or null if no such pair exists.
 */
function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }

    return null;
}
\`\`\`

### Jest Test Cases

\`\`\`javascript
const { twoSum } = require('./twoSum');

test('finds correct indices for valid input', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
});

test('returns null for no valid pair', () => {
    expect(twoSum([2, 7, 11, 15], 20)).toBeNull();
});

test('handles edge cases', () => {
    expect(twoSum([], 0)).toBeNull();
    expect(twoSum([0], 0)).toBeNull();
    expect(twoSum([1, 2, 3], 7)).toBeNull();
});
\`\`\`

### Complexity Analysis

**Time Complexity:** The function iterates through the array once with O(1) Map lookups → **O(n)** overall.

**Space Complexity:** The Map stores at most all elements → **O(n)**.

### Edge Case Handling
- Empty array → returns \`null\`
- No pair found → returns \`null\`  
- Duplicate numbers handled correctly (e.g., \`[3, 3]\` with target \`6\` → \`[0, 1]\`)`,

  judge: {
    solution_1_score: 7,
    solution_2_score: 10,
    solution_1_feedback:
      "Solution 1 provides a good implementation of two-sum with O(n) time complexity and extra input validation. However, there is a bug in the Jest test suite: in the test 'pair at the end of the array', the test expects [2, 4] for input ([1, 3, 5, 7, 9], 16). The numbers at indices 2 and 4 are 5 and 9 (sum 14), whereas the actual correct indices are 3 and 4 (7 + 9 = 16). The code comment acknowledges this typo but the test code itself was not corrected, causing the test suite to fail.",
    solution_2_feedback:
      'Solution 2 is concise, completely accurate, and satisfies all requirements. The JavaScript implementation correctly achieves O(n) time and space complexity, edge cases are properly handled, and all provided Jest test cases are correct and pass.',
  },
}
