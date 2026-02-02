# 🏔️ Cairn Web Interactive Guide

> Uma experiência digital premium e imersiva para documentação do universo de Cairn, substituindo os antigos PDFs estáticos por uma Web App moderna, responsiva e temática.

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Status](https://img.shields.io/badge/Status-Active-brightgreen)

## ✨ Visão Geral

Este projeto reimagina a leitura de documentos de RPG/Lore. Ao invés de páginas estáticas, oferecemos interatividade real:

- **Tradução On-Demand:** Clique para traduzir trechos instantaneamente.
- **Lore Contextual:** Tooltips ricas com explicações do universo.
- **Design Adaptativo:** Funciona perfeitamente em Desktop e Mobile.
- **Sistema de Temas:** Alterne entre AMOLED Black, Pergaminho Clássico e Glacial White.

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** instalado (versão 16 ou superior).

### Passo a Passo

1. **Baixe/Acesse a pasta do projeto:**

   ```bash
   cd cairn-web
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

   *Isso baixará o React, Lucide Icons e Framer Motion.*

3. **Inicie o Servidor de Desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acesse no Navegador:**
   O terminal mostrará um link, geralmente:
   👉 `http://localhost:5173`

---

## 🎨 Sistema de Temas & UI

O projeto utiliza um sistema de variáveis CSS robusto para theming. O tema padrão é **AMOLED Black** para economia de energia e estética premium.

| Tema | ID | Descrição |
| :--- | :--- | :--- |
| 🌑 **Amoled** | `amoled` | Fundo `#000000`, Texto Branco. Alto contraste. |
| 📜 **Classic** | `classic` | Fundo Marrom, Papel Bege. Estilo RPG clássico. |
| ☀️ **Glacial** | `glacial` | Fundo Branco/Cinza, Acentos Azuis. Estilo Apple/Clean. |

### Como mudar o tema?

Use a **Dynamic Island** (barra de navegação inferior). Clique nos ícones redondos (Lua/Pergaminho/Sol) para alternar instantaneamente.

### Dynamic Island

Inspirada na UI do iPhone, a barra de navegação flutuante se adapta:

- **Desktop:** Mostra ícones e rótulos de texto.
- **Mobile:** Compacta-se, mostrando apenas ícones para economizar espaço.

---

## 📂 Estrutura do Projeto

```text
cairn-web/
├── public/              # Arquivos estáticos (imagens, favicon)
│   └── imagem-jogos.png # Arte utilizada no Logbook
├── src/
│   ├── components/      # Blocos de construção da UI
│   │   ├── DynamicIsland.jsx  # Navegação principal flutuante
│   │   ├── StoryBlock.jsx     # Bloco de texto interativo (En/Pt)
│   │   ├── ThemeSwitcher.jsx  # Botões de troca de tema
│   │   ├── HistoryTab.jsx     # Página de História (Conteúdo Lore)
│   │   └── LogbookTab.jsx     # Página de Logbook (Vocabulário)
│   ├── context/
│   │   └── ThemeContext.jsx   # Gerenciador global de temas
│   ├── styles/ (ou na raiz src)
│   │   ├── index.css          # Estilos Globais e Variáveis de Tema
│   │   ├── MacTheme.css       # Estilos dos componentes "Glass"
│   │   └── ...
│   ├── App.jsx          # Componente Raiz e Roteamento
│   └── main.jsx         # Ponto de entrada React
└── package.json         # Dependências e scripts
```

---

## 🛠️ Tecnologias Utilizadas

- **React:** Biblioteca core para construção da interface.
- **Vite:** Build tool ultra-rápida.
- **Framer Motion:** Responsável por todas as animações suaves (transições de página, troca de idioma, ilha dinâmica).
- **Lucide React:** Biblioteca de ícones vetoriais modernos e nítidos.
- **CSS3 Variables:** Para o sistema de temas dinâmico sem flash-of-unstyled-content.

---

## 📱 Mobile First

O projeto foi otimizado para celulares:

- **Touch Targets:** Botões com tamanho adequado para toque.
- **Grids Responsivos:** Tabelas de vocabulário viram listas verticais (cards) em telas pequenas.
- **Safe Areas:** A Dynamic Island respeita as margens para não sobrepor conteúdo.

---

*Criado com ❤️ por Antigravity AI & Israel.*
