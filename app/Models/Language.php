<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class Language extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    //
    protected $guarded = [];
}
