<?php 

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository
{
    public static function create(object $user) {
        return DB::transaction(function () use ($user) {
            $hash = password_hash($user->password, PASSWORD_BCRYPT);
            $newUser = User::create([
                'name' => $user->name,
                'email' => $user->email,
                'password' => $hash
            ]);

            return $newUser;
        });
    }

    public static function getUserByEmail(string $email){
        $user = User::whereEmail($email)->first();
        return $user;
    }
}