<?php

namespace App\Http\Controllers\Api;

use App\Events\StoreMessageEvent;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use PharIo\Manifest\Author;

class MessageController extends Controller
{
    public function currentMessage(int $id)
    {
        $messages = Room::find($id)->messages()->get()->toArray();
        $messages = array_map(function ($message) {
            $message['author_id'] = $message['user_id'];
            $message['author_username'] = User::where("id",'=',$message['user_id'])->first()['username'];
            unset($message["user_id"]);
            return $message;
        }, $messages);
        return response()->json(
            ["messages" => $messages]
        );
    }

    public function storeMessage(Request $request)
    {
        $message = Message::create($request->all());
        $message['author_id'] = $message['user_id'];
        $message['author_username'] = User::where('id','=',$message['user_id'])->first()['username'];
        unset($message["user_id"]);
        event(new StoreMessageEvent($message));
        return response()->json(["message" => $message]);
    }
}
