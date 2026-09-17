import Sidebar from '../components/Sidebar'
import ChatArea from '../components/ChatArea'
import { ToastProvider } from '../components/Toast'

export default function MainLayout({
  chats,
  activeChatId,
  inputText,
  isLoading,
  activeChat,
  user,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onInputChange,
  onSend,
  onExport,
  onLogout,
}) {
  return (
    <ToastProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-canvas">
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={onSelectChat}
          onNewChat={onNewChat}
          onDeleteChat={onDeleteChat}
          onLogout={onLogout}
          username={user?.username}
        />
        <ChatArea
          chat={activeChat}
          isLoading={isLoading}
          inputText={inputText}
          onInputChange={onInputChange}
          onSend={onSend}
          onExport={onExport}
        />
      </div>
    </ToastProvider>
  )
}
