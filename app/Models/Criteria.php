<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Criteria extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'description',
        'actives',
        'niveau',
        'titre',
        'type',
    ];
}
