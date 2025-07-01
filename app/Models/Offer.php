<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'establishment_id',
        'description',
        'requirements',
        'experience',
        'condition',
        'reference',
        'approval',
        'deadline',
        'contract',
        'benefits',
        'comment',
        'actives',
        'user_id',
        'skills',
        'phone',
        'temps',
        'name',
    ];

    
    public function establishment()
    {
        return $this->belongsTo(Establishment::class);
    }

    public function applies()
    {
        return $this->hasMany(Apply::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    
}
