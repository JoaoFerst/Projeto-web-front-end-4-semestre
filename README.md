# Portal de Personagens | Rick and Morty

Site estático que consome a API pública do Rick and Morty e exibe os personagens em cards criados dinamicamente com JavaScript. Projeto da disciplina de Web Development Front-End.


## Sobre o projeto

O objetivo foi desenvolver uma página interativa que mostra dados reais, vindos de uma API, usando apenas **HTML, CSS e JavaScript puros** (sem frameworks). O HTML tem só uma área vazia, e todos os cards são montados pelo JavaScript a partir da resposta da API.

## Funcionalidades

- Cards gerados automaticamente com `fetch`, `createElement` e `appendChild`
- Cada card mostra **nome**, **imagem**, **status** (Vivo, Morto ou Desconhecido, com bolinha colorida), **espécie** e **origem**
- **Busca por nome**, com um pequeno atraso para não fazer uma requisição a cada letra digitada
- **Filtro por status**
- **Paginação** com botões Anterior e Próxima (a API devolve 20 personagens por página)
- Mensagens de carregamento e de erro (por exemplo, quando a busca não encontra ninguém)
- **Layout responsivo**, com versão para celular
- Tema escuro com cores inspiradas na série

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura da página |
| CSS3 | Estilo, grid, responsividade e animações de hover |
| JavaScript (ES6) | Consumo da API e criação dos cards |
| Google Fonts | Fontes Bangers e Poppins |

## Estrutura de arquivos

```
projeto-rick-morty/
├── index.html   # estrutura da página
├── style.css    # estilos
├── script.js    # consumo da API e criação dos cards
└── README.md    # este arquivo
```

## Como executar

Não precisa instalar nada.

1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/JoaoFerst/Projeto-web-front-end-4-semestre.git
   ```
2. Abra a pasta do projeto.
3. Dê dois cliques no `index.html` para abrir no navegador (é necessário internet, porque os dados vêm da API).

## API utilizada

**Rick and Morty API** · https://rickandmortyapi.com/

- Gratuita e **sem token** ou cadastro
- Endpoint usado: `https://rickandmortyapi.com/api/character`
- Método: `GET`
- Limite informado na documentação: 10.000 requisições por dia por IP
- Documentação: https://rickandmortyapi.com/documentation

Parâmetros que utilizei:

| Parâmetro | Função | Exemplo |
|---|---|---|
| `page` | Escolhe a página de resultados | `?page=2` |
| `name` | Filtra pelo nome | `?name=rick` |
| `status` | Filtra por `alive`, `dead` ou `unknown` | `?status=alive` |

Exemplo de URL completa: `https://rickandmortyapi.com/api/character?page=1&name=rick&status=alive`

Formato resumido da resposta (JSON):

```json
{
  "info": { "count": 826, "pages": 42, "next": "...", "prev": null },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "origin": { "name": "Earth (C-137)" },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    }
  ]
}
```

## Como o código funciona

1. **`buscarPersonagens()`** monta a URL com a página, o nome e o status escolhidos e faz o `fetch`.
2. O primeiro `.then()` verifica se a resposta deu certo (`resposta.ok`) e converte o corpo para JSON.
3. O segundo `.then()` guarda o total de páginas e chama **`mostrarCards()`**.
4. **`mostrarCards()`** limpa a área e, com `forEach`, cria para cada personagem os elementos (`article`, `img`, `h2`, `p`), preenche com os dados e usa `appendChild` para colocá-los na página.
5. O `.catch()` trata erros, como o 404 que a API devolve quando nenhum personagem é encontrado.
6. **`atualizarPaginacao()`** atualiza o texto "Página X de Y" e desativa os botões quando não há página anterior ou próxima.

Trecho principal:

```js
fetch(url)
  .then(resposta => resposta.json())
  .then(dados => {
    dados.results.forEach(personagem => {
      const card = document.createElement('article');
      // ... cria imagem, nome, status, espécie e origem
      areaCards.appendChild(card);
    });
  });
```

## Publicando no GitHub Pages

1. Crie um repositório no GitHub e envie os arquivos.
2. Vá em **Settings → Pages**.
3. Em **Branch**, escolha `main` e a pasta `/ (root)`, e salve.
4. Depois de alguns minutos, o link do site aparece na mesma tela.

## Possíveis melhorias

- Filtro por espécie e por gênero
- Página de detalhes com os episódios de cada personagem
- Modo claro e escuro com botão de troca

## Autor

**SEU NOME** · Curso de [SEU CURSO] · [SUA INSTITUIÇÃO]

## Créditos

Dados e imagens fornecidos pela [Rick and Morty API](https://rickandmortyapi.com/). Rick and Morty é uma série criada por Justin Roiland e Dan Harmon; este projeto tem fins exclusivamente educacionais.
