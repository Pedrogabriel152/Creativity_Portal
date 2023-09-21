<?php

namespace App\Services;

use ErrorException;
use Illuminate\Support\Facades\Auth;
use App\Repositories\PostRespository;
use App\Repositories\CommentRepository;

class CommentService
{
    private $commentRepository;
    private $postRepository;

    public function __construct()
    {
        $this->commentRepository = new CommentRepository();
        $this->postRepository = new PostRespository();
    }

    public function create(array $args, int $first) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }
            
            $postExist = $this->postRepository->getPostById($args['post_id']);

            if(!$postExist) {
                throw new ErrorException('Post não encontrado', 404);
            }

            $comment = $this->commentRepository->create($args, $postExist, $user->id);

            if(!$comment) {
                throw new ErrorException('Falha ao comentar no post, tente novamente mais tarde', 500);
            }

            $comments = $this->commentRepository->getComments($args['post_id'], $first);

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

    public function update(array $args) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $commentExist = $this->commentRepository->getComment($user->id, $args['post_id'], $args['id']);

            if(!$commentExist) {
                throw new ErrorException('Comentário não encontrado', 404);
            }

            $comment = $this->commentRepository->update($commentExist, $args['comment']);

            if(!$comment) {
                throw new ErrorException('Falha ao atualizar o comentário, tente novamente mais tarde', 500);
            }

            $comments = $this->commentRepository->getComments($args['post_id'], $args['first']);

            $paginatorInfo = new \stdClass();
            $paginatorInfo->hasMorePages = $comments->lastPage() > 1;
            $paginatorInfo->count = $comments->perPage();

            return [
                'message' => 'Comentário atualizado com sucesso',
                'code' => 200,
                'comments' => $comments,
                'paginatorInfo' => $paginatorInfo
            ];
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode()
            ];
        } 
    }

    public function like(int $id, int $post_id, int $first) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $commentExist = $this->commentRepository->getCommentPost($id, $post_id);

            if(!$commentExist){
                throw new ErrorException('Comentário não encontrado', 404);
            }

            $comment = $this->commentRepository->like($commentExist, $user->id, $post_id);

            if(!$comment) {
                throw new ErrorException('Erro ao dar like', 500);
            }

            $comments = $this->commentRepository->getComments($post_id, $first);

            $paginatorInfo = new \stdClass();
            $paginatorInfo->hasMorePages = $comments->lastPage() > 1;
            $paginatorInfo->count = $comments->perPage();

            return [
                'message' => 'Comentário atualizado com sucesso',
                'code' => 200,
                'comments' => $comments,
                'paginatorInfo' => $paginatorInfo
            ];
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode(),
                'comments' => []
            ];
        }
    }

    public function delete(array $args) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $postExist = $this->postRepository->getPostById($args['post_id']);

            if(!$postExist) {
                throw new ErrorException('Post não encontrado', 404);
            }

            $commentExist = $this->commentRepository->getCommentPost($args['id'], $args['post_id']);

            if(!$commentExist){
                throw new ErrorException('Comentário não encontrado', 404);
            }

            $comment = $this->commentRepository->delete($commentExist);

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