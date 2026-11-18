// Endereço API
const URL_API = 'https://rickandmortyapi.com/api/character';

// Elementos do HTml
const areaCards = document.getElementById('cards');
const campoBusca = document.getElementById('busca');
const campoStatus = document.getElementById('status');
const mensagem = document.getElementById('mensagem');
const botaoAnterior = document.getElementById('anterior');
const botaoProxima = document.getElementById('proxima');
const textoPagina = document.getElementById('pagina-atual');


let paginaAtual = 1;
let totalPaginas = 1;
let temporizador; 


const traducaoStatus = {
  Alive: 'Vivo',
  Dead: 'Morto',
  unknown: 'Desconhecido'
};

// Busca os personagens na API usando fetch
function buscarPersonagens() {
  const nome = campoBusca.value.trim();
  const status = campoStatus.value;

  const url = `${URL_API}?page=${paginaAtual}&name=${encodeURIComponent(nome)}&status=${status}`;

  mensagem.textContent = 'Carregando personagens...';

  fetch(url)
    .then(function (resposta) {
      // nao esquecer do erro 400
      if (!resposta.ok) {
        throw new Error('Nenhum personagem encontrado');
      }
      return resposta.json();
    })
    .then(function (dados) {
      totalPaginas = dados.info.pages;
      mensagem.textContent = `${dados.info.count} personagens encontrados`;
      mostrarCards(dados.results);
      atualizarPaginacao();
    })
    .catch(function (erro) {
      console.error(erro);
      areaCards.innerHTML = '';
      totalPaginas = 1;
      mensagem.textContent = 'Nenhum personagem encontrado. Tente outra busca.';
      atualizarPaginacao();
    });
}

// Cria um card para cada personagem usando createElement e appendChild coloca o card dentro da section
function mostrarCards(personagens) {
  areaCards.innerHTML = ''; // limpa os cards antigos

  personagens.forEach(function (personagem) {
    const card = document.createElement('article');
    card.classList.add('card');

    const imagem = document.createElement('img');
    imagem.src = personagem.image;
    imagem.alt = `Foto de ${personagem.name}`;
    imagem.loading = 'lazy';

    const info = document.createElement('div');
    info.classList.add('card-info');

    const nome = document.createElement('h2');
    nome.textContent = personagem.name;

    // status com a bolinha colorida
    const status = document.createElement('div');
    status.classList.add('status');

    const bolinha = document.createElement('span');
    bolinha.classList.add('bolinha', personagem.status.toLowerCase());

    const textoStatus = document.createElement('span');
    textoStatus.textContent = traducaoStatus[personagem.status] || personagem.status;

    status.appendChild(bolinha);
    status.appendChild(textoStatus);

    const especie = document.createElement('p');
    especie.innerHTML = `Espécie: <span>${personagem.species}</span>`;

    const origem = document.createElement('p');
    origem.innerHTML = `Origem: <span>${personagem.origin.name}</span>`;

    info.appendChild(nome);
    info.appendChild(status);
    info.appendChild(especie);
    info.appendChild(origem);

    card.appendChild(imagem);
    card.appendChild(info);

    areaCards.appendChild(card);
  });
}


function atualizarPaginacao() {
  textoPagina.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
  botaoAnterior.disabled = paginaAtual <= 1;
  botaoProxima.disabled = paginaAtual >= totalPaginas;
}

// Eventos
botaoProxima.addEventListener('click', function () {
  paginaAtual++;
  buscarPersonagens();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

botaoAnterior.addEventListener('click', function () {
  paginaAtual--;
  buscarPersonagens();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

campoBusca.addEventListener('input', function () {
  clearTimeout(temporizador);
  temporizador = setTimeout(function () {
    paginaAtual = 1;
    buscarPersonagens();
  }, 400);
});

campoStatus.addEventListener('change', function () {
  paginaAtual = 1;
  buscarPersonagens();
});

// Carrega a primeira página quando o site abre
buscarPersonagens();
