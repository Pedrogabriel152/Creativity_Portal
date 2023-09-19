<?php

namespace App\Repositories;

use App\Models\UserComment;
use Illuminate\Support\Facades\DB;

class UserCommentRopository 
{
    public function create(int $comment_id, int $user_id, int $post_id) {
        return DB::transaction(function () use ($comment_id, $user_id, $post_id) {
            $userComment = UserComment::create([
                'user_id' => $user_id,
                'comment_id' => $comment_id,
                'post_id' => $post_id
            ]);
            return $userComment;
        });
    }

    public function get(int $user_id, int $comment_id, int $post_id) {
        $comment = UserComment::where([
            ['user_id', '=', $user_id],
            ['comment_id', '=', $comment_id],
            ['post_id', '=', $post_id]
        ])->first();

        return $comment;
    }

    public function delete(UserComment $userComment) {
        return DB::transaction(function () use ($userComment) {
            $userComment->delete();
            return;
        });
    }
}