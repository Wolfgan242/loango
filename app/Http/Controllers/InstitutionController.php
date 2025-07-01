<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Institution;
use App\Models\User;
use App\Models\City;
use Inertia\Inertia;

class InstitutionController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->user = User::where('id', Auth::user()->id)->with('role')->first();
    }

    public function store(Request $request)
    {
        // Vérifier si les frais existent déjà
        $exists = Institution::where([
            ['city_id', $request->city_id],
            ['address', $request->address],
            ['status', $request->status],
            ['name', $request->name]
        ])->exists();

        if ($exists) {
            return 'Cette institution existe déjà.';
        }

        if(Institution::create($request->all())){
            return 'saved';
        };

        return 'Erreur lors de l\'enregistrement.';
    }

    public function update(Request $request, $id)
    {
        $institution = Institution::find($id);
        if($institution->update($request->all())){
            return 'saved';
        } else{
            return 'Erreur de modification !';
        };
    }

    public function index(){
        $institutions = Institution::with('city.country')->with('user')->get();
        return Inertia::render('core/institution/index', ['user' 
        => $this->user, 'institutions' => $institutions]);
    }

    public function create()
    {
        $cities = City::where('actives', 1)->get();
        return Inertia::render('core/institution/create',
        ['user' => $this->user, 'cities' => $cities]);
    }

    public function show($id)
    {
        $institution = Institution::where('id', $id)->with('user')->with('city.country')->first();
        return Inertia::render('core/institution/show', 
        ['institution' => $institution]);
    }

    public function edit($id)
    {
        $institution = Institution::where('id', $id)->with('user')->with('city.country')->first();
        $cities = City::where('actives', 1)->get();
        return Inertia::render('core/institution/edit', 
        ['institution' => $institution, 'cities' => $cities]);
    }

    public function approval($id){
        // Trouver l'enregistrement par son ID
        $institution = Institution::find($id);

        // Vérifier si l'enregistrement existe
        if (!$institution) {
            return response()->json(['message' => 'Enregistrement non trouvé'], 400);
        }

        // Mettre à jour les colonnes 'actives' et 'comment'
        $institution->update(['approval' => 2]);

        // Retourner tous les enregistrements triés par ID décroissant
        return Institution::with('city.country')->with('user')->get();
    }

    public function rejected(Request $request, $id)
    {
        // Trouver l'enregistrement par son ID
        $institution = Institution::find($id);

        // Vérifier si l'enregistrement existe
        if (!$institution) {
            return response()->json(['message' => 'Enregistrement non trouvé'], 400);
        }

        // Mettre à jour les colonnes 'actives' et 'comment'
        $institution->update([
            'comment' => $request->comment,
            'approval' => 1
        ]);

        // Retourner tous les enregistrements triés par ID décroissant
        return Institution::with('city.country')->with('user')->get();
    }

    public function actives($id)
    {
        $institution = Institution::find($id);
        $institution->update(['actives' => !$institution->actives]);
        return Institution::with('city.country')->with('user')->get();
    }

    public function destroy($id)
    {
        $institution = Institution::find($id);
        $institution->delete();
        return Institution::with('city.country')->with('user')->get();
    }
}
