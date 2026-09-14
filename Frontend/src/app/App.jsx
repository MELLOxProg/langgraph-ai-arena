import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { SAMPLE_DATA } from './data/sampleData'
import { ToastProvider } from './components/Toast'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

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

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return

    const problem = inputText.trim()
    const userMsg = {
      id: nextId(),
      type: 'user',
      text: problem,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }

    const isNewChat = activeChat?.messages?.length === 0

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              title: isNewChat
                ? problem.slice(0, 48) + (problem.length > 48 ? '…' : '')
                : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    )
    setInputText('')
    setIsLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/invoke`, { input: problem })
      const result = response.data.data
      const arenaMsg = {
        id: nextId(),
        type: 'arena',
        solution1: result.solution_1,
        solution2: result.solution_2,
        judge: result.judge,
        problem,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      }
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? { ...c, messages: [...c.messages, arenaMsg] }
            : c
        )
      )
      } catch (error) {
        console.error('Failed to invoke arena graph:', error)
      } finally {
        setIsLoading(false)
      }
  }

  return (
    <ToastProvider>
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
    </ToastProvider>
  )
}

export default App
