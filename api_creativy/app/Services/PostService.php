<?php

namespace App\Services;

use App\Models\Post;
use App\Repositories\PostRespository;

class PostService 
{
    public static function create(array $args){
        try {
            $post = PostRespository::create($args);

            if(!$post) {
                return [
                    'message' => 'Falha ao publicar o post, tente novamente mais tarde',
                    'code' => 500
                ];
            }

            return [
                'message' => 'Post criado com sucesso',
                'code' => 200
            ];
        } catch (\Throwable $th) {
            return [
                'message' => 'Falha ao publicar o post, tente novamente mais tarde',
                'code' => 500
            ];
        }        
    }

    public static function delete(array $args) {
        try {
            $postExist = PostRespository::getPost($args['id'], $args['user_id']);

            if(!$postExist){
                return [
                    'message' => 'Post não encontrado',
                    'code' => 404
                ];
            }

            $post = PostRespository::delete($postExist);

            if(!$post){
                return [
                    'message' => 'Erro ao deletar post',
                    'code' => 500
                ];
            }

            return [
                'message' => 'Post deletado com sucesso',
                'code' => 200
            ];
        } catch (\Throwable $th) {
            return [
                'message' => 'Erro ao deletar post',
                'code' => 500
            ];
        }
    }

    public static function update(array $args) {
        try {
            $postExist = PostRespository::getPost($args['id'], $args['user_id']);

            if(!$postExist){
                return [
                    'message' => 'Post não encontrado',
                    'code' => 404
                ];
            }

            $post = PostRespository::update($postExist, $args['post']);

            if(!$post) {
                return [
                    'message' => 'Erro ao atualizar post',
                    'code' => 500
                ];
            }

            return [
                'message' => 'Post atualizado com sucesso',
                'code' => 200
            ];
            
        } catch (\Throwable $th) {
            return [
                'message' => 'Erro ao atualizar post',
                'code' => 500
            ];
        }
    }

    public static function like(int $id) {
        try {
            $postExist = Post::find($id);

            if(!$postExist){
                return [
                    'message' => 'Post não encontrado',
                    'code' => 404
                ];
            }

            $post = PostRespository::like($postExist);

            if(!$post) {
                return [
                    'message' => 'Erro ao atualizar post',
                    'code' => 500
                ];
            }

            return [
                'message' => 'Post atualizado com sucesso',
                'code' => 200
            ];
            
        } catch (\Throwable $th) {
            return [
                'message' => 'Erro ao dar like',
                'code' => 500
            ];
        }
    }
}