<?php

namespace App\Http\Controllers;
use App\Models\Conversation;                                            
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;    

class ChatController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user(); // Use once and reuse

        // Get or create a conversation for this user (add more matching if needed)
        $conversation = $user->conversations()->firstOrCreate([
            'user_id' => $user->id, // Make sure this exists in the conversations table
        ]);

        $messages = $conversation->messages()->with('sender')->get();

        return inertia('chat/userChart', [
            'conversation' => $conversation,
            'messages' => $messages,
        ]);
    }

    public function store(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $conversation = $user->conversations()->first();

        $conversation->messages()->create([
            'sender_id' => $user->id,
            'message' => $request->message,
        ]);

        return redirect()->back();
    }
}