<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;
use App\Models\User;

class NewUserRegistered extends Notification 
{
    

    public $newUser;

    public function __construct(User $newUser)
    {
        $this->newUser = $newUser;
    }

    public function via($notifiable)
    {
        return ['mail', 'database', 'broadcast'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New User Registered')
            ->greeting('Hello Admin!')
            ->line('A new user has registered:')
            ->line('Name: ' . $this->newUser->name)
            ->line('Email: ' . $this->newUser->email)
            ->action('View Users', url('/users'))
            ->line('Thank you for using our system!');
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => 'New user registered: ' . $this->newUser->name,
            'user_id' => $this->newUser->id,
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'message' => 'New user registered: ' . $this->newUser->name,
            'user_id' => $this->newUser->id,
        ]);
    }
}