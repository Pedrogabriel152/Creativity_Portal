<?php

namespace App\Services;

use ErrorException;
use App\Models\Post;
use App\Repositories\CommentRepository;
use Illuminate\Support\Facades\Auth;
use App\Repositories\PostRespository;

class PostService 
{
    public static function create(array $args){
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $post = PostRespository::create($args, $user->id);

            if(!$post) {
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            return [
                'message' => 'Post criado com sucesso',
                'code' => 200
            ];
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode()
            ];
        }        
    }

    public static function delete(array $args) {
        try {
            $user = Auth::guard('sanctum')->user();
            
            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $postExist = PostRespository::getPost($args['id'], $user->id);

            if(!$postExist){
                throw new ErrorException('Post não encontrado', 404);
            }

            $post = PostRespository::delete($postExist);

            if(!$post){
                throw new ErrorException('Post não encontrado', 500);
            }

            return [
                'message' => 'Post deletado com sucesso',
                'code' => 200
            ];
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode()
            ];
        }
    }

    public static function update(array $args) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $postExist = PostRespository::getPost($args['id'], $user->id);

            if(!$postExist){
                throw new ErrorException('Post não encontrado', 404);
            }

            $post = PostRespository::update($postExist, $args['post']);

            if(!$post) {
                throw new ErrorException('Erro ao atualizar post', 500);
            }

            return [
                'message' => 'Post atualizado com sucesso',
                'code' => 200
            ];
            
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode()
            ];
        }
    }

    public static function like(int $id) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $postExist = Post::find($id);

            if(!$postExist){
                throw new ErrorException('Post não encontrado', 404);
            }

            $post = PostRespository::like($postExist, $user->id);

            if(!$post) {
                throw new ErrorException('Erro ao dar like', 500);
            }

            return [
                'message' => 'Post atualizado com sucesso',
                'code' => 200,
                // 'comment' => $comments
            ];
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode(),
                // 'comments' => []
            ];
        }
    }

    public static function mainPost() {
        $post = PostRespository::mainPost();
        return $post;
    }
}