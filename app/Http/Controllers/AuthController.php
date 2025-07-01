<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function connexion(Request $request){
        if (Auth::attempt($request->all())) {
            if(Auth::user()->role_id > 1){
                if(Auth::user()->actives == 1 ){
                    return 'connected';
                } else{
                    Auth::logout();
                    return 'Votre compte à été désactivé!';
                }
            } else{
                Auth::logout();
                return 'Votre niveau d\'accès est inferieur!';
            }
        } else{
            return 'E-mail ou mot de passe incorrect!';
        }
    }
}
