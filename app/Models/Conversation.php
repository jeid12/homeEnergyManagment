<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = [
        'user_id', // Allow mass assignment for user_id
        // Add other fields as necessary
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}

public function messages()
{
    return $this->hasMany(Message::class);
}

}