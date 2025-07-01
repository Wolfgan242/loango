<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Mail\Candidacy;
use App\Models\Offer;
use App\Models\Apply;

class ApplyController extends Controller
{
    public function store(Request $request){
        // Validation des entrées
        $request->validate([
            'diploma' => 'required|mimes:pdf|max:2048',
            'letter' => 'required|mimes:pdf|max:2048',
            'cv' => 'required|mimes:pdf|max:2048',
            'offer_id' => 'required|integer|exists:offers,id',
            'name' => 'required|string',
            'email' => 'required|email',
        ]);
    
        // Vérification de l'offre
        $offer = Offer::find($request->offer_id);
        if (!$offer || $offer->actives != 1) {
            return redirect()->back()->with('warning', 'Cette offre n\'est plus active.')->withInput();
        }
        
        // Vérification du postulant
        // $apply = Apply::where([['offer_id', $request->offer_id], ['email', $request->email]])->first();
        // if ($apply) {
        //     return redirect()->back()->with('warning', 'Vous avez déjà postulé à cette offre.')->withInput();
        // }
    
        $uploadedFiles = []; // Initialisation du tableau des fichiers
    
        // Processus d'upload des fichiers
        foreach (['diploma', 'letter', 'cv'] as $inputName) {
            if ($request->hasFile($inputName)) {
                $file = $request->file($inputName);
                $fileName = rand() . "." . $file->getClientOriginalExtension();
                $filePath = $file->storeAs('uploads', $fileName, 'public');
                $uploadedFiles[$inputName] = $fileName;
            } else {
                return redirect()->back()->with('error', 'Le fichier ' . $inputName . ' est manquant.')->withInput();
            }
        }
    
        // Enregistrement de la candidature
        $apply = new Apply();
        $apply->diploma = $uploadedFiles['diploma'];
        $apply->letter = $uploadedFiles['letter'];
        $apply->offer_id = $request->offer_id;
        $apply->cv = $uploadedFiles['cv'];
        $apply->email = $request->email;
        $apply->name = $request->name;
    
        if ($apply->save()) {
            Mail::to($request->email)->send(new Candidacy($request->name, $offer->name, 'Confirmation de réception de votre candidature', 'receive', $request->email));
            return redirect()->back()->with('success', 'Vous avez postulé avec succès !');
        } else {
            return redirect()->back()->with('danger', 'Erreur d\'envoi, veuillez réessayer.')->withInput();
        }
    }

    public function rejected(Request $request, $id)
    {
        // Trouver l'enregistrement par son ID
        $apply = Apply::where('id', $id)->with('offer')->first();

        // Vérifier si l'enregistrement existe
        if (!$apply) {
            return response()->json(['message' => 'Enregistrement non trouvé'], 400);
        }

        // Mettre à jour les colonnes 'actives' et 'comment'
        $apply->update([
            'comment' => $request->comment,
            'approval' => 1
        ]);

        Mail::to($apply->email)->send(new Candidacy($apply->name, $apply->offer->name, 'Approbation de votre candidature', 'reject', $apply->email));
        // Retourner tous les enregistrements triés par ID décroissant
        return Apply::all();
    }

    public function approval($id){
        // Trouver l'enregistrement par son ID
        $apply = Apply::where('id', $id)->with('offer')->first();

        // Vérifier si l'enregistrement existe
        if (!$apply) {
            return response()->json(['message' => 'Enregistrement non trouvé'], 400);
        }

        // Mettre à jour les colonnes 'actives' et 'comment'
        $apply->update(['approval' => 2]);
        Mail::to($apply->email)->send(new Candidacy($apply->name, $apply->offer->name, 'Approbation de votre candidature', 'approval', $apply->email));
        // Retourner tous les enregistrements triés par ID décroissant
        return Apply::all();
    }
}
