<?php

namespace App\GraphQL\Queries;

use App\Services\PostService;

final class PostQuery
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function mainPost($_, array $args)
    {
        $response = PostService::mainPost();
        return $response;
    }
}
