import { useState } from 'react'
import AppLayout from '@/layouts/app-layout-client'
import { type BreadcrumbItem } from '@/types'
import { Head, router } from '@inertiajs/react'
import { TrendingUp } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'User Problem',
    href: '/user-problems', // Update the link as needed
  },
]

export default function UserChat({ conversation, messages }) {
  const [newMessage, setNewMessage] = useState('')

  // Handle sending a message
  const sendMessage = async (e) => {
    e.preventDefault()

    // Only send a message if it's not empty
    if (!newMessage.trim()) return

    // Send the message to the backend
    await router.post(route('chat.store'), {
      message: newMessage,
    })

    // Clear the message input field after sending
    setNewMessage('')
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Problem Chat" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <TrendingUp />
          <h2 className="text-xl font-semibold">Your Conversation</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex flex-col gap-4 overflow-y-auto h-96 p-4 bg-gray-100 rounded-xl">
          {messages.map((message:any) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender.id === conversation.user_id
                  ? 'justify-end'
                  : 'justify-start'
              } `}
            >
              <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
                <span>{message.message}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex gap-3">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg border border-gray-300"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
