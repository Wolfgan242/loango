<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Country;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->tinyInteger('id')->unsigned()->autoIncrement();
            $table->boolean('actives')->default('1');
            $table->string('phone');
            $table->string('name_fr');
            $table->string('name_en');
            $table->string('alpha');
            $table->string('alph');
            $table->string('iso');
            $table->timestamps();
        });

        // Insert some stuff
        Country::insert([
            ['phone' => '000', 
            'name_fr' => 'Aucun pays selectionné',
            'name_en' => 'No country selected',
            'updated_at' => now(),
            'created_at' =>now(),
            'alpha' => 'APS',
            'alph' => 'AP',
            'iso' => '0'],
            ['phone' => '242', 
            'name_fr' => 'République du Congo',
            'name_en' => 'Republic of Congo',
            'updated_at' => now(),
            'created_at' =>now(),
            'alpha' => 'COG',
            'alph' => 'CG',
            'iso' => '178']
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contries');
    }
};
