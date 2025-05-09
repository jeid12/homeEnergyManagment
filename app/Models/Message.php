<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'conversation_id', // Assuming you have this as well
        'sender_id',        // Allow mass assignment for sender_id
        'message',          // Add any other fields you want to mass-assign
    ];
    public function conversation()
{
    return $this->belongsTo(Conversation::class);
}

public function sender()
{
    return $this->belongsTo(User::class, 'sender_id');
}

}