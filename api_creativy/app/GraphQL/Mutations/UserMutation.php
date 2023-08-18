<?php

namespace App\GraphQL\Mutations;

use App\Services\UserService;

final class UserMutation
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        // TODO implement the resolver
    }

    public function update($_, array $args)
    {
        $response = UserService::update($args);
        return $response;
    }
}
