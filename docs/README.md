### Objetivo
A Helpio é uma plataforma para ONGs no Brasil. Nesta etapa inicial, foi contruida a base em HTML5: estrutura semântica, acessibilidade (landmarks, skip link, labels), SEO básico e formulário com validação nativa.

### Estrutura de pastas
```
root/
├── index.html
├── projetos.html
├── cadastro.html
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
│  ├── toast.js        // notificações toast simples (auto-close e clique para fechar)
│  └── validation.js   // validação do cadastro, feedback inline, salva e reseta formulário
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

### Próximas implementações
- Otimizações de performance e acessibilidade nível AA completo.
