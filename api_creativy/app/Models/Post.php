<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'subtitle',
        'title',
        'like_id',
        'image',
        'user_id',
        'flag'
    ];

    public function comments() {
        return $this->hasMany(Comment::class, 'post_id', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function user_post(){
        return $this->hasMany(UserPost::class, 'post_id', 'id');
    }
}
