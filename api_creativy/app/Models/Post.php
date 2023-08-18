<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'subtitle',
        'likes',
        'image',
        'user_id',
        'flag'
    ];

    public function comments() {
        return $this->hasMany(Comment::class, 'post_id');
    }
}
