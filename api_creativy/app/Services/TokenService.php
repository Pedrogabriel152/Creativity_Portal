<?php

namespace App\Services;

use DateTime;
use App\Models\User;

class TokenService 
{
    public static function createToken(User $user) {
        $futureDate = strtotime("8 hours");
        $expirationDate = new DateTime(date('Y-m-d H:i',$futureDate));
        $token = $user->createToken('Token',["*"], $expirationDate);
        return $token->plainTextToken;
    }
}