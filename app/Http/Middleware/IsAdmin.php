<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
           /** @var \App\Models\User $user */  // ✅ This tells Intelephense what $user is
           $user = Auth::user();
        if (Auth::check() && $user->hasRole('admin')) {
            return $next($request);
        }

        abort(403, 'Unauthorized');
    
    }
}