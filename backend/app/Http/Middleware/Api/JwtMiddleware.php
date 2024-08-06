<?php

namespace App\Http\Middleware\Api;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }
    public function handle(Request $request, Closure $next): Response
    {
        try{
            $user = JWTAuth::parseToken()->authenticate();

        }catch(\Exception $e){
            if($e instanceof TokenInvalidException){
                return response()->json(['message'=>'Некоректный токен'],401);
            }
            if($e instanceof TokenExpiredException){
                return response()->json(['message'=>'Неактуальный токен'],401);
            }
            else{
                return response()->json(['message'=>$e->getMessage()],401);
            }
        }
        return $next($request);
    }
}
