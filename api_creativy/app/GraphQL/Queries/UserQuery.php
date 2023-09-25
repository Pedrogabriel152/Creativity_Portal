<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Services\UserService;

final class UserQuery
{
    private $userService;

    public function __construct()
    {
        $this->userService = new UserService();
    }
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        // TODO implement the resolver
    }

    public function getUser($_, array $args)
    {
        $response = $this->userService->getUser($args['name']);
        return $response;
    }
}
