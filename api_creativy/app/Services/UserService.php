<?php

namespace App\Services;

use ErrorException;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;

class UserService 
{
    private $userRepository;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
    }

    public function update(array $args) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Usuário não encontrado', 404);
            }
            
            $updateUser = $this->userRepository->update($user, $args['user']);

            if(!$updateUser) {
                throw new ErrorException('Erro ao atualizar o usuário', 500);
            }

            return [
                'message' => "Usuário atualizado com sucesso",
                'code' => 200,
                'user' => $updateUser
            ];

        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode(),
            ];
        }
    }

    public function getUser(string $name) {
        try{
            $user = $this->userRepository->getUserByName($name);

            if(!$user){
                throw new ErrorException('Usuário não encontrado', 404);
            }

            return $user;

        } catch (\Exception $ex) {
            return [];
        }
    }
}