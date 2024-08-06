<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller\Api;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtController extends Controller
{
    public static function createToken(Request $request)
    {
        $user = User::where("email", $request->email)->first();
        auth()->login($user);
        return auth()->tokenById($user->getJWTCustomClaims()['id']);
    }
    public function refreshToken()
    {
        try{
            $token = auth()->refresh();
        }catch(TokenInvalidException $e){
            return response()->json(['error'=> true,'message'=> $e->getMessage()],401);
        }
        return response()->json(["refresh_token"=>$token]);
    }

    public function checkToken()
    {
        $user = auth()->user();
        unset($user['password']);
        return response()->json($user,200);
    }


}
