<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apply extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $fillable = [
        'offer_id',
        'approval',
        'actives',
        'diploma',
        'comment',
        'letter',
        'email',
        'name',
        'cv',
    ];
    
    /**
     * Get the user that owns the Favorie
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
