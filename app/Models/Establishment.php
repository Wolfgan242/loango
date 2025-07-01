<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Establishment extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'institution_id',
        'description',
        'approval',
        'actives',
        'user_id',
        'website',
        'comment',
        'address',
        'phone',
        'email',
        'name'
    ];
    
    
    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
