<?php

namespace App\GraphQL\Mutations;

use App\Services\UserService;

final class UserMutation
{
    private $userService;

    public function __construct()
    {
        $this->userService = new UserService();
    }
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
        $response = $this->userService->update($args);
        return $response;
    }
}
