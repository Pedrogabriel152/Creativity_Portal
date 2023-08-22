<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Models\UserComment;
use Illuminate\Support\Facades\DB;

class UserCommentRopository 
{
    public static function create() {

    }

    public static function get(int $user_id, int $comment_id) {
        $comment = UserComment::where([
            ['user_id', '=', $user_id],
            ['comment_id', '=', $comment_id]
        ])->first();

        return $comment;
    }

    public static function delete(Comment $comment) {
        return DB::transaction(function () use ($comment) {
            $comment->delete();
            return;
        });
    }
}