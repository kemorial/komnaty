<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function userList()
    {
        $users = User::all()->toArray();
        $users = array_map(function ($user) {
            unset($user["email"]);
            unset($user["password"]);
            unset($user["api_token"]);
            return $user;
        }, $users);
        return response()->json(['users'=>
            $users
        ]);
    }
}
