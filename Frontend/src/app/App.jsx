import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import { ToastProvider } from './components/Toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Protected from '../features/auth/components/Protected'
import { useAuth } from '../features/auth/hooks/useAuth'

const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3000`

let msgId = 0
const nextId = () => ++msgId

function App() {
  const { user, handleLogout } = useAuth()
  const [chats, setChats] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const activeChat = chats.find((c) => c.id === activeChatId)

  useEffect(() => {
    if (!user) return
    axios.get(`${API_BASE_URL}/api/chats`, { withCredentials: true }).then(({ data }) => {
      const loaded = data.chats.map((chat) => ({ id: chat._id, title: chat.title, messages: [] }))
      setChats(loaded); setActiveChatId(loaded[0]?.id || null)
    })
  }, [user])

  const handleNewChat = () => {
    const id = `draft-${Date.now()}`
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

    const isNewChat = !activeChatId || activeChat?.messages?.length === 0
    const localChatId = activeChatId || `draft-${Date.now()}`
    const localTitle = isNewChat
      ? problem.slice(0, 48) + (problem.length > 48 ? '…' : '')
      : activeChat.title

    setChats((prev) => {
      const existingChat = prev.find((chat) => chat.id === localChatId)
      if (existingChat) {
        return prev.map((chat) => chat.id === localChatId
          ? { ...chat, title: localTitle, messages: [...chat.messages, userMsg] }
          : chat)
      }
      return [{ id: localChatId, title: localTitle, messages: [userMsg] }, ...prev]
    })
    setActiveChatId(localChatId)
    setInputText('')
    setIsLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chats/message`, { message: problem, ...(localChatId.startsWith('draft-') ? {} : { chat: localChatId }) }, { withCredentials: true })
      const result = response.data.data
      const chatId = response.data.chat._id
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
          c.id === localChatId
            ? { ...c, id: chatId, title: response.data.chat.title, messages: [...c.messages, arenaMsg] }
            : c
        )
      )
        setActiveChatId(chatId)
      } catch (error) {
        console.error('Failed to invoke arena graph:', error)
        try {
          const { data } = await axios.get(`${API_BASE_URL}/api/chats`, { withCredentials: true })
          setChats((data.chats || []).map((chat) => ({ id: chat._id, title: chat.title, messages: [] })))
        } catch (refreshError) {
          console.error('Failed to refresh chats:', refreshError)
        }
      } finally {
        setIsLoading(false)
      }
  }

  async function selectChat(id) {
    setActiveChatId(id)
    const { data } = await axios.get(`${API_BASE_URL}/api/chats/${id}/messages`, { withCredentials: true })
    const messages = data.messages.map((message) => message.role === 'user'
      ? { id: nextId(), type: 'user', text: message.content }
      : (() => {
          const result = JSON.parse(message.content)
          return {
            id: nextId(),
            type: 'arena',
            solution1: result.solution_1,
            solution2: result.solution_2,
            judge: result.judge,
            problem: result.problem,
          }
        })())
    setChats((current) => current.map((chat) => chat.id === id ? { ...chat, messages } : chat))
  }

  return <Routes><Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} /><Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} /><Route path="/" element={<Protected><ToastProvider><div className="flex h-screen w-screen overflow-hidden bg-canvas"><Sidebar chats={chats} activeChatId={activeChatId} onSelectChat={selectChat} onNewChat={handleNewChat} onLogout={handleLogout} /><ChatArea chat={activeChat} isLoading={isLoading} inputText={inputText} onInputChange={setInputText} onSend={handleSend} /></div></ToastProvider></Protected>} /></Routes>
}

export default App
