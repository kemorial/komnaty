<?php

namespace App\Events;

use App\Models\Message;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StoreMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private Message $message;
    /**
     * Create a new event instance.
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('room_channel_' . $this->message->toArray()['room_id']),
        ];
    }

    public function broadcastAs(): string
    {
        return 'message_event';
    }

    public function broadcastWith(): array
    {
        $this->message['author_id'] = $this->message['user_id'];
        $this->message['author_username'] = User::where('id', '=', $this->message['user_id'])->first()['username'];
        unset($this->message['user_id']);
        return [
            'message' => $this->message
        ];
    }
}
