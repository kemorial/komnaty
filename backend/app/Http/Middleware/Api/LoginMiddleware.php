<?php

namespace App\Http\Middleware\Api;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class LoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = User::where('email', '=', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Пользователь не найден'], 400);
        }
        if (is_null($request->password)) {
            return response()->json(['message' => 'Пароль не введён'], 400);
        }
        if (!Hash::check($request->password, $user->password)) {

            return response()->json(['message' => 'Некоректный пароль'], 400);
        }
        $request['username']=$user->username;
        $request['id']=$user->id;
        return $next($request);
    }
    //suck bill balls\deez nuts fucking deploy3
}
