// ===================================================================
// ESTADO
// Duas variáveis que guardam o que está acontecendo na página agora.
// ===================================================================
var REVIEWS = [];  // será preenchido pelo fetch do dados.json
var activeFilter = "todos";  // qual botão de ano está selecionado


// ===================================================================
// REFERÊNCIAS
// Aqui pego os elementos do HTML pelo id com getElementById.
// Faço isso uma vez só e guardo em variáveis para não precisar
// buscar toda vez que eu precisar usar.
// ===================================================================
var grid = document.getElementById("grid-resenhas");
var emptyState = document.getElementById("empty-state");
var countLabel = document.getElementById("count-label");
var timeline = document.getElementById("timeline");
var modalOverlay = document.getElementById("modal-overlay");
var btnFechar = document.getElementById("btn-fechar");
var mCover = document.getElementById("m-cover");
var mArtist = document.getElementById("m-artist");
var mTitle = document.getElementById("m-title");
var mYear = document.getElementById("m-year");
var mRating = document.getElementById("m-rating");
var mAnalise = document.getElementById("m-analise");
var mTracks = document.getElementById("m-faixas");
var mTracksWrap = document.getElementById("m-faixas-wrap");
var hamburger = document.getElementById("hamburger");
var mobileMenu = document.getElementById("mobile-menu");


// ===================================================================
// ESTRELAS
// Recebe uma nota de 0 a 10 e devolve 5 estrelas em HTML.
// Exemplo: nota 8 → 4 estrelas cheias + 1 vazia.
// ===================================================================
function stars(note) {
  var full = Math.round(note / 2);
  var html = "";
  for (var i = 1; i <= 5; i++) {
    if (i <= full) {
      html += '<span class="star">★</span>';
    } else {
      html += '<span class="star empty">★</span>';
    }
  }
  return html;
}


// ===================================================================
// RENDERIZAR GRID
// Lê o filtro ativo, filtra a lista de resenhas e desenha os cards.
// innerHTML = define todo o conteúdo HTML de dentro de um elemento.
// ===================================================================
function renderGrid() {

  // Filtra por ano se necessário
  var lst = [];
  for (var i = 0; i < REVIEWS.length; i++) {
    if (activeFilter === "todos" || REVIEWS[i].year === activeFilter) {
      lst.push(REVIEWS[i]);
    }
  }

  // Atualiza o contador "X álbuns"
  countLabel.textContent = lst.length + " álbuns";

  // Se não tiver resenhas no filtro, mostra mensagem de vazio
  if (lst.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  // Monta o HTML de todos os cards numa string só. Por conta da performance, montamos tudo de uma vez e depois inserimos de uma vez só.
  var html = "";
  for (var i = 0; i < lst.length; i++) {
    var r = lst[i];
    html += `
      <div class="album-card" data-id="${r.id}">
        <div class="album-cover">
          <img src="${r.image}" alt="${r.album}">
          <span class="year-badge">${r.year}</span>
        </div>
        <div class="album-info">
          <span class="artist">${r.artist}</span>
          <span class="title">${r.album}</span>
          <div class="rating">${stars(r.note)}</div>
          <p class="snippet">${r.review}</p>
        </div>
      </div>
    `;
  }

  // Joga todo o HTML de uma vez dentro do grid
  grid.innerHTML = html;

  // Agora que os cards existem, adiciona o evento de clique em cada um
  document.querySelectorAll(".album-card").forEach(function(card) {
    card.addEventListener("click", function() {
      openModal(parseInt(this.getAttribute("data-id")));
    });
  });
}


// ===================================================================
// MODAL — ABRIR
// Recebe o id do álbum clicado, encontra os dados e preenche o modal.
// ===================================================================
function openModal(id) {

  // Encontra o álbum pelo id
  var r = null;
  for (var i = 0; i < REVIEWS.length; i++) {
    if (REVIEWS[i].id === id) {
      r = REVIEWS[i];
      break;
    }
  }
  if (!r) return;

  // Preenche cada campo do modal com os dados do álbum
  mCover.innerHTML = `<img src="${r.image}" alt="${r.album}">`;
  mArtist.textContent = r.artist;
  mTitle.textContent = r.album;
  mYear.textContent = r.year + " · " + r.genre;
  mRating.innerHTML = stars(r.note) + ` <span>${r.note}/10</span>`;
  mAnalise.textContent = r.review;

  // Faixas favoritas: monta uma linha por faixa
  if (r.tracks && r.tracks.length > 0) {
    var tracksHtml = "";
    for (var i = 0; i < r.tracks.length; i++) {
      tracksHtml += `<div class="fav-track-item">${r.tracks[i]}</div>`;
    }
    mTracks.innerHTML = tracksHtml;
    mTracksWrap.style.display = "block";
  } else {
    mTracksWrap.style.display = "none";
  }

  // Abre o modal
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

// Fecha clicando no fundo escuro fora do modal
modalOverlay.addEventListener("click", function(e) {
  if (e.target === modalOverlay) closeModal();
});


// ===================================================================
// FILTRO DE ANO
// Ativa o botão clicado e redesenha o grid com o filtro novo.
// ===================================================================
function activateFilter(year) {
  activeFilter = year;

  // Marca o botão certo como "active" e desmarca os outros
  document.querySelectorAll(".year-btn").forEach(function(btn) {
    btn.classList.toggle("active", btn.getAttribute("data-year") === year);
  });

  renderGrid();
}

document.querySelectorAll(".year-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    activateFilter(this.getAttribute("data-year"));
  });
});


// ===================================================================
// TIMELINE DOS ANOS
// Conta quantos álbuns tem em cada ano e desenha as barrinhas.
// A barra do ano com mais álbuns sempre fica em 100%.
// Os outros ficam proporcionais a esse máximo.
// ===================================================================
function renderSidebar() {
  var years = ["2024", "2025", "2026"];

  // Conta álbuns por ano e encontra o maior valor
  var counter = {};
  var max = 0;
  for (var i = 0; i < years.length; i++) {
    var year = years[i];
    var total = 0;
    for (var j = 0; j < REVIEWS.length; j++) {
      if (REVIEWS[j].year === year) total++;
    }
    counter[year] = total;
    if (total > max) max = total;
  }

  // Monta o HTML de cada linha da timeline
  var html = "";
  for (var i = 0; i < years.length; i++) {
    var year = years[i]; // Ano
    var qtt = counter[year]; // Quantidade de albuns
    var pct = max > 0 ? Math.round((qtt / max) * 100) : 0; // Porcentagem
    var dot = qtt > 0 ? "tl-dot has-reviews" : "tl-dot"; // Indica a cor da barra (se tem album == roxo, se não fica cor padrão)
    var label = qtt === 1 ? "1 álbum" : qtt + " álbuns"; // Texto no final da barrinha com a quantidade de albuns

    html += `
      <div class="tl-item" data-year="${year}">
        <div class="${dot}"></div>
        <span class="tl-year">${year}</span>
        <div class="tl-bar-wrap">
          <div class="tl-bar" style="width:${pct}%"></div>
        </div>
        <span class="tl-count">${label}</span>
      </div>
    `;
  }

  timeline.innerHTML = html;

  // Clicando numa linha, filtra o grid por aquele ano
  document.querySelectorAll(".tl-item").forEach(function(item) {
    item.addEventListener("click", function() {
      activateFilter(this.getAttribute("data-year"));
      document.getElementById("resenhas").scrollIntoView({ behavior: "smooth" });
    });
  });
}


// ===================================================================
// HAMBURGER (menu mobile)
// Altera a classe "open" no menu. O CSS usa essa classe para
// mostrar ou esconder o menu em telas pequenas.
// ===================================================================
hamburger.addEventListener("click", function() {
  mobileMenu.classList.toggle("open");
});


// ====================================================
// INIT — ponto de partida do script
// fetch() busca o arquivo dados.json.
// .then() é executado quando a resposta chega.
// Primeiro .then() converte a resposta para JSON.
// Segundo .then() usa os dados para montar a página.
// ====================================================
fetch("data.json")
  .then(function(response) { return response.json(); })
  .then(function(data) {
    REVIEWS = data;
    renderSidebar();
    renderGrid();
  });