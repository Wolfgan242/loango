<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Candidacy extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $config;
    public $poste;
    public $email;
    public $nom;

    public function __construct($nom, $poste, $subject, $config, $email)
    {
        $this->subject = $subject;
        $this->config = $config;
        $this->poste = $poste;
        $this->email = $email;
        $this->nom = $nom;
    }

    public function build()
    {
        if($this->config == 'password'){
            return $this->subject($this->subject)->view('mails.password');
        }
        if($this->config == 'approval'){
            return $this->subject($this->subject)->view('mails.approval');
        }
        if($this->config == 'receive'){
            return $this->subject($this->subject)->view('mails.receive');
        }
        if($this->config == 'reject'){
            return $this->subject($this->subject)->view('mails.reject');
        }
    }
}
