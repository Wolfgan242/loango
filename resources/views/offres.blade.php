<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Offres d'Emploi – Postuler</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Icons Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
  <style>
    .header {
      background: linear-gradient(to right, #0d6efd, #6ea8fe);
      color: white;
      padding: 60px 0;
      text-align: center;
    }

    .job-card:hover {
      transform: scale(1.01);
      transition: 0.3s ease;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }

    .modal .form-label {
      font-weight: 500;
    }

    .card-icon {
      font-size: 1.8rem;
      color: #0d6efd;
    }

    .badge-location {
      background-color: #f0f0f0;
      color: #333;
      font-size: 0.8rem;
    }

    .form-floating > .form-control:focus ~ label {
  opacity: 0.85;
  transform: scale(0.95) translateY(-1.4rem);
}

.modal .form-label {
  font-weight: 500;
}
  </style>
</head>
<body class="bg-light">

  <!-- Header -->
  <div class="header">
    <h1 class="display-5">Offres d'emploi disponibles</h1>
    <p class="lead">Trouvez une opportunité et envoyez votre candidature en quelques clics.</p>
  </div>

  <!-- Liste des offres -->
  <div class="container py-5">
    <div class="row g-4" id="job-list">
      @forelse(\App\Models\Offer::where([['approval', '>=', 1],['actives', 1]])->with('establishment.institution')->get() as $offer)
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-sm h-100 p-3 job-card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <i class="bi bi-briefcase card-icon me-2" width="20" height="2"></i>
              <h5 class="card-title mb-0">{{$offer->name}}</h5>
            </div>
            <p class="text-muted small">{{$offer->establishment->name}} <br> Contrat : <strong>CDI</strong></p>
            <p class="badge badge-location">📍 {{$offer->establishment->address}}</p>
            <p class="mt-2 small">{{ Str::limit($offer->description, 100, ' ...') }}</p>
            
              <button class="btn btn-outline-primary w-100 mt-3" data-bs-toggle="modal" data-bs-target="#applyModal" data-job="Développeur Web">
                Détails de l offre
              </button>
            
          </div>
        </div>
      </div>          
      @empty
      <div></div>
      @endforelse
    </div>
  </div>

  <!-- Modal de candidature -->
  <div class="modal fade" id="applyModal" tabindex="-1" aria-labelledby="applyModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    @if(session('success'))
      <div class="alert alert-success" role="alert">{{ session('success') }}</div>
    @elseif(session('warning'))
      <div class="alert alert-warning" role="alert">{{ session('warning') }}</div>
    @elseif(session('danger'))
      <div class="alert alert-danger" role="alert">{{ session('danger') }}</div>
    @else
      <div></div>
    @endif
    <br>
    <form action="{{route('apply.store')}}" class="modal-content p-3" enctype="multipart/form-data" method="POST">
      @csrf
      <div class="modal-header border-0">
        <h5 class="modal-title fw-bold" id="applyModalLabel">📄 Postuler à l offre</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
      </div>

      <input type="number" name="offer_id" value="3" hidden>
      <div class="modal-body pt-0">
        <div class="form-floating mb-3">
          <input type="text" id="jobPosition" class="form-control" placeholder="Poste" readonly>
          <label for="jobPosition">Poste concerné</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" name="name" class="form-control" id="name" value="{{old('name')}}" placeholder="Nom complet" required>
          <label for="name"><i class="bi bi-person-fill me-1"></i>Nom complet</label>
          @error('name')
            <span class="text-danger">{{ $message }}</span>
          @enderror
        </div>

        <div class="form-floating mb-3">
          <input type="email" name="email" value="{{old('email')}}" class="form-control" id="email" placeholder="Adresse email" required>
          <label for="email"><i class="bi bi-envelope-fill me-1"></i>Email</label>
          @error('email')
            <span class="text-danger">{{ $message }}</span>
          @enderror
        </div>

        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="cv" class="form-label">📎 CV (PDF)</label>
            <input type="file" id="cv" name="cv" value="{{old('cv')}}" class="form-control" accept=".pdf" required>
            <small class="form-text text-muted">Max: 2 Mo</small>
            @error('cv')
              <span class="text-danger">{{ $message }}</span>
            @enderror
          </div>
          <div class="col-md-4 mb-3">
            <label for="letter" class="form-label">📎 Lettre de motivation</label>
            <input type="file" name="letter" id="letter" value="{{old('letter')}}" class="form-control" accept=".pdf" required>
            @error('letter')
              <span class="text-danger">{{ $message }}</span>
            @enderror
          </div>
          <div class="col-md-4 mb-3">
            <label for="diploma" class="form-label">🎓 Dernier diplôme</label>
            <input type="file" id="diploma" name="diploma" value="{{old('diploma')}}" class="form-control" accept=".pdf" required>
            @error('diploma')
              <span class="text-danger">{{ $message }}</span>
            @enderror
          </div>
        </div>
      </div>

      <div class="modal-footer border-0 pt-0">
        <button type="submit" class="btn btn-success">
          <i class="bi bi-send-fill me-1"></i>Envoyer la candidature
        </button>
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Annuler</button>
      </div>
    </form>
  </div>
</div>


  <!-- Bootstrap JS -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Script pour remplir automatiquement le poste -->
  <script>
    const applyModal = document.getElementById('applyModal');
    applyModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const jobTitle = button.getAttribute('data-job');
      document.getElementById('jobPosition').value = jobTitle;
    });
  </script>

</body>
</html>
