<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userCount = User::count();

        return Inertia::render('dashboard', [  // Make sure this matches the case of your file
            'userCount' => $userCount,
        ]);
    }
}