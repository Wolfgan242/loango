<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Mail\Candidacy;
use Inertia\Inertia;
use App\Models\User;
use App\Models\City;
use App\Models\Role;

class UserController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->user = User::where('id', Auth::user()->id)->with('role')->first();
    }

    public function store(Request $request)
    {
        $plainPassword = Str::random(10);
        // Vérifier si les frais existent déjà
        $exists = User::where([
            ['email', $request->email]
        ])->exists();

        if (!$exists) {
            $user = new User();
            $user->role_id = 1;
            $user->created_at = now();
            $user->updated_at = now();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->email_verified_at = now();
            $user->city_id = $request->city_id;
            $user->password = bcrypt($plainPassword);
            if($user->save()){
                Mail::to($request->email)->send(new Candidacy($request->name, $plainPassword, 'Information de création de compte.', 'password', $request->email));
                return 'saved';
            } else {
                return 'Erreur lors de l\'enregistrement.';
            };

        } else{
            return 'Cet email est déjà utilisé.';
        }
    }

    public function role(Request $request, $id){

        // Trouver l'enregistrement par son ID
        $user = User::where('id', $id)->with('role')->first();

        // Vérifier si l'enregistrement existe
        if (!$user) {
            return response()->json(['message' => 'Enregistrement non trouvé'], 400);
        }

        // Mettre à jour les colonnes 'actives' et 'comment'
        $user->update(['role_id' => $request->role_id]);
        
        return User::with('city.country')->with('role')->get();
    }

    public function create()
    {
        $cities = City::where('actives', 1)->get();
        return Inertia::render('core/user/create',
        ['user' => $this->user, 'cities' => $cities]);
    }

    public function actives($id)
    {
        $user = User::find($id);
        $user->update(['actives' => !$user->actives]);
        return User::with('city.country')->with('role')->get();
    }

    public function index(){
        $roles = Role::where('access', '<=', $this->user->role->access)->get();
        return Inertia::render('core/user/index', ['users' => User::with('city.country')->with('role')->get(), 
        'roles' => $roles, 'user' => $this->user]);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return User::with('city.country')->with('role')->get();
    }

    public function profile(){
        $cities = City::where('actives', 1)->get();
        return Inertia::render('core/user/profile', 
        ['cities' => $cities, 'roles' => $roles, 'user' => $this->user]);
    }

}
