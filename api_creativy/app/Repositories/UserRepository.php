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

    public static function getUserByID(int $id){
        $user = User::find($id);
        return $user;
    }

    public static function update(User $user, array $newData){
        return DB::transaction(function () use ($user, $newData) {
            $hash = array_key_exists('password', $newData)? password_hash($newData['password'], PASSWORD_BCRYPT) : $user->password;
            $user->name = $newData['name'];
            $user->email = $newData['email'];
            $user->password = $hash;
            if(array_key_exists('image', $newData)){
                $image = $newData['image'];
                $extension = $image->extension();
                $imageName = md5($image->getClientOriginalName() . strtotime("now")).".".$extension;
                $image->move(public_path("img/users/$user->id"), $imageName);
                $user->image = "img/users/$user->id/$imageName";     
            }
            $user->save();
            return $user;
        });
    }
}