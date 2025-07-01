<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('adresse')->default('Votre adresse est vide');
            $table->string('phone')->default('Aucun numéro');
            $table->unsignedTinyInteger('city_id')->default('1');
            $table->string('photo', 50)->default('default.png');
            $table->unsignedTinyInteger('role_id')->default(1);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('identifiant')->default('aucun');
            $table->boolean('actives')->default(1);
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->string('name');
            $table->timestamps();

            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('role_id')->references('id')->on('roles')->onUpdate('cascade')->onDelete('cascade');
        });

        // Insert some stuff
        User::insert([[
            
            'email' => 'admin@gmail.com', 
            'password'=> bcrypt('2008242107'),
            'email_verified_at' => now(),
            'name' => 'Administrateur',
            //'is_email_verified' => 1, 
            'updated_at' => now(),
            'created_at' => now(),
            'city_id' => 1, 
            'role_id' => 4],
        ]);

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
