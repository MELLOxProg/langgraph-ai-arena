import { useState, useRef, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { SAMPLE_DATA } from './data/sampleData'

// Unique ID generator
let msgId = 0
const nextId = () => ++msgId

function App() {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: 'Two Sum — Hash Map Solution',
      messages: [
        {
          id: nextId(),
          type: 'user',
          text: SAMPLE_DATA.problem,
          timestamp: 'Today at 10:21',
        },
        {
          id: nextId(),
          type: 'arena',
          solution1: SAMPLE_DATA.solution_1,
          solution2: SAMPLE_DATA.solution_2,
          judge: SAMPLE_DATA.judge,
          problem: SAMPLE_DATA.problem,
          timestamp: 'Today at 10:22',
        },
      ],
    },
  ])
  const [activeChatId, setActiveChatId] = useState(1)
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const activeChat = chats.find((c) => c.id === activeChatId)

  const handleNewChat = () => {
    const id = Date.now()
    setChats((prev) => [
      { id, title: 'New Arena Match', messages: [] },
      ...prev,
    ])
    setActiveChatId(id)
  }

  const handleSend = () => {
    if (!inputText.trim() || isLoading) return

    const userMsg = {
      id: nextId(),
      type: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }

    const isNewChat = activeChat?.messages?.length === 0

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              title: isNewChat
                ? inputText.trim().slice(0, 48) + (inputText.length > 48 ? '…' : '')
                : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    )
    setInputText('')
    setIsLoading(true)

    setTimeout(() => {
      const arenaMsg = {
        id: nextId(),
        type: 'arena',
        solution1: SAMPLE_DATA.solution_1,
        solution2: SAMPLE_DATA.solution_2,
        judge: SAMPLE_DATA.judge,
        problem: inputText.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? { ...c, messages: [...c.messages, arenaMsg] }
            : c
        )
      )
      setIsLoading(false)
    }, 1800)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
      />
      <ChatArea
        chat={activeChat}
        isLoading={isLoading}
        inputText={inputText}
        onInputChange={setInputText}
        onSend={handleSend}
      />
    </div>
  )
}

export default App
