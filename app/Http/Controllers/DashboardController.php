<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



use App\Models\User;
use App\Models\Device;
use App\Models\Sensor;  
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userCount = User::count();
        $deviceCount = Device::count();
        $totlaEnergyConsumed = Device::sum('total_energy_consumed');
        $sensor= Sensor::count();

        return Inertia::render('dashboard', [  // Make sure this matches the case of your file
            'userCount' => $userCount,
            'deviceCount' => $deviceCount,
            'totalEnergyConsumed' => $totlaEnergyConsumed,
            'sensors' => $sensor,
           
            
        ]);
    }
}