# iHeard — Blog de Análises Musicais

iHeard é um blog pessoal de resenhas de álbuns, desenvolvido como projeto acadêmico (A3 — Usabilidade). O site reúne análises de discos, curiosidades sobre artistas e uma página sobre a autora.

Acesse: [iHeard no GitHub Pages](https://sudoclark.github.io/ibmr-usabilidade-dev.web-mobile-jogos/index)

## Funcionalidades

- **Página inicial (Resenhas)**: lista de álbuns resenhados, com filtro por ano, ordenação (padrão, maior/menor nota, A-Z) e modal com a análise completa e faixas favoritas.
- **Página de Artistas**: carrossel com os artistas presentes no blog, exibindo curiosidades e álbuns famosos em um modal.
- **Página Sobre**: informações sobre a autora, artistas favoritos e recomendações de álbuns.
- **Tema claro/escuro** e **menu responsivo** para mobile.

## Tecnologias

- HTML5, CSS3 e JavaScript puro (sem frameworks)
- Dados das resenhas e artistas armazenados em JSON (`data.json` e `artists-data.json`), carregados via `fetch`

## Estrutura do projeto

```
.
├── index.html          # Página inicial (Resenhas)
├── script.js            # Lógica da página inicial
├── style.css             # Estilos da página inicial
├── data.json             # Dados das resenhas de álbuns
├── artists-data.json     # Dados dos artistas
├── images/                # Capas dos álbuns
└── pages/
    ├── about/             # Página "Sobre mim"
    │   ├── about.html
    │   ├── style.css
    │   ├── script.js
    │   └── images/
    └── artists/           # Página "Artistas"
        ├── artists.html
        ├── style-artists.css
        ├── script-artists.js
        └── images/
```

## Aviso

As capas, nomes e demais elementos dos álbuns/artistas apresentados pertencem aos seus respectivos artistas, gravadoras e detentores de direitos. O iHeard é um projeto acadêmico sem fins comerciais ou lucrativos, desenvolvido exclusivamente para fins de estudo. Nenhum conteúdo aqui publicado tem intenção de infringir direitos autorais.
