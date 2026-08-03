<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Greeting extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'nama',
        'perusahaan',
        'ucapan',
        'device_id',
    ];
}
