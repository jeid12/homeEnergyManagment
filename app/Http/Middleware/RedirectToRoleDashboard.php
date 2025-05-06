<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // ✅ make sure this is imported

class RedirectToRoleDashboard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle($request, Closure $next)
    {
        /** @var \App\Models\User $user */  // ✅ This tells Intelephense what $user is
        $user = Auth::user();

        if ($user) {
            if ($user->hasRole('admin')) {
                return redirect()->route('admin.dashboard');
            } elseif ($user->hasRole('client')) {
                return redirect()->route('client.dashboard');
            }
        }

        return $next($request);
    }
}