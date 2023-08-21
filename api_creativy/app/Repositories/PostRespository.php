<?php

namespace App\Repositories;

use App\Models\Post;
use Illuminate\Support\Facades\DB;

class PostRespository 
{
    public static function create(array $args){
        return DB::transaction(function() use($args) {
            $post = Post::create([
                'subtitle' => $args['subtitle'],
                'like' => 0,
                'image' => array_key_exists('image', $args)? $args['image'] : null,
                'user_id' => $args['user_id']
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

    public static function getPost(int $id, int $user_id){
        $post = Post::where([
            ['id', '=', $id],
            ['user_id', '=', $user_id]
        ])->first();
        return $post;
    }

    public static function delete(Post $post) {
        return DB::transaction(function() use($post) {
            $post->flag = false;
            $post->save();
            return $post;
        });
    }

    public static function update(Post $post, array $newData) {
        return DB::transaction(function () use ($post, $newData) {
            $post->subtitle = $newData['subtitle'];
            if(array_key_exists('image', $newData)){
                $image = $newData['image'];
                $extension = $image->extension();
                $imageName = md5($image->getClientOriginalName() . strtotime("now")).".".$extension;
                $image->move(public_path("img/posts/$post->id"), $imageName);
                $post->image = "img/posts/$post->id/$imageName";     
            }
            $post->save();
        });
    }

    public static function like(Post $post) {
        return DB::transaction(function () use ($post) {
            $post->like = $post->like+1;
            $post->save();
            return $post;
        });
    }
}