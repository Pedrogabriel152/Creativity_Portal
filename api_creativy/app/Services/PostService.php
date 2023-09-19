<?php

namespace App\Services;

use ErrorException;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use App\Repositories\PostRespository;

class PostService 
{
    private $postRepository;

    public function __construct()
    {
        $this->postRepository = new PostRespository();
    }

    public function create(array $args){
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $post = $this->postRepository->create($args, $user->id);

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

    public function delete(array $args) {
        try {
            $user = Auth::guard('sanctum')->user();
            
            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $postExist = $this->postRepository->getPost($args['id'], $user->id);

            if(!$postExist){
                throw new ErrorException('Post não encontrado', 404);
            }

            $post = $this->postRepository->delete($postExist);

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

    public function update(array $args) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $postExist = $this->postRepository->getPost($args['id'], $user->id);

            if(!$postExist){
                throw new ErrorException('Post não encontrado', 404);
            }

            $post = $this->postRepository->update($postExist, $args['post']);

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

    public function like(int $id) {
        try {
            $user = Auth::guard('sanctum')->user();

            if(!$user){
                throw new ErrorException('Falha ao publicar o post, tente novamente mais tarde', 500);
            }

            $postExist = Post::find($id);

            if(!$postExist){
                throw new ErrorException('Post não encontrado', 404);
            }

            $post = $this->postRepository->like($postExist, $user->id);

            if(!$post) {
                throw new ErrorException('Erro ao dar like', 500);
            }

            return [
                'message' => 'Post atualizado com sucesso',
                'code' => 200,
                'post' => $post
            ];
        } catch (\Exception $ex) {
            return [
                'message' => $ex->getMessage(),
                'code' => $ex->getCode(),
            ];
        }
    }

    public function mainPost() {
        $post = $this->postRepository->mainPost();
        return $post;
    }
}