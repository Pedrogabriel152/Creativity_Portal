<?php

namespace App\Repositories;

use App\Models\UserComment;
use Illuminate\Support\Facades\DB;

class UserCommentRopository 
{
    public static function create(int $comment_id, int $user_id) {
        return DB::transaction(function () use ($comment_id, $user_id) {
            $userComment = UserComment::create([
                'user_id' => $user_id,
                'comment_id' => $comment_id,
            ]);

            return $userComment;
        });
    }

    public static function get(int $user_id, int $comment_id) {
        $comment = UserComment::where([
            ['user_id', '=', $user_id],
            ['comment_id', '=', $comment_id]
        ])->first();

        return $comment;
    }

    public static function delete(UserComment $userComment) {
        return DB::transaction(function () use ($userComment) {
            $userComment->delete();
            return;
        });
    }
}