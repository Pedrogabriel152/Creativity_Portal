<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Support\Facades\DB;

class PostRespository 
{
    private $userPostRepository;

    public function __construct()
    {
        $this->userPostRepository = new UserPostRepository();
    }

    public function create(array $args, int $user_id){
        return DB::transaction(function() use($args, $user_id) {
            $post = Post::create([
                'title' => $args['title'],
                'subtitle' => $args['subtitle'],
                'user_id' => $user_id
            ]);

            if(array_key_exists('image', $args)){
                $image = $args['image'];
                $extension = $image->extension();
                $imageName = md5($image->getClientOriginalName() . strtotime("now")).".".$extension;
                $image->move(public_path("img/posts/$post->id"), $imageName);
                $post->image = "img/posts/$post->id/$imageName";
                $post->save();
            }

            return $post;
        });
    }

    public function getPost(int $id, int $user_id){
        $post = Post::where([
            ['id', '=', $id],
            ['user_id', '=', $user_id],
        ])->first();
        return $post;
    }

    public function delete(Post $post) {
        return DB::transaction(function() use($post) {
            $post->flag = false;
            $post->save();
            return $post;
        });
    }

    public function update(Post $post, array $newData) {
        return DB::transaction(function () use ($post, $newData) {
            $post->title = $newData['title'];
            $post->subtitle = $newData['subtitle'];
            if(array_key_exists('image', $newData)){
                $image = $newData['image'];
                $extension = $image->extension();
                $imageName = md5($image->getClientOriginalName() . strtotime("now")).".".$extension;
                $image->move(public_path("img/posts/$post->id"), $imageName);
                $post->image = "img/posts/$post->id/$imageName";     
            }
            $post->save();

            return $post;
        });
    }

    public function like(Post $post, int $user_id) {
        return DB::transaction(function () use ($post, $user_id) {
            $userLikeExists = $this->userPostRepository->get($user_id, $post->id);

            if($userLikeExists) {
                $this->userPostRepository->delete($userLikeExists);
                $post->like = $post->like-1;
                $post->save();
                return $post;
            }

            $userLike = $this->userPostRepository->create($user_id, $post->id);

            if(!$userLike){
                return DB::rollBack();
            }

            $post->like = $post->like+1;
            $post->save();
            return $post;
        });
    }

    public function getPostById(int $id) {
        $post = Post::where([
            ['id', '=', $id],
            ['flag', '=', true]
        ])->first();
        return $post;
    }

    public function mainPost() {
        $post = Post::whereFlag(true)->orderBy('like', 'desc')->first();
        return $post;
    }
}