<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'description',
        'approval',
        'actives',
        'city_id',
        'user_id',
        'website',
        'comment',
        'address',
        'status',
        'phone',
        'email',
        'type',
        'code',
        'name'
    ];

    
    public function establishments()
    {
        return $this->hasMany(Establishment::class);
    }
    
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }
    
}
