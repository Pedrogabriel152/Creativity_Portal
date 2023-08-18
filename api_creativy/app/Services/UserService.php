<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService 
{
    public static function update(array $args) {
        $user = UserRepository::getUserByID($args['id']);
        
        if(!$user){
            return [
                'message' => "Usuário não encontrado",
                'code' => 404
            ];
        }

        try {
            $updateUser = UserRepository::update($user, $args['user']);

            if(!$updateUser) {
                return [
                    'message' => "Erro ao atualizar o usuário",
                    'code' => 500
                ];
            }

            return [
                'message' => "Usuário atualizado com sucesso",
                'code' => 200
            ];

        } catch (\Throwable $th) {
            return [
                'message' => "Erro ao atualizar o usuário",
                'code' => 500
            ];
        }
    }
}