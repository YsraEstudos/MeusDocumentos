# Guia de Criação de PDFs com LaTeX

Este repositório contém o código fonte LaTeX para a geração do seu **Logbook de Inglês**. Abaixo você encontra instruções de como compilar, estruturar arquivos e uma análise das melhorias realizadas no código.

## 🚀 Como Compilar o PDF

Para gerar o arquivo PDF a partir do código LaTeX, você precisa ter uma distribuição TeX instalada (como MiKTeX ou TeX Live).

### Via Linha de Comando (Terminal)

Navegue até a pasta onde está o arquivo `.tex` (ex: `ingles`) e execute:

```bash
pdflatex -interaction=nonstopmode teste.tex
```

Isso gerará o arquivo `teste.pdf`. Recomenda-se rodar o comando duas vezes para garantir que o sumário e os links sejam gerados corretamente.

## 📂 Estrutura de Arquivos

Para garantir que o código funcione em qualquer computador, mantenha a seguinte estrutura relativa:

```text
/pdfs
  ├── /Imagens
  │     └── imagem jogos.png
  ├── /ingles
  │     ├── teste.tex
  │     └── teste.pdf
  └── README.md
```

No código LaTeX, utilizamos caminhos relativos para as imagens:

```latex
\includegraphics[width=\linewidth]{../Imagens/imagem jogos.png}
```

---

## 🔍 Análise do Código LaTeX e Correções

Abaixo listamos os problemas identificados na versão anterior do código e as soluções aplicadas para garantir qualidade, portabilidade e ausência de erros.

### 🔴 Erros Críticos Resolvidos

1. **Cor usada antes da definição (`hypersetup`)**
    * *Problema:* O pacote `hyperref` tentava usar `AccentColor` antes do comando `\definecolor` ser executado.
    * *Solução:* Movemos o bloco de definições de cores para **antes** do carregamento do `hyperref` no preâmbulo.

2. **Pacote `xcolor` carregado em duplicidade**
    * *Problema:* Ocorria conflito de opções (`clash`) por carregar `\usepackage{xcolor}` e depois `\usepackage[table]{xcolor}`.
    * *Solução:* Unificamos o carregamento em uma única linha: `\usepackage[table]{xcolor}`.

### 🟠 Melhorias de Qualidade e Portabilidade

1. **Caminho Absoluto de Imagem**
    * *Problema:* O caminho `"C:/Users/israe/Downloads/pdfs/Imagens/..."` impedia que o projeto funcionasse em outros computadores.
    * *Solução:* Alterado para caminho relativo: `../Imagens/imagem jogos.png`.

2. **Largura da Imagem (Overflow)**
    * *Problema:* `width=1.2\textwidth` fazia a imagem estourar a margem da página, possivelmente cortando conteúdo ou gerando avisos de "Overfull \hbox".
    * *Solução:* Ajustado para `width=\linewidth`, garantindo que a imagem ocupe exatamente a largura do texto disponível.

3. **Ícones e Espaçamento**
    * *Problema:* O comando `\faCalendar*` e espaçamentos manuais frágeis.
    * *Solução:* Substituído por ícones padrão (`\faCalendar`) e uso de `\quad` para espaçamentos consistentes após ícones nos títulos.

### 📋 Resumo das Boas Práticas Adotadas

| Tipo | Problema Original | Solução Adotada |
| :--- | :--- | :--- |
| 🔴 **Crítico** | Definição de Cores Tardia | Cores definidas no início do preâmbulo |
| 🔴 **Crítico** | Conflito de Pacotes (xcolor) | Carregamento único com opções corretas |
| 🟠 **Médio** | Caminho Absoluto | Uso de caminhos relativos (`../`) |
| 🟠 **Médio** | Imagem Estourada | Largura ajustada para `\linewidth` |
| 🟡 **Baixo** | Espaçamento Manual | Uso de comandos LaTeX padrão (`\quad`) |
