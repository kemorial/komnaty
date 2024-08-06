<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('room_users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('room_id');
            $table->foreign('room_id','room_user_room_fk')->references('id')->on('rooms');
            $table->index('room_id','room_user_room_idx');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id','room_user_user_fk')->references('id')->on('users')->onDelete('cascade');
            $table->index('user_id','room_user_user_idx');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_users');
    }
};
