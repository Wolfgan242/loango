<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Establishment;
use Illuminate\Http\Request;
use App\Models\Criteria;
use App\Models\Apply;
use App\Models\Offer;
use Inertia\Inertia;
use App\Models\User;

class OfferController extends Controller
{   
    protected $user;
    public function __construct()
    {
        $this->user = User::where('id', Auth::user()->id)->with('role')->first();
    }

    public function store(Request $request)
    {
        // Vérifier si les frais existent déjà
        $exists = Offer::where([
            ['establishment_id', $request->establishment_id],
            ['reference', $request->reference],
            ['condition', $request->condition],
            ['deadline', $request->deadline],
            ['name', $request->name]
        ])->exists();

        if ($exists) {
            return 'Cette offre est déjà enregistré.';
        }

        if(Offer::create($request->all())){
            return 'saved';
        };

        return 'Erreur lors de l\'enregistrement.';
    }

    /**
     * Confirm a reception of fees payment.
     */
    public function rejected(Request $request, $id)
    {
        // Trouver l'enregistrement par son ID
        $offer = Offer::find($id);

        // Vérifier si l'enregistrement existe
        if (!$offer) {
            return response()->json(['message' => 'Enregistrement non trouvé'], 400);
        }

        // Mettre à jour les colonnes 'actives' et 'comment'
        $offer->update([
            'comment' => $request->comment,
            'approval' => 1
        ]);

        // Retourner tous les enregistrements triés par ID décroissant
        return Offer::with('establishment')->with('user')->get();
    }

    public function approval($id){
        // Trouver l'enregistrement par son ID
        $offer = Offer::find($id);

        // Vérifier si l'enregistrement existe
        if (!$offer) {
            return response()->json(['message' => 'Enregistrement non trouvé'], 400);
        }

        // Mettre à jour les colonnes 'actives' et 'comment'
        $offer->update(['approval' => 2]);

        // Retourner tous les enregistrements triés par ID décroissant
        return Offer::with('establishment')->with('user')->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $offer = Offer::find($id);
        if($offer->update($request->all())){
            return 'saved';
        } else{
            return 'Erreur de modification !';
        };
    }

    /**
     * Confirm a reception of fees payment.
     */
    public function actives($id)
    {
        $offer = Offer::find($id);
        $offer->update(['actives' => !$offer->actives]);
        return Offer::with('establishment')->with('user')->get();
    }

    public function index(){
        $offers = Offer::with('establishment')->with('applies')->with('user')->get();
        return Inertia::render('core/offer/index', ['user' 
        => $this->user, 'offers' => $offers]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $offer = Offer::find($id);
        $offer->delete();
        return Offer::with('establishment')->with('user')->get();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $offer = Offer::find($id);
        return Inertia::render('core/offer/edit', 
        ['offer' => $offer]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function show($id)
    {
        $offer = Offer::with('establishment.institution')->where('id', $id)->first();
        return Inertia::render('core/offer/show', ['offer' => $offer]);
    }

    public function create()
    {
        $establishments = Establishment::where([['approval', 2],['actives', 1]])->get();
        $skills = Criteria::where([['type', 'competence'],['actives', 1]])->get();
        $conditions = Criteria::where([['type', 'condition'],['actives', 1]])->get();
        $requirements = Criteria::where([['type', 'exigence'],['actives', 1]])->get();
        $benefits = Criteria::where([['type', 'avantage'],['actives', 1]])->get();
        $contracts = Criteria::where([['type', 'contrat'],['actives', 1]])->get();
        $times = Criteria::where([['type', 'temps'],['actives', 1]])->get();
        return Inertia::render('core/offer/create', 
        ['establishments' => $establishments,
        'skills' => $skills,
        'conditions' => $conditions,
        'requirements' => $requirements,
        'benefits' => $benefits,
        'contracts' => $contracts,
        'times' => $times, 'user' => $this->user]);
    }

    public function generate($id)
    {
        $offer = Offer::with('establishment.institution.city.country')->where('id', $id)->first();
        $pdf = Pdf::loadView('pdf', ['offer' => $offer]);
        return $pdf->download($offer->name.'.pdf');
    }

    public function applies($id){
        $applies = Apply::where('offer_id', $id)->get();
        return Inertia::render('core/offer/applies', ['applies' => $applies]);
    }
}