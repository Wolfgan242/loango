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
        Schema::create('applies', function (Blueprint $table) {
            $table->id();
            $table->text('comment')->default('No comment.');
            $table->tinyInteger('approval')->default(0);
            $table->boolean('actives')->default(1);
            $table->unsignedBigInteger('offer_id');
            $table->string('diploma');
            $table->string('letter');
            $table->string('email');
            $table->string('name');
            $table->string('cv');
            $table->timestamps();
            
            $table->foreign('offer_id')->references('id')->on('offers')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applies');
    }
};
