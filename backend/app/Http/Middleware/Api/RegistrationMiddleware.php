<?php

namespace App\Http\Middleware\Api;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RegistrationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    private static function correctEmail(string $email)
    {
        return str_contains($email,'@');
    }

    private static function isFree(string $email):bool
    {
        $users = User::all()->toArray();
        $email_list = array_map(function ($user) {return $user['email'];}, $users);
        return in_array($email, $email_list);
    }

    public function handle(Request $request, Closure $next): Response
    {
        foreach ($request as $field)
        {
            if($field=="")
            {
                return response()->json(["message"=>"Пустое поле $field"],400);
            }
        }
        if(!self::correctEmail($request->email))
        {
            return response()->json(["message"=> "Некорректный email"],400);
        }
        if(self::isFree($request->email))
        {
            return response()->json(["message"=> "Такой email уже зарегестрирован"],400);
        }
        if(strlen($request->password)<8)
        {
            return response()->json(["message"=> "Слишком короткий пароль (минимум 8 символов)"],400);
        }
        return $next($request);
    }
}
