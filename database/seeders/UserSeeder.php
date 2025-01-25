<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::truncate();
        User::create([
            'username' => 'superadminssss',
            'email' => 'superadmin@test.com',
            'password' => bcrypt('password'),
            'firstname' => 'Super',
            'lastname' => 'Admin',
            'gender' => 'Male',
            'status' => 'Active',
            'remember_token' => Str::random(10),
        ]);
    }
}
