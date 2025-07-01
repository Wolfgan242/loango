<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Criteria;
use Inertia\Inertia;
use App\Models\User;

class CriteriaController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->user = User::where('id', Auth::user()->id)->with('role')->first();
    }

    public function store(Request $request)
    {
        // Vérifier si les frais existent déjà
        $exists = Criteria::where([
            ['titre', $request->titre],
            ['type', $request->type]
        ])->exists();

        if ($exists) {
            return 'Ce critère est déjà enregistré.';
        }

        if(Criteria::create($request->all())){
            return 'saved';
        };

        return 'Erreur lors de l\'enregistrement.';
    }

    public function update(Request $request, $id)
    {
        $criteria = Criteria::find($id);
        if($criteria->update($request->all())){
            return 'saved';
        } else{
            return 'Erreur de modification !';
        };
    }

    public function edit($id)
    {
        $criteria = Criteria::find($id);
        return Inertia::render('core/criteria/edit', 
        ['criteria' => $criteria]);
    }

    public function actives($id)
    {
        $criteria = Criteria::find($id);
        $criteria->update(['actives' => !$criteria->actives]);
        return Criteria::all();
    }

    public function destroy($id)
    {
        $criteria = Criteria::find($id);
        $criteria->delete();
        return Criteria::all();
    }

    public function index(){
        
        return Inertia::render('core/criteria/index',
        ['criterias' => Criteria::all(), 'user' => $this->user]);
    }

    public function create()
    {
        return Inertia::render('core/criteria/create');
    }
}
