<?php

namespace App\Services;

use ErrorException;
use Illuminate\Support\Facades\Auth;
use App\Repositories\PostRespository;
use App\Repositories\CommentRepository;

class CommentService
{
    public static function create(array $args, int $first) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }
            
            $postExist = PostRespository::getPostById($args['post_id']);

            if(!$postExist) {
                throw new ErrorException('Post não encontrado', 404);
            }

            $comment = CommentRepository::create($args, $postExist, $user->id);

            if(!$comment) {
                throw new ErrorException('Falha ao comentar no post, tente novamente mais tarde', 500);
            }

            $comments = CommentRepository::getComments($args['post_id'], $first);

            return [
                'message' => 'Comentário criado com sucesso',
                'code' => 200,
                'comments' => $comments
            ];
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode(),
                'comments' => []
            ];
        } 
    }

    public static function update(array $args) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $commentExist = CommentRepository::getComment($user->id, $args['post_id'], $args['id']);

            if(!$commentExist) {
                throw new ErrorException('Comentário não encontrado', 404);
            }

            $comment = CommentRepository::update($commentExist, $args['comment']);

            if(!$comment) {
                throw new ErrorException('Falha ao atualizar o comentário, tente novamente mais tarde', 500);
            }

            return [
                'message' => 'Comentário atualizado com sucesso',
                'code' => 200
            ];
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode()
            ];
        } 
    }

    public static function like(int $id, int $post_id) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $commentExist = CommentRepository::getCommentPost($id, $post_id);

            if(!$commentExist){
                throw new ErrorException('Comentário não encontrado', 404);
            }

            $comment = CommentRepository::like($commentExist, $user->id, $post_id);

            if(!$comment) {
                throw new ErrorException('Erro ao dar like', 500);
            }

            return [
                'message' => 'Comentário atualizado com sucesso',
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

            $postExist = PostRespository::getPostById($args['post_id']);

            if(!$postExist) {
                throw new ErrorException('Post não encontrado', 404);
            }

            $commentExist = CommentRepository::getCommentPost($args['id'], $args['post_id']);

            if(!$commentExist){
                throw new ErrorException('Comentário não encontrado', 404);
            }

            $comment = CommentRepository::delete($commentExist);

            if(!$comment) {
                throw new ErrorException('Erro ao deletar comentário', 500);
            }

            return [
                'message' => 'Comentário deletado com sucesso',
                'code' => 200
            ];
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode()
            ];
        }
    }
}