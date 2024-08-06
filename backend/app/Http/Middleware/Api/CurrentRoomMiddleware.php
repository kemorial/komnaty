<?php

namespace App\Http\Middleware\Api;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CurrentRoomMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    private static function roomExist(int $roomId)
    {
        $rooms = auth()->user()->rooms()->get()->toArray();
        $room_id_list = array_map(function($room) {return $room['id'];},$rooms);
        return in_array($roomId, $room_id_list);
    }
    public function handle(Request $request, Closure $next): Response
    {
        if(!self::roomExist($request->id)){
            return response()->json(['message'=>'нет комнаты с таким id'],401);
        }
        return $next($request);
    }
}
