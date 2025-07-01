<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'actives',
        'name_fr',
        'name_en',
        'phone',
        'alpha',
        'alph',
        'iso',
    ];
}
