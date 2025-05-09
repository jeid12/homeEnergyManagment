<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conversation;
use Illuminate\Support\Facades\Auth;
use App\Models\Message;                                                     

class AdminChatController extends Controller
{
    public function index()
{
    $conversations = Conversation::with('user')->latest()->get();
    return inertia('Chat/AdminInbox', compact('conversations'));
}

public function show(Conversation $conversation)
{
    $messages = $conversation->messages()->with('sender')->get();
    return inertia('Chat/AdminChat', [
        'conversation' => $conversation,
        'messages' => $messages,
    ]);
}

public function reply(Request $request, Conversation $conversation)
{
      /** @var \App\Models\User $user */
      $user = Auth::user(); // Use once and reuse

    $conversation->messages()->create([
        'sender_id' => $user->id,
        'message' => $request->message,
    ]);

    return redirect()->back();
}


}