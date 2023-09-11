<?php

namespace App\GraphQL\Mutations;

use App\Services\CommentService;

final class CommentMutation
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function create($_, array $args) 
    {
        $response = CommentService::create($args['comment'], $args['first']);
        return $response;
    }

    public function update($_, array $args)
    {
        $response = CommentService::update($args);
        return $response;
    }

    public function like($_, array $args)
    {
        $response = CommentService::like($args['id'], $args['post_id']);
        return $response;
    }

    public function delete($_, array $args)
    {
        $response = CommentService::delete($args);
        return $response;
    }
}
