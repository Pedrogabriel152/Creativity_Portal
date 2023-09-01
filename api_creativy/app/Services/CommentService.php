<?php

namespace App\Services;

use App\Repositories\CommentRepository;
use App\Repositories\PostRespository;

class CommentService
{
    public static function create(array $args) {
        try {
            $postExist = PostRespository::getPostById($args['post_id']);

            if(!$postExist) {
                return [
                    'message' => 'Post não encontrado',
                    'code' => 500
                ];
            }

            $comment = CommentRepository::create($args, $postExist);

            if(!$comment) {
                return [
                    'message' => 'Falha ao comentar no post, tente novamente mais tarde',
                    'code' => 500
                ];
            }

            return [
                'message' => 'Comentário criado com sucesso',
                'code' => 200
            ];
        } catch (\Throwable $th) {
            return [
                'message' => 'Falha ao comentar no post, tente novamente mais tarde',
                'code' => 500
            ];
        } 
    }

    public static function update(array $args) {
        try {
            $commentExist = CommentRepository::getComment($args['user_id'], $args['post_id'], $args['id']);

            if(!$commentExist) {
                return [
                    'message' => 'Comentário não encontrado',
                    'code' => 404
                ];
            }

            $comment = CommentRepository::update($commentExist, $args['comment']);

            if(!$comment) {
                return [
                    'message' => 'Falha ao atualizar o comentário, tente novamente mais tarde',
                    'code' => 500
                ];
            }

            return [
                'message' => 'Comentário atualizado com sucesso',
                'code' => 200
            ];
        } catch (\Throwable $th) {
            return [
                'message' => 'Falha ao atualizar o comentário, tente novamente mais tarde',
                'code' => 500
            ];
        } 
    }

    public static function like(int $id, int $post_id, int $user_id) {
        // try {
            $commentExist = CommentRepository::getCommentPost($id, $post_id);

            if(!$commentExist){
                return [
                    'message' => 'Comentário não encontrado',
                    'code' => 404
                ];
            }

            $comment = CommentRepository::like($commentExist, $user_id, $post_id);

            if(!$comment) {
                return [
                    'message' => 'Erro ao dar like',
                    'code' => 500
                ];
            }

            return [
                'message' => 'Comentário atualizado com sucesso',
                'code' => 200
            ];
        // } catch (\Throwable $th) {
        //     return [
        //         'message' => $th->getMessage(),//'Erro ao dar like',
        //         'code' => 500
        //     ];
        // }
    }

    public static function delete(array $args) {
        try {
            $postExist = PostRespository::getPostById($args['post_id']);

            if(!$postExist) {
                return [
                    'message' => 'Post não encontrado',
                    'code' => 404
                ];
            }

            $commentExist = CommentRepository::getCommentPost($args['id'], $args['post_id']);

            if(!$commentExist){
                return [
                    'message' => 'Comentário não encontrado',
                    'code' => 404
                ];
            }

            $comment = CommentRepository::delete($commentExist);

            if(!$comment) {
                return [
                    'message' => 'Erro ao deletar comentário',
                    'code' => 500
                ];
            }

            return [
                'message' => 'Comentário deletado com sucesso',
                'code' => 200
            ];
        } catch (\Throwable $th) {
            return [
                'message' => 'Erro ao deletar comentário',
                'code' => 500
            ];
        }
    }
}