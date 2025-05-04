<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sensors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // e.g., temperature, voltage, current, etc.
            $table->string('location')->nullable(); // where the sensor is installed
            $table->string('unit')->default(''); // e.g., °C, V, A, kWh
            $table->enum('status', ['active', 'inactive', 'error'])->default('active');
            $table->float('last_reading')->nullable(); // optional for dashboard snapshot
            $table->foreignId('device_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sensors');
    }
};