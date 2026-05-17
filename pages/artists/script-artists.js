var ARTISTS = [];  // preenchido pelo fetch do artists.json
var currentIndex = 0;  // qual artista está visível no carrossel


// ==============
// REFERÊNCIAS
// ==============
var stage = document.getElementById("carousel-stage");
var dotsWrap = document.getElementById("carousel-dots");
var btnPrev = document.getElementById("btn-prev");
var btnNext = document.getElementById("btn-next");
var hamburger = document.getElementById("hamburger");
var mobileMenu = document.getElementById("mobile-menu");

var modalOverlay = document.getElementById("modal-overlay");
var btnFechar = document.getElementById("btn-fechar");
var mCover = document.getElementById("m-cover");
var mName = document.getElementById("m-name");
var mGenre = document.getElementById("m-genre");
var mSince = document.getElementById("m-since");
var mCuriosities = document.getElementById("m-curiosities");
var mAlbums = document.getElementById("m-albums");


// ===================================================================
// RENDERIZAR CARROSSEL
// Monta todos os cards mas só mostra o que está no currentIndex.
// ===================================================================
function renderCarousel() {
  var cardsHtml = "";
  for (var i = 0; i < ARTISTS.length; i++) {
    var a = ARTISTS[i];
    var isActive = i === currentIndex ? "carousel-card active" : "carousel-card";

    var photoHtml = a.photo
      ? `<img src="${a.photo}" alt="${a.name}">`
      : `<span class="placeholder-icon">♪</span>`;

    cardsHtml += `
      <div class="${isActive}" data-id="${a.id}">
        <div class="carousel-photo">${photoHtml}</div>
        <div class="carousel-card-info">
          <p class="genre">${a.genre}</p>
          <p class="name">${a.name}</p>
          <p class="since">Desde ${a.since}</p>
          <p class="preview">${a.curiosities}</p>
        </div>
        <p class="carousel-hint">Clique para saber mais</p>
      </div>
    `;
  }

  stage.innerHTML = cardsHtml;

  // Adiciona clique em cada card para abrir o modal
  document.querySelectorAll(".carousel-card").forEach(function(card) {
    card.addEventListener("click", function() {
      openModal(parseInt(this.getAttribute("data-id")));
    });
  });

  renderDots();
}


// ===================================================================
// PONTOS DE NAVEGAÇÃO
// Um ponto por artista, o ponto ativo fica roxo.
// ===================================================================
function renderDots() {
  var html = "";
  for (var i = 0; i < ARTISTS.length; i++) {
    var isActive = i === currentIndex ? "carousel-dot active" : "carousel-dot";
    html += `<div class="${isActive}" data-index="${i}"></div>`;
  }
  dotsWrap.innerHTML = html;

  // Clicando num ponto, vai direto para aquele artista
  document.querySelectorAll(".carousel-dot").forEach(function(dot) {
    dot.addEventListener("click", function() {
      currentIndex = parseInt(this.getAttribute("data-index"));
      renderCarousel();
    });
  });
}


// ====================
// NAVEGAÇÃO — setas
// ====================
btnPrev.addEventListener("click", function() {
  // Se estiver no primeiro, vai para o último (carrossel circular)
  if (currentIndex === 0) {
    currentIndex = ARTISTS.length - 1;
  } else {
    currentIndex--;
  }
  renderCarousel();
});

btnNext.addEventListener("click", function() {
  if (currentIndex === ARTISTS.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  renderCarousel();
});


// =================
// MODAL — ABRIR
// =================
function openModal(id) {
  var a = null;
  for (var i = 0; i < ARTISTS.length; i++) {
    if (ARTISTS[i].id === id) {
      a = ARTISTS[i];
      break;
    }
  }
  if (!a) return;

  mCover.innerHTML = a.photo ? `<img src="${a.photo}" alt="${a.name}">` : "♪";
  mName.textContent = a.name;
  mGenre.textContent = a.genre;
  mSince.textContent = "Desde " + a.since;
  mCuriosities.textContent = a.curiosities;

  // Monta a lista de álbuns famosos
  var albumsHtml = "";
  for (var i = 0; i < a.albums.length; i++) {
    albumsHtml += `<div class="fav-track-item">${a.albums[i]}</div>`;
  }
  mAlbums.innerHTML = albumsHtml;

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}


// ================
// MODAL — FECHAR
// ================
function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

btnFechar.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", function(e) {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") btnPrev.click();
  if (e.key === "ArrowRight") btnNext.click();
});


// ===========
// HAMBURGER
// ===========
hamburger.addEventListener("click", function() {
  mobileMenu.classList.toggle("open");
});


// =======
// INIT
// =======
fetch("../../artists-data.json")
  .then(function(response) { return response.json(); })
  .then(function(data) {
    ARTISTS = data;
    renderCarousel();
  });