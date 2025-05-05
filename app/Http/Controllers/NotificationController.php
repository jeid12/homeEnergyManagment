<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $notifications = $user->notifications()->latest()->get();

        return Inertia::render('notifications/index', [
            'notifications' => $notifications
        ]);
    }

    public function markAsRead(Request $request, $id)
    {
        $user = $request->user();
        $notification = $user->notifications()->findOrFail($id);
        $notification->markAsRead();

        return redirect()->back()->with('success', 'Notification marked as read');
    }

    public function markAllAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return redirect()->back()->with('success', 'All notifications marked as read');
    }
}