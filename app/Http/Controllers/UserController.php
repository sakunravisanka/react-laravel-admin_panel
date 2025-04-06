<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin')->except([]); // Apply to all methods
    }

    public function index(Request $request)
    {
        return Inertia::render('Users/Index', [
            'users' => User::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where(function($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%");
                    });
                })
                ->orderBy('created_at', 'desc')
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search']),
            'can' => [
                'create_users' => auth()->user()->isAdmin(),
                'edit_users' => auth()->user()->isAdmin(),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create', [
            'roles' => ['admin', 'user']
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:admin,user',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('users.index')
            ->with('success', 'User created successfully!');
    }

    public function edit(User $user)
    {
        if ($user->isAdmin() && !auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('Users/Edit', [
            'user' => $user->only(['id', 'name', 'email', 'role']),
            'roles' => auth()->user()->isAdmin() ? ['admin', 'user'] : ['user']
        ]);
    }

    public function update(Request $request, User $user)
{
    $rules = [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
    ];

    // Only validate password if it's provided
    if ($request->filled('password')) {
        $rules['password'] = ['required', 'confirmed', Rules\Password::defaults()];
    }

    $validated = $request->validate($rules);

    $updateData = [
        'name' => $validated['name'],
        'email' => $validated['email'],
    ];

    // Only update password if it was provided
    if ($request->filled('password')) {
        $updateData['password'] = Hash::make($validated['password']);
    }

    $user->update($updateData);

    return redirect()->route('users.index')
        ->with('success', 'User updated successfully!');
}
    public function destroy(User $user)
    {
        if ($user->id === auth()->id() || ($user->isAdmin() && !auth()->user()->isAdmin())) {
            abort(403);
        }

        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'User deleted successfully!');
    }
}