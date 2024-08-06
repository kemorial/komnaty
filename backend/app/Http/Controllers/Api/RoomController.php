<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomUser;
use App\Models\User;
use Illuminate\Database\Events\TransactionBeginning;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    public function roomList()
    {
        $user_id = auth()->user()->id;
        $rooms = User::find($user_id)->rooms()->get();
        if (!($rooms)) {
            return response()->json(['rooms' => []]);
        }
        foreach ($rooms as $room) {
            $lastMessage = $room->messages()->latest()->first();
            if (!is_null($lastMessage)) {
                $lastMessageBody = $lastMessage['body'];
                $lastMessageTime = $lastMessage['created_at'];
            }
            unset($room['pivot']);
            $room['last_message'] = $lastMessageBody ?? 'Нет сообщений';
            $room['last_message_time'] = $lastMessageTime ?? null;
            $lastMessageBody = null;
            $lastMessageTime = null;
        }
        return response()->json([
            "rooms" => $rooms
        ]);
    }

    public function currentRoom(int $id)
    {
        $room = Room::find($id);
        $room['last_message'] = $room->messages()->latest()->first()['body'] ?? "Нет сообщений";
        $room['last_message_time'] = $room->messages()->latest()->first()['created_at'] ?? null;
        return response()->json([
            "room" => $room
        ]);
    }

    public function storeRoom(Request $request)
    {
        $room = Room::create($request->all());
        $room->addCreator();
        $room['last_message'] = "Нет сообщений";
        $room['last_message_time'] = null;
        return response()->json([
            'room' => [
                'id' => $room['id'],
                'title' => $room['title'],
                'last_message' => $room['last_message'],
                'lsat_message_time' => $room['last_message_time']
            ]
        ], 200);
    }

    public function deleteRoom($id)
    {
        $room = Room::find($id);
        if (is_null($room)) {
            return response()->json(['message' => 'Несуществующая комната']);
        }
        DB::transaction(function () use ($room) {
            $room->messages()->delete();
            $room->room_users()->delete();
            $room->delete();
        });
        return response()->json(['message' => 'deleted successfully']);
    }

    public function addUsers(Request $request, int $room_id)
    {
        try {
            $user_list = array_map(function ($user) {
                return $user['id'];
            }, Room::find($room_id)->users()->get()->toArray());
            $new_users = array_diff($request['users'], $user_list);
            foreach ($new_users as $user_id) {
                RoomUser::create(['room_id' => $room_id, 'user_id' => $user_id]);
            }
            return response()->json([]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Не удалось добавить пользователей']);
        }
    }

    public function roomSearch(Request $request)
    {
        $room_name = $request->room_name;
        $rooms = User::find(auth()->user()->id)->rooms()->where('title','like','%'.$room_name.'%')->get()->toArray();
        $rooms = array_map(function($room){
            $message = Room::find($room['id'])->messages()->latest()->first();
            unset($room['pivot']);
            $room['last_message'] = $message['body'] ?? "Нет сообщений";
            $room['last_message_time'] = $message['created_at'] ?? null;
            return $room;
        },$rooms);
        return response()->json(['rooms' => $rooms]);
    }
}
