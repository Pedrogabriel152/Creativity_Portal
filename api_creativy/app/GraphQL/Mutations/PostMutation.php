<?php

namespace App\GraphQL\Mutations;

use App\Services\PostService;

final class PostMutation
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
        $response = PostService::create($args['post']);
        return $response;
    }

    public function delete($_, array $args)
    {
        $response = PostService::delete($args);
        return $response;
    }

    public function update($_, array $args)
    {
        $response = PostService::update($args);
        return $response;
    }
}
