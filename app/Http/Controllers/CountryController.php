<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Country;
use Inertia\Inertia;
use App\Models\User;

class CountryController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->user = User::where('id', Auth::user()->id)->with('role')->first();
    }

    public function store(Request $request)
    {
        // Vérifier si le pays existe déjà
        $exists = Country::where(function ($query) use ($request) {
            $query->orWhere('name_fr', $request->name_fr)
                  ->orWhere('name_en', $request->name_en)
                  ->orWhere('phone', $request->phone)
                  ->orWhere('alpha', $request->alpha)
                  ->orWhere('alph', $request->alph)
                  ->orWhere('iso', $request->iso);
        })->exists();

        if ($exists) {
            return 'Ce pays est déjà enregistré.';
        }

        if(Country::create($request->all())){
            return 'saved';
        };

        return 'Erreur lors de l\'enregistrement.';
    }

    public function update(Request $request, $id)
    {
        $country = Country::find($id);
        if($country->update($request->all())){
            return 'saved';
        } else{
            return 'Erreur de modification !';
        };
    }

    public function actives($id)
    {
        $country = Country::find($id);
        $country->update(['actives' => !$country->actives]);
        return Country::where('id', '!=', 1)->get();
    }

    public function edit($id)
    {
        $country = Country::find($id);
        return Inertia::render('core/country/edit', 
        ['country' => $country]);
    }

    public function destroy($id)
    {
        $country = Country::find($id);
        $country->delete();
        return Country::where('id', '!=', 1)->get();
    }

    public function index(){
        
        return Inertia::render('core/country/index',
        ['country' => Country::where('id', '!=', 1)->get(), 'user' => $this->user]);
    }

    public function create()
    {
        return Inertia::render('core/country/create');
    }
}
