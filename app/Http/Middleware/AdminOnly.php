<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;


class AdminOnly
{
    public function handle($request, Closure $next)
    
    {

            /** @var \App\Models\User $user */  // ✅ This tells Intelephense what $user is
            $user = Auth::user();
        

        if ( !$user->hasRole('admin')) {
            abort(403, 'Access denied');
        }

        return $next($request);
    }
}