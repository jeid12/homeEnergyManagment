<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index()
    {
        //get all devices
        $devices= Device::with('user')->get();

        return Inertia::render('devices/index', [
            'devices' => $devices,
        ]);
    }

    public function create()
    {
        return Inertia::render('devices/create', [
            'users' => User::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'device_type' => 'required|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'mac_address' => 'nullable|string|max:255',
            'ip_address' => 'nullable|ip',
            'firmware_version' => 'nullable|string|max:100',
            'last_active_at' => 'nullable|date',
            'current_power_usage' => 'nullable|numeric',
            'total_energy_consumed' => 'nullable|numeric',
            'usage_log' => 'nullable|array',
            'predictions' => 'nullable|array',
            'anomaly_score' => 'nullable|numeric',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'is_online' => 'boolean',
        ]);

        Device::create($validated);

        return redirect()->route('devices.index')->with('success', 'Device created successfully.');
    }

    public function edit(Device $device)
    {
        return Inertia::render('devices/edit', [
            'device' => $device,
            'users' => User::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, Device $device)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'device_type' => 'required|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'mac_address' => 'nullable|string|max:255',
            'ip_address' => 'nullable|ip',
            'firmware_version' => 'nullable|string|max:100',
            'last_active_at' => 'nullable|date',
            'current_power_usage' => 'nullable|numeric',
            'total_energy_consumed' => 'nullable|numeric',
            'usage_log' => 'nullable|array',
            'predictions' => 'nullable|array',
            'anomaly_score' => 'nullable|numeric',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'is_online' => 'boolean',
        ]);

        $device->update($validated);

        return redirect()->route('devices.index')->with('success', 'Device updated successfully.');
    }

    public function destroy(Device $device)
    {
        $device->delete();

        return redirect()->route('devices.index')->with('success', 'Device deleted.');
    }
    public function show($id)
{
    $device = Device::findOrFail($id);
    $assignedUser = $device->user()->select('id', 'name')->first(); // Adjust if your relation name is different

    return Inertia::render('devices/show', [
        'device' => [
            'id' => $device->id,
            'name' => $device->name,
            'type' => $device->device_type,
            'status' => $device->is_active ? 'Active' : 'Inactive',
            'serial_number' => $device->serial_number,
        ],
        'assignedUser' => $assignedUser,
    ]);
}
}