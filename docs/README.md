### Objetivo
A Helpio é uma plataforma para ONGs no Brasil. Nesta etapa inicial, foi contruida a base em HTML5: estrutura semântica, acessibilidade (landmarks, skip link, labels), SEO básico e formulário com validação nativa.

### Estrutura de pastas
```
root/
├── index.html
├── projetos.html
├── cadastro.html
├── dist/               // arquivos prontos para produção: minificados e otimizados
├── css/
│  ├── tokens.css       // variáveis: cores, tipografia, spacing, breakpoints
│  ├── base.css         // reset leve, tipografia base, utilidades a11y
│  ├── layout.css       // grid 12 colunas, containers, seções e responsividade
│  ├── components.css   // navegação, botões, cards, formulários, alerts/modals, tags
│  └── utilities.css    // utilitários de espaçamento, display, bg, texto
├── img/  (imagens em jpg para otimização)
│  ├── projeto_alimentando_o_bem.jpg
│  ├── projeto_doação_solidária.jpg
│  └── projeto_plantando_o_futuro.jpg
├── js/
│  ├── main.js         // inicialização global (router, modais, máscaras, validação, painel)
│  ├── masks.js        // máscaras de CPF, CEP e telefone (BR)
│  ├── modal.js        // sistema de modais com overlay, ESC e focus-trap
│  ├── panel.js        // modal de cadastros: injeta HTML e atualiza lista do localStorage
│  ├── projects.js     // filtro de projetos por categoria/tag e estado aria-current
│  ├── router.js       // roteador simples e bootstrap da página
│  ├── storage.js      // helpers de localStorage (carregar/salvar com timestamp)
│  ├── theme.js        // alternância de tema (dark) e alto contraste + ARIA no menu
│  ├── toast.js        // notificações toast simples (auto-close e clique para fechar)
│  └── validation.js   // validação do cadastro, feedback inline, salva e reseta formulário
├── tools/
│  ├── minify.ps1      // ferramenta de build do projeto (minificação, otimização e alteração de referências)
└── docs/
   └── README.md
```

### Páginas
- index.html: missão, visão e valores; histórico;
- projetos.html: lista de projetos como `article` + `aside` de categorias.
- cadastro.html: formulário com `fieldset`/`legend` e inputs HTML5 (nome, e-mail, CPF, telefone, data de nascimento, endereço, CEP, cidade, estado). Só validação nativa (`required`, `type`, `pattern`, `title`). Sem máscaras nesta fase.

### JavaScript (SPA, Modais, Validação e Storage)
- Estrutura JS:
  - `js/main.js`: inicialização global.
  - `js/router.js`: SPA com troca do `<main>` via fetch e atualização de título/aria-current.
  - `js/modal.js`: modal com overlay, ESC e focus-trap.
  - `js/validation.js`: validação do cadastro, mensagens inline, modal de sucesso e gravação em localStorage.
  - `js/masks.js`: máscaras de CPF, CEP e Telefone (BR).
  - `js/storage.js`: helpers de localStorage.

### Acessibilidade + SEO
- Landmarks: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address`.
- Skip link ("Pular para conteúdo") e hierarquia de títulos consistente.
- Labels conectadas e dicas com `aria-describedby` quando útil.
- Metas: `charset`, `viewport`, `description`, `lang=pt-BR`, `theme-color`.

### Design System
- Foram adicionados novos estilos, melhorando a expericiência do usuário e a estética do site.

## Recursos de acessbilidade
- Estrutura semântica: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address`.
- Navegação por teclado: skip link visível ao foco; foco visível em links e botões (`:focus-visible`).
- Menu mobile acessível: hambúrguer com `aria-controls` e `aria-expanded` sincronizados via JS; overlay para fechar com clique fora; ordem de tabulação preservada.
- Leitores de tela: textos alternativos em imagens; `aria-label` em controles; modal com `role="dialog"` e `aria-modal="true"` + focus trap e `ESC` para fechar.
- Contraste: tokens garantem níveis elevados; modos Escuro e Alto Contraste via `data-theme="dark"` e `data-contrast="high"`.
- Formulários: `label` associado; mensagens de erro inline; estados válidos/inválidos com contraste adequado.

## Preferências de Aparência
- Modo escuro: botão "🌙" alterna `data-theme="dark"` (persistido em localStorage).
- Alto contraste: botão "⚑" alterna `data-contrast="high"` (persistido em localStorage).

## Build/Minificação (tools/minify.ps1)
- Local do script: `tools/minify.ps1`
- Saída: `dist/` (HTML/CSS/JS minificados + cópias de `img/` e `svg/`).

Como usar no Windows PowerShell (raiz do projeto):
```powershell
cd "C:\Projects\Projeto Helpio"
powershell -ExecutionPolicy Bypass -File .\tools\minify.ps1 -SourceDir . -OutDir .\dist
```

Ou a partir da pasta `tools/` (usa os padrões do script):
```powershell
cd "C:\Projects\Projeto Helpio\tools"
powershell -ExecutionPolicy Bypass -File .\minify.ps1
```
