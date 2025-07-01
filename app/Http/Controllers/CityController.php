<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Country;
use App\Models\City;
use Inertia\Inertia;
use App\Models\User;

class CityController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->user = User::where('id', Auth::user()->id)->with('role')->first();
    }

    public function store(Request $request)
    {
        // Vérifier si les frais existent déjà
        $exists = City::where([
            ['country_id', $request->country_id],
            ['name', $request->name]
        ])->exists();

        if ($exists) {
            return 'Cete ville est déjà enregistré.';
        }

        if(City::create($request->all())){
            return 'saved';
        };

        return 'Erreur lors de l\'enregistrement.';
    }

    public function update(Request $request, $id)
    {
        $city = City::find($id);
        if($city->update($request->all())){
            return 'saved';
        } else{
            return 'Erreur de modification !';
        };
    }

    public function edit($id)
    {
        $countries = Country::where([['id', '!=', 1],['actives', 1]])->get();
        $city = City::where('id', $id)->with('country')->first();
        return Inertia::render('core/city/edit', 
        ['city' => $city, 'countries' => $countries]);
    }

    public function actives($id)
    {
        $city = City::find($id);
        $city->update(['actives' => !$city->actives]);
        return City::with('country')->get();
    }

    public function destroy($id)
    {
        $city = City::find($id);
        $city->delete();
        return City::with('country')->get();
    }

    public function index(){
        
        return Inertia::render('core/city/index',
        ['cities' => City::with('country')->get(), 'user' => $this->user]);
    }

    public function create()
    {
        $countries = Country::where([['id', '!=', 1],['actives', 1]])->get();
        return Inertia::render('core/city/create',['countries' => $countries]);
    }
}
