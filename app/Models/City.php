<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'country_id',
        'actives',
        'name',
    ];
    
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
    
}
