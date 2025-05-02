<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles')->get();

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all(); // Spatie roles
        return Inertia::render('users/create', [
            'roles' => $roles
        ]);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id' => 'required|exists:roles,id',
        ]);
    
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);
    
        $user->assignRole(Role::find($validated['role_id'])->name);
    
        return to_route('users.index')->with('success', 'User created successfully.');
    }

    
    public function edit(User $user)
{
    $roles = Role::all();

    // Get the current role ID (assuming one role per user)
    $user->role_id = $user->roles()->first()?->id;

    return Inertia::render('users/edit', [
        'user' => $user,
        'roles' => $roles,
    ]);
}

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('roles'); // Load roles relationship
    
        return Inertia::render('users/show', [
            'user' => $user,
            'role' => $user->roles->first(), // assuming one role per user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6',
            'role_id' => 'required|exists:roles,id',
        ]);
    
        $user->name = $validated['name'];
        $user->email = $validated['email'];
    
        if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }
    
        $user->save();
    
        // Assign new role (remove old ones first)
        $role = Role::findOrFail($validated['role_id']);
        $user->syncRoles([$role->name]);
    
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
    
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
    public function allUsercount(){
        $userCount = User::count();
        return Inertia::render('dashboard', [
            'userCount' => $userCount,
        ]);
    } 
}