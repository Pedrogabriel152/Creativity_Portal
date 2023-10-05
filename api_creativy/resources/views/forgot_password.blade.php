<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinição de senha</title>
</head>
<body>
    <h1>Redefinição de senha</h1>
    <p>
        Olá, <strong>{{ $user->name }}</strong>,
    </p>
    <p>
        Recebemos uma solicitação para restaurar sua senha de acesso em nosso site.
    </p>
    <p>
        Se você reconhece essa ação, clique no botão abaixo para prosseguir:
    </p>
    <p>
        <a href="{{env('CREATIVY_PORTAL_FRONT')}}{{$token}}" class="btn btn-primary">Redefinir senha</a>
    </p>
    <p>
        Se você não solicitou a redefinição da senha, ignore este e-mail.
    </p>
    <p>
        Atenciosamente,
        <strong>{{ config('app.name') }}</strong>
    </p>
</body>
</html>