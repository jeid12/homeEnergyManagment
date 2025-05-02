<?php
/*
 * This file is part of the Smart Home Management System.
 *
 * (c) Your Name <*/

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Device extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'device_type',
        'serial_number',
        'mac_address',
        'ip_address',
        'firmware_version',
        'last_active_at',
        'current_power_usage',
        'total_energy_consumed',
        'usage_log',
        'user_id',
        'location',
        'is_active',
        'is_online',
        'predictions',
        'anomaly_score',
    ];

    protected $casts = [
        'usage_log' => 'array',
        'predictions' => 'array',
        'last_active_at' => 'datetime',
        'is_active' => 'boolean',
        'is_online' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}