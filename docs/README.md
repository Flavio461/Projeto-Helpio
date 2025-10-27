### Objetivo
A Helpio é uma plataforma para ONGs no Brasil. Nesta etapa inicial, foi contruida a base em HTML5: estrutura semântica, acessibilidade (landmarks, skip link, labels), SEO básico e formulário com validação nativa.

### Estrutura de pastas
```
root/
├── index.html
├── projetos.html
├── cadastro.html
├── css/  (pronto para implementação na próxima etapa)
├── js/   (pronto para implementação na próxima etapa)
├── img/
│  ├── projeto_alimentando_o_bem.jpg
│  ├── projeto_doação_solidária.jpg
│  └── projeto_plantando_o_futuro.jpg
└── docs/
   └── README.md
```

### Páginas
- index.html: missão, visão e valores; histórico;
- projetos.html: lista de projetos como `article` + `aside` de categorias.
- cadastro.html: formulário com `fieldset`/`legend` e inputs HTML5 (nome, e-mail, CPF, telefone, data de nascimento, endereço, CEP, cidade, estado). Só validação nativa (`required`, `type`, `pattern`, `title`). Sem máscaras nesta fase.

### Acessibilidade + SEO
- Landmarks: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address`.
- Skip link ("Pular para conteúdo") e hierarquia de títulos consistente.
- Labels conectadas e dicas com `aria-describedby` quando útil.
- Metas: `charset`, `viewport`, `description`, `lang=pt-BR`, `theme-color`.

### Próximas implementações
- Estilização responsiva avançada e componentes.
- Máscaras (CPF/telefone/CEP) e interações com JS.
- Otimizações de performance e acessibilidade nível AA completo.