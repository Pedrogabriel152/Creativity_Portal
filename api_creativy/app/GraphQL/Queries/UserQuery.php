<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Services\UserService;

final readonly class UserQuery
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        // TODO implement the resolver
    }

    public function getUser($_, array $args)
    {
        $response = UserService::getUser();
        return $response;
    }
}
