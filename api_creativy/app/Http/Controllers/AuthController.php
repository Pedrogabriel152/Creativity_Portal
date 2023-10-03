<?php

namespace App\Http\Controllers;

use ErrorException;
use Emarref\Jwt\Jwt;
use Illuminate\Http\Request;
use App\Services\TokenService;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    private $userRepository;
    private $jwt;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
        $this->jwt = new Jwt();
    }

    public function register(Request $request) {
        if(!$request->name) {
            return response()->json(['message' => 'O campo nome é obrigatório'], 402);
        }

        if(!$request->email) {
            return response()->json(['message' => 'O campo email é obrigatório'], 402);
        }

        if(!$request->password) {
            return response()->json(['message' => 'O campo email é obrigatório'], 402);
        }

        $user = new \stdClass();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;

        $userExist = $this->userRepository->getUserByEmail($user->email);
        
        if($userExist){
            return response()->json(['message' => 'Algo deu errado'], 500);
        }

        $newUser = $this->userRepository->create($user);

        if(!$newUser) {
            return response()->json(['message' => 'Erro ao criar usuário, tente novamente mais tarde!'], 500);
        }

        $token = TokenService::createToken($newUser, 8);

        return response()->json([
            'message' => 'Usuário cadstrado com sucesso!',
            'token' => $token,
            'user_id' => $newUser->id
        ], 200);
    }

    public function login(Request $request){
        if(!$request->email) {
            return response()->json(['message' => 'O campo email é obrigatório'], 402);
        }

        if(!$request->password) {
            return response()->json(['message' => 'O campo email é obrigatório'], 402);
        }

        $userExist = $this->userRepository->getUserByEmail($request->email);

        if(!$userExist) {
            return response()->json(['message' => 'Email ou senha incorreta'], 404);
        }

        if(!password_verify($request->password, $userExist->password)) {
            return response()->json(['message' => 'Email ou senha incorreta'], 404);
        }
        
        $token = TokenService::createToken($userExist, 8);

        return response()->json([
            'message' => 'Usuário logado com sucesso!',
            'token' => $token,
            'user_id' => $userExist->id
        ], 200);
    }

    public function forgotPassword(Request $request) {
        // try {
            if(!$request->password) {
                return throw new ErrorException('O campo de senha é obrigatório', 500);
            }

            $jwt = new Jwt();
            $token = TokenService::getToken($request);
            $deserialzedToken = $jwt->deserialize($token);
            $userByToken = json_decode($deserialzedToken->getPayload()->jsonSerialize());
            $user = $this->userRepository->getUserByID($userByToken?->user?->id);
            TokenService::verifyToken($token, $user);
            dd($token);

            // $user = Auth::guard('sanctum')->user();

            if(!$user) {
                return throw new ErrorException('Falha a atualizar a senha', 500);
            }

            $updateUser = $this->userRepository->updatePassword($user, $request->password);

            if(!$updateUser) {
                return throw new ErrorException('Falha a atualizar a senha', 500);
            }

            $token = TokenService::createToken($user, 8);

            return response()->json([
                'message' => 'Senha alterada com sucesso',
                'user_id' => $user->id,
                'token' => $token
            ], 200);
            
        // } catch (\Exception $ex) {
        //     return response()->json([
        //         'message' => 'Falha a atualizar a senha',
        //     ], 500);
        // }
    }

    public function emailRecoverPassword(Request $request) {
        $email = $request->email;

        $user = $this->userRepository->getUserByEmail($email);

        if (! $user) {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }

        $token = TokenService::createTokenPassword($user);

        $user->update(['reset_token' => $token]);

        Mail::send('forgot_password', ['token' => $token, 'user' => $user], function ($m) use ($user) {
            $m->to($user->email);
            $m->subject('Redefinição de senha');
        });

        return response()->json(['message' => 'E-mail de redefinição de senha enviado', 'token' => $token], 200);
    }
}
