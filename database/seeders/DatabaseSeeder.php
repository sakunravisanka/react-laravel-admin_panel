<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create admin user with only the columns that exist in your migration
        User::factory()->create([
            'name' => 'sakun',
            'email' => 'sakun@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

       
    }
}