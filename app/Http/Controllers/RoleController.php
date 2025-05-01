<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role ;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return Inertia::render('roles/index', [
            'roles' => Role::with('permissions')->get(),
        ]); 
   
    }


    /**
     * Show the form for creating a new resource.
     */
    public function  create()
    {
        // $permissions = Permission::all();
        // return response()->json([
        //     'status' => true,
        //     'message' => 'Permissions retrieved successfully',
        //     'data' => $permissions
        // ]);

        return Inertia::render('roles/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
           
        ]);

        $role = Role::create([
            'name' => $request->name,
            
        ]);
        $role->syncPermissions($request->permissions);

        return response()->json([
            'status' => true,
            'message' => 'Role created successfully',
            'data' => $role
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::findOrFail($id);

        return response()->json([
            'status' => true,
            'message' => 'Role retrieved successfully',
            'data' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            
        ]);

        $role = Role::findOrFail($id);
        $role->update([
            'name' => $request->name,
            
        ]);
        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }
        

        return response()->json([
            'status' => true,
            'message' => 'Role updated successfully',
            'data' => $role
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json([
            'status' => true,
            'message' => 'Role deleted successfully',
        ]);
    }
}