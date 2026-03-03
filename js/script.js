// Atualiza info do painel ao trocar slide
function updateInfo(carouselEl, nomeId, precoId, descId) {

  // Escuta o evento de troca de slide do Bootstrap
  carouselEl.addEventListener('slid.bs.carousel', function () {

    // Pega o slide que está ativo agora
    const active = carouselEl.querySelector('.carousel-item.active');

    // Lê os data-* e atualiza os painéis laterais
    document.getElementById(nomeId).textContent  = active.dataset.nome;
    document.getElementById(precoId).textContent = active.dataset.preco;
    document.getElementById(descId).textContent  = active.dataset.desc;

    // Atualiza o contador de slides
    const items = carouselEl.querySelectorAll('.carousel-item');
    let idx = 0;
    items.forEach((el, i) => { if (el.classList.contains('active')) idx = i + 1; });
    const counterId = carouselEl.id === 'topCarousel' ? 'counterTop' : 'counterBottom';
    document.getElementById(counterId).innerHTML = `<span>${idx}</span> / ${items.length}`;
  });
}

// Inicializa os dois carrosséis
updateInfo(
  document.getElementById('topCarousel'),
  'nomeTop', 'precoTop', 'descTop'
);

updateInfo(
  document.getElementById('bottomCarousel'),
  'nomeBottom', 'precoBottom', 'descBottom'
);