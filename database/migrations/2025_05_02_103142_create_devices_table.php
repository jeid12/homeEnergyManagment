<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('device_type');
            $table->string('serial_number')->unique();
            $table->string('mac_address')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('firmware_version')->nullable();
            $table->timestamp('last_active_at')->nullable();

            $table->float('current_power_usage')->nullable(); // in watts
            $table->float('total_energy_consumed')->default(0); // in kWh
            $table->json('usage_log')->nullable(); // optional

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('location')->nullable();

            $table->boolean('is_active')->default(true);
            $table->boolean('is_online')->default(false);

            $table->json('predictions')->nullable(); // for AI/ML predictions
            $table->float('anomaly_score')->nullable(); // for AI/ML scoring

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};