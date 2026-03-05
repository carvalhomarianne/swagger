// ── Carrinho ──────────────────────────────────────────
let carrinho = [];

function abrirCarrinho() {
  document.getElementById('carrinhoPanel').classList.add('aberto');
  document.getElementById('carrinhoOverlay').classList.add('aberto');
}

function fecharCarrinho() {
  document.getElementById('carrinhoPanel').classList.remove('aberto');
  document.getElementById('carrinhoOverlay').classList.remove('aberto');
}

function calcularTotal() {
  const total = carrinho.reduce((acc, item) => {
    const valor = parseFloat(item.preco.replace('R$', '').replace(',', '.').trim());
    return acc + (isNaN(valor) ? 0 : valor);
  }, 0);
  document.getElementById('carrinhoTotal').textContent =
    'R$ ' + total.toFixed(2).replace('.', ',');
}

function renderizarCarrinho() {
  const container = document.getElementById('carrinhoItems');
  const contador  = document.getElementById('carrinhoContador');

  contador.textContent = carrinho.length;

  if (carrinho.length === 0) {
    container.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
    calcularTotal();
    return;
  }

  container.innerHTML = carrinho.map((item, index) => `
    <div class="carrinho-item">
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="carrinho-item-info">
        <p class="carrinho-item-nome">${item.nome}</p>
        <p class="carrinho-item-preco">${item.preco}</p>
      </div>
      <button class="carrinho-item-remover" onclick="removerItem(${index})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');

  calcularTotal();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  renderizarCarrinho();
}

function adicionarAoCarrinho(nome, preco, imagem) {
  carrinho.push({ nome, preco, imagem });
  renderizarCarrinho();
  abrirCarrinho();
}

// Abrir e fechar
document.getElementById('btnCarrinho').addEventListener('click', function(e) {
  e.preventDefault();
  abrirCarrinho();
});

document.getElementById('carrinhoFechar').addEventListener('click', fecharCarrinho);
document.getElementById('carrinhoOverlay').addEventListener('click', fecharCarrinho);

// ── Provador ──────────────────────────────────────────
function updateInfo(carouselEl, nomeId, precoId, descId, linkId) {
  carouselEl.addEventListener('slid.bs.carousel', function () {
    const active = carouselEl.querySelector('.carousel-item.active');

    document.getElementById(nomeId).textContent  = active.dataset.nome  || '—';
    document.getElementById(precoId).textContent = active.dataset.preco || '—';
    document.getElementById(descId).textContent  = active.dataset.desc  || '—';

    const link = document.getElementById(linkId);
    if (link) {
      const nome   = active.dataset.nome  || '—';
      const preco  = active.dataset.preco || '—';
      const imagem = carouselEl.querySelector('.carousel-item.active img').src;

      link.onclick = function(e) {
        e.preventDefault();
        adicionarAoCarrinho(nome, preco, imagem);
      };
    }
  });
}

updateInfo(
  document.getElementById('topCarousel'),
  'nomeTop', 'precoTop', 'descTop', 'linkTop'
);

updateInfo(
  document.getElementById('bottomCarousel'),
  'nomeBottom', 'precoBottom', 'descBottom', 'linkBottom'
);