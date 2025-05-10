import { useState } from 'react'
import AppLayout from '@/layouts/app-layout-client'
import { Head } from '@inertiajs/react'
import axios from 'axios'


export default function AdminChat({ conversation, messages }) {
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    await axios.post(
        route('admin.chat.reply', conversation.id),
        { message: newMessage }
      )

    setNewMessage('')
    location.reload() // Refresh to see new message
  }

  return (
    <AppLayout>
      <Head title={`Chat with ${conversation.user.name}`} />

      <div className="p-6 flex flex-col gap-6">
        <h2 className="text-xl font-semibold">Chat with {conversation.user.name}</h2>

        <div className="bg-gray-100 rounded-lg p-4 h-96 overflow-y-auto flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender.id === conversation.user_id ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`p-3 rounded-lg max-w-xs ${msg.sender.id === conversation.user_id ? 'bg-white' : 'bg-blue-500 text-white'}`}>
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex gap-3">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type your reply..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </AppLayout>
  )
}
