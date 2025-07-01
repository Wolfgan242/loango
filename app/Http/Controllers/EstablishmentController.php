<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Establishment;
use Illuminate\Http\Request;
use App\Models\Institution;
use App\Models\User;
use Inertia\Inertia;

class EstablishmentController extends Controller
{
    protected $user;
    protected $institutions;
    protected $establishments;
    public function __construct()
    {
        $this->user = User::where('id', Auth::user()->id)->with('role')->first();
        // Récupération des institutions actives et approuvées (approval >= 2)
        $this->establishments = Establishment::with('institution.city.country')->with('user')->get();
        $this->institutions = Institution::query()->where('actives', true)
            ->where('approval', '>=', 2)
            ->orderBy('name') // Optionnel : trie par nom pour une meilleure UX dans un formulaire
            ->get(['id', 'name']); // Limite les colonnes pour optimiser la réponse
    }

    public function store(Request $request)
    {
        // Vérifier si les frais existent déjà
        $exists = Establishment::where([
            ['institution_id', $request->institution_id],
            ['address', $request->address],
            ['name', $request->name]
        ])->exists();

        if ($exists) {
            return 'Cette establishment existe déjà.';
        }

        if(Establishment::create($request->all())){
            return 'saved';
        };

        return 'Erreur lors de l\'enregistrement.';
    }

    public function update(Request $request, $id)
    {
        $establishment = Establishment::find($id);
        if($establishment->update($request->all())){
            return 'saved';
        } else{
            return 'Erreur de modification !';
        };
    }

    public function index(){
        return Inertia::render('core/establishment/index', ['user' 
        => $this->user, 'establishments' => $this->establishments]);
    }

    public function create()
    {
        // Rendu de la vue avec les données nécessaires
        return Inertia::render('core/establishment/create', [
            'user' => $this->user,
            'institutions' => $this->institutions,
        ]);
    }

    public function show($id)
    {
        $establishment = Establishment::with('institution.city.country')
        ->where('id', $id)->with('user')->first();
        return Inertia::render('core/establishment/show', 
        ['establishment' => $establishment]);
    }

    public function edit($id)
    {
        $establishment = Establishment::with('institution.city.country')
        ->where('id', $id)->with('user')->first();
        return Inertia::render('core/establishment/edit', 
        ['establishment' => $establishment, 'institutions' => $this->institutions,]);
    }

    public function approval($id){
        // Trouver l'enregistrement par son ID
        $establishment = Establishment::find($id);

        // Vérifier si l'enregistrement existe
        if (!$establishment) {
            return response()->json(['message' => 'Enregistrement non trouvé'], 400);
        }

        // Mettre à jour les colonnes 'actives' et 'comment'
        $establishment->update(['approval' => 2]);

        // Retourner tous les enregistrements triés par ID décroissant
        return $this->establishments;
    }

    public function rejected(Request $request, $id)
    {
        // Trouver l'enregistrement par son ID
        $establishment = Establishment::find($id);

        // Vérifier si l'enregistrement existe
        if (!$establishment) {
            return response()->json(['message' => 'Enregistrement non trouvé'], 400);
        }

        // Mettre à jour les colonnes 'actives' et 'comment'
        $establishment->update([
            'comment' => $request->comment,
            'approval' => 1
        ]);

        // Retourner tous les enregistrements triés par ID décroissant
        return Establishment::with('institution.city.country')->with('user')->get();
    }

    public function actives($id)
    {
        $establishment = Establishment::find($id);
        $establishment->update(['actives' => !$establishment->actives]);
        return Establishment::with('institution.city.country')->with('user')->get();
    }

    public function destroy($id)
    {
        $establishment = Establishment::find($id);
        $establishment->delete();
        return Establishment::with('institution.city.country')->with('user')->get();
    }
}
