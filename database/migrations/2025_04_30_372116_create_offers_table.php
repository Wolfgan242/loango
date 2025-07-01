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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->text('comment')->default('No comment.');
            $table->unsignedBigInteger('establishment_id');
            $table->tinyInteger('approval')->default(0);
            $table->boolean('actives')->default(1);
            $table->unsignedBigInteger('user_id');
            $table->string('requirements');
            $table->string('experience');
            $table->string('condition');
            $table->string('reference');
            $table->string('deadline');
            $table->string('contract');
            $table->string('benefits');
            $table->string('skills');
            $table->string('phone');
            $table->string('temps');
            $table->string('name');
            $table->text('description');
            $table->timestamps();
            
            $table->foreign('establishment_id')->references('id')->on('establishments')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
