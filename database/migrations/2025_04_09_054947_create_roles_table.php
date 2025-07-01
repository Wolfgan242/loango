<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->tinyInteger('id')->unsigned()->autoIncrement();
            $table->string('display');
            $table->integer('access');
        });

        // Insert some stuff
        Role::insert([
            ['display' => 'Utilisateur', 'access' => 1],
            ['display' => 'Admins', 'access' => 2],
            ['display' => 'Super', 'access' => 3],
            ['display' => 'DG', 'access' => 4]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
