<?php

namespace App\GraphQL\Mutations;

use App\Services\CommentService;

final class CommentMutation
{
    private $commentService;

    public function __construct()
    {
        $this->commentService = new CommentService();
    }

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
        $response = $this->commentService->create($args['comment'], $args['first']);
        return $response;
    }

    public function update($_, array $args)
    {
        $response = $this->commentService->update($args);
        return $response;
    }

    public function like($_, array $args)
    {
        $response = $this->commentService->like($args['id'], $args['post_id'], $args['first']);
        return $response;
    }

    public function delete($_, array $args)
    {
        $response = $this->commentService->delete($args);
        return $response;
    }
}
