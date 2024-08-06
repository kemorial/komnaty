<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;


    protected $fillable = [
        'title'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class,'room_users','room_id','user_id');
    }

    public function addCreator()
    {
        $user = auth()->user();
        RoomUser::create(['room_id'=>$this->id,'user_id'=>$user->id]);

    }

    public function room_users()
    {
        return $this->HasMany(RoomUser::class);
    }

}
