<?php

namespace App\Repositories;

use App\Models\UserPost;
use Illuminate\Support\Facades\DB;

class UserPostRepository 
{
    public static function create(int $user_id, int $post_id) {
        return DB::transaction(function () use ($user_id, $post_id) {
            $userLike = UserPost::create([
                'user_id' => $user_id,
                'post_id' => $post_id
            ]);
            return $userLike;
        });
    }

    public static function get(int $user_id, int $post_id){
        $userLike = UserPost::where([
            ['user_id', '=', $user_id],
            ['post_id', '=', $post_id]
        ])->first();

        return $userLike;
    }

    public static function delete(UserPost $userPost) {
        return DB::transaction(function () use ($userPost) {
            $userPost->delete();
            return;
        });
    }
}