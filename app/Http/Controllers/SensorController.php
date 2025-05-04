<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use App\Models\Device;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SensorController extends Controller
{
    // Display all sensors
    public function index()
    {
        $sensors = Sensor::with('device')->get();

        return Inertia::render('sensors/index', [
            'sensors' => $sensors,
        ]);
    }

    // Show form to create a new sensor
    public function create()
    {
        $devices = Device::all(); // For dropdown selection

        return Inertia::render('sensors/create', [
            'devices' => $devices,
        ]);
    }

    // Store new sensor
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'location' => 'nullable|string',
            'unit' => 'required|string',
            'status' => 'required|in:active,inactive,error',
            'last_reading' => 'nullable|numeric',
            'device_id' => 'required|exists:devices,id',
        ]);

        Sensor::create($validated);

        return redirect()->route('sensors.index')->with('success', 'Sensor created successfully.');
    }

    // Show a single sensor
    public function show(Sensor $sensor)
    {
        $sensor->load('device');

        return Inertia::render('sensors/show', [
            'sensor' => $sensor,
        ]);
    }

    // Show form to edit a sensor
    public function edit(Sensor $sensor)
    {
        $devices = Device::all();

        return Inertia::render('sensors/edit', [
            'sensor' => $sensor,
            'devices' => $devices,
        ]);
    }

    // Update a sensor
    public function update(Request $request, Sensor $sensor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'location' => 'nullable|string',
            'unit' => 'required|string',
            'status' => 'required|in:active,inactive,error',
            'last_reading' => 'nullable|numeric',
            'device_id' => 'required|exists:devices,id',
        ]);

        $sensor->update($validated);

        return redirect()->route('sensors.index')->with('success', 'Sensor updated successfully.');
    }

    // Delete a sensor
    public function destroy(Sensor $sensor)
    {
        $sensor->delete();

        return redirect()->route('sensors.index')->with('success', 'Sensor deleted successfully.');
    }
}