<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TokenService;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    private $userRepository;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
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
        $request->validate(['email' => 'required|email']);
 
        $status = Password::sendResetLink(
            $request->only('email')
        );
    
        return $status === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }
}
