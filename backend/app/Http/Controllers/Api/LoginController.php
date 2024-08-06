<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\JwtController;
use App\Http\Controllers\Api\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $token = JwtController::createToken($request);
        return response()->json([
            'user' => [
                'username' => $request->username,
                'id'=>$request->id,
                'email'=>$request->email,
            ],
            'access_token' => $token
        ], 200);
    }
}
