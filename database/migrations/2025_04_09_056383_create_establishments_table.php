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
        Schema::create('establishments', function (Blueprint $table) {
            $table->id();
            $table->string('website')->default('https://projet-univloango.cg/');
            
            $table->text('comment')->default('No comment.');
            $table->unsignedBigInteger('institution_id');
            $table->tinyInteger('approval')->default(0);
            $table->boolean('actives')->default(1);
            $table->unsignedBigInteger('user_id');
            $table->text('description');
            $table->string('address');
            $table->string('phone');
            $table->string('email');
            $table->string('name');
            $table->timestamps();

            $table->foreign('institution_id')->references('id')->on('institutions')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('establishments');
    }
};
