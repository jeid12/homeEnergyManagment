import AppLayout from '@/layouts/app-layout-client'
import { Head, Link } from '@inertiajs/react'

export default function AdminInbox({ conversations }) {
  return (
    <AppLayout>
      <Head title="Admin Inbox" />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Inbox</h1>

        <div className="space-y-4">
          {conversations.length === 0 ? (
            <p>No conversations yet.</p>
          ) : (
            conversations.map((conv) => (
              <Link
                key={conv.id}
                href={route('admin.chat.show', conv.id)} // ✅ Corrected route name
                className="block p-4 border rounded-lg hover:bg-gray-100"
              >
                <div className="font-semibold">{conv.user.name}</div>
                <div className="text-sm text-gray-500">
                  Conversation ID: {conv.id}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  )
}
