<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Models\UserComment;
use Illuminate\Support\Facades\DB;

class CommentRepository
{
    public static function create(array $args) {
        return DB::transaction(function () use ($args) {
            $comment = Comment::create([
                'text' => $args['text'],
                'user_id' => $args['user_id'],
                'post_id' => $args['post_id'],
            ]);

            $userComment = UserComment::create([
                'user_id' => $args['user_id'],
                'comment_id' => $comment->id,
            ]);

            if(!$userComment){
                DB::rollBack();
            }

            return $comment;
        });
    }

    public static function getComment(int $user_id, int $post_id, int $id) {
        $comment = Comment::where([
            ['id', '=', $id],
            ['user_id', '=', $user_id],
            ['post_id', '=', $post_id],
            ['flag', '=', true]
        ])->first();

        return $comment;
    }

    public static function update(Comment $comment, array $newData) {
        return DB::transaction(function () use ($comment, $newData) {
            $comment->text = $newData['text'];
            $comment->save();
            return $comment;
        });
    }

    public static function like(Comment $comment) {
        return DB::transaction(function () use ($comment) {
            $comment->like = $comment->like+1;
            $comment->save();
            return $comment;
        });
    }

    public static function getCommentPost(int $id, int $post_id) {
        $comment = Comment::where([
            ['id', '=', $id],
            ['post_id', '=', $post_id],
            ['flag', '=', true]
        ])->first();

        return $comment;
    }

    public static function delete(Comment $comment) {
        return DB::transaction(function () use ($comment) {
            $comment->flag = false;
            $comment->save();
            return $comment;
        });
    }
}