<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'location',
        'unit',
        'status',
        'last_reading',
        'device_id',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}