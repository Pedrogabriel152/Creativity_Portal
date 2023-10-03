<?php

namespace App\Services;

use DateTime;
use App\Models\User;
use Emarref\Jwt\Jwt;
use Emarref\Jwt\Token;
use Emarref\Jwt\Claim\JwtId;
use Illuminate\Http\Request;
use Emarref\Jwt\Claim\Issuer;
use Emarref\Jwt\Claim\Subject;
use Emarref\Jwt\Claim\Audience;
use Emarref\Jwt\Claim\IssuedAt;
use Emarref\Jwt\Algorithm\Hs256;
use Emarref\Jwt\Claim\NotBefore;
use Emarref\Jwt\Claim\Expiration;
use Emarref\Jwt\Claim\ClaimChecker;
use Emarref\Jwt\Claim\PrivateClaim;
use Emarref\Jwt\Encryption\Factory;
use Emarref\Jwt\Verification\Context;
use Emarref\Jwt\Exception\VerificationException;

class TokenService 
{
    public static function createToken(User $user, int $timeexpiration) {
        $futureDate = strtotime("$timeexpiration hours");
        $expirationDate = new DateTime(date('Y-m-d H:i',$futureDate));
        $token = $user->createToken('Token',["*"], $expirationDate);
        return $token->plainTextToken;
    }

    public static function getToken(Request $request) {
        $authHeader = $request->header('authorization');
        $tokenCompleto = explode(" ", $authHeader);
        $token = $tokenCompleto[1];
        return $token;  
    }

    public static function createTokenPassword(User $user) {  
        $token = new Token();

        // Standard claims are supported
        $token->addClaim(new Expiration(new \DateTime('60 minutes')));
        $token->addClaim(new IssuedAt(new \DateTime('now')));
        $token->addClaim(new PrivateClaim('user', $user));
        $token->addClaim(new Issuer(env('CREATIVY_PORTAL_FRONT')));
        $token->addClaim(new JwtId($user->id));
        $token->addClaim(new NotBefore(new \DateTime('now')));

        $algorithm = new Hs256(env('JWT_SECRET'));
        $encryption = Factory::create($algorithm);

        $jwt = new \Emarref\Jwt\Jwt();

        $tokenSeguro = $jwt->serialize($token, $encryption);
        dd($tokenSeguro);

        return $tokenSeguro;
    }

    public static function verifyToken(string $token) {
        $jwt = new Jwt();

        $algorithm = new Hs256(env('JWT_SECRET'));
        $encryption = Factory::create($algorithm);

        $context = new Context($encryption);
        $context->setIssuer(env('CREATIVY_PORTAL_FRONT', 'teste'));

        $deserialzedToken = $jwt->deserialize($token);
        
        try {
            $jwt->verify($deserialzedToken, $context);
        } catch (VerificationException $e) {
            echo $e->getMessage();
        }
    }

    public static function getUserByToken(){
        
    }
}