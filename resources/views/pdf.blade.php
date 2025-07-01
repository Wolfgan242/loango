
<link rel="stylesheet" href="{{ public_path('css/bootstrap.min.css') }}">
<link rel="stylesheet" href="{{ public_path('css/dashboard.css') }}">
<link rel="stylesheet" href="{{ public_path('css/style.css') }}">

<div class="container py-5">
    <div class="card shadow-lg border-0 rounded-4 p-4">
      <div class="row g-4">
        <!-- Main Content -->
        <div class="col-lg-12">
            <div class="">
                <!-- Logo -->
                
                <img src="{{ public_path('armoire.png') }}" alt="Logo" height="80px" width="80px">
                <!-- Texte -->
                <div class="header-text" style="margin-left: 100px; margin-top: -90px" >
                  <h2 class="fw-bold">{{ $offer->name }}</h2>
                  <h4 class="text-muted">{{ $offer->establishment->name }}</h4>
                  <h6 class="text-muted">{{ $offer->establishment->institution->name }}</h6>
                  <strong>{{ $offer->reference }}</strong>
                </div>
            </div>
          
          <br>
          <div class="mb-4 d-flex flex-wrap gap-2 mb-2">
            <span class="badge bg-warning text-dark"><strong>Condition: </strong>{{$offer->condition}}</span>
            <span class="badge bg-primary"><strong>Temps de travail: </strong>{{$offer->temps}}</span>
            <span class="badge bg-success"><strong>Expérience: </strong>{{$offer->experience}} +</span>
            <span class="badge bg-secondary"><strong>Contrat: </strong>{{$offer->contract}}</span>
            
          </div>

          <div class="mb-3">
            <p class="mb-1"><strong>Localisation:</strong> {{$offer->establishment->address}}, {{$offer->establishment->institution->city->name}}, {{$offer->establishment->institution->city->country->name_fr}}.</p>
            <p class="mb-1"><strong>Salaire(XAF):</strong> A définir.</p>
          </div>

          <hr>

          <section class="mb-4">
            <h4>Description</h4>
            <p class="text-muted">{{$offer->description}}</p>
          </section>
          <section class="mb-4">
            <h4 class="mb-3">Les Exigences</h4>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge bg-dark">React</span>
              <span class="badge bg-dark">Bootstrap</span>
              <span class="badge bg-dark">TypeScript</span>
            </div>
          </section>
          <section class="mb-4">
            <h4>Compétences</h4>
            <div class="text-muted">
                <span>React</span>
                <span>Bootstrap</span>
                <span>TypeScript</span>
            </div>
          </section>
          <section class="mb-4">
            <h4>Avantages</h4>
            <div class="text-muted">
              <span>React</span>
              <span>Bootstrap</span>
              <span>TypeScript</span>
            </div>
          </section>
        </div>

        <!-- Side Panel -->
        <div class="col-lg-12">
            <div class="row">
                <div>
                    <strong>Contact:</strong>
                    <div>hr@techcorp.com</div>
                </div>
                <br>
                <div class="col-6">
                    <div><strong>Publication:</strong> April 20, 2025</div>
                </div>
                <div class="col-6">
                    <div><strong>Clôture:</strong> April 20, 2025</div>
                </div>
            </div>
        </div>
      </div>
    </div>
</div>