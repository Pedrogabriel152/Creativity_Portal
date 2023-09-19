<?php

namespace App\GraphQL\Mutations;

use App\Services\PostService;
use Illuminate\Support\Facades\Auth;

final class PostMutation
{
    private $postService;

    public function __construct()
    {
        $this->postService = new PostService();
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
        $response = $this->postService->create($args['post']);
        return $response;
    }

    public function delete($_, array $args)
    {
        $response = $this->postService->delete($args);
        return $response;
    }

    public function update($_, array $args)
    {
        $response = $this->postService->update($args);
        return $response;
    }

    public function like($_, array $args)
    {
        $response = $this->postService->like($args['id']);
        return $response;
    }
}
