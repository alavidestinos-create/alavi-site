# Checklist de publicação

## Antes de tudo (local, com internet)

- [ ] `npm install`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `npm run start` e navegar manualmente por todas as páginas
- [ ] Verificar console do navegador (sem erros/warnings inesperados)
- [ ] Testar o formulário de orçamento (envio, validação, mensagens de erro)
- [ ] Testar todos os botões de WhatsApp (mobile e desktop)
- [ ] Testar responsividade (mobile, tablet, desktop — especialmente iPhone)
- [ ] Testar navegação por teclado (foco visível, tab order)
- [ ] Conferir todas as páginas legais (Privacidade, Termos, Cookies)
- [ ] Conferir página 404

## Conteúdo e identidade

- [ ] Preencher todos os itens de `PENDENCIAS.md`
- [ ] Substituir depoimentos placeholder por depoimentos reais autorizados
- [ ] Incorporar logotipo oficial e imagens de destinos/experiências
- [ ] Gerar favicon e ícones a partir do logo oficial

## Variáveis de ambiente (produção)

- [ ] `NEXT_PUBLIC_SITE_URL=https://alavidestinos.com.br`
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL`
- [ ] `NEXT_PUBLIC_INSTAGRAM_HANDLE`
- [ ] `ORCAMENTO_WEBHOOK_URL` (e `ORCAMENTO_WEBHOOK_TOKEN`, se aplicável)
- [ ] IDs de Analytics, se decididos

## Limpeza antes de publicar

- [ ] **Apague a pasta `public/brand-source/`** (dentro de `alavi-site/public/`).
      Ela guardava os arquivos originais e pesados do logo (1-1,5 MB cada)
      usados só como referência durante o desenvolvimento; os arquivos que o
      site realmente usa já foram movidos para a pasta `brand-source/` na
      raiz do projeto (fora de `public/`, não fica acessível publicamente).
      Não consegui apagar `public/brand-source/` automaticamente neste
      ambiente — é só excluir a pasta pelo Explorador de Arquivos.
- [ ] Apague também os arquivos de teste avulsos, se ainda existirem:
      `header-preview.png`, `logo-icon-alpha-test.png`,
      `logo-icon-alpha-test-on-red.png`, `logo-icon-cropped.png` (na raiz de
      `SITE`, fora de `alavi-site`) e o arquivo oculto `.write-test`.

## Git / GitHub

- [ ] **Antes de tudo**: apague manualmente a pasta `.git` dentro de
      `alavi-site` (Explorador de Arquivos → mostrar itens ocultos → excluir
      `.git`). Ela contém um repositório incompleto/travado, criado no
      ambiente de desenvolvimento, que não pôde ser limpo automaticamente.
      Depois de apagar, rode `git init` normalmente.
- [ ] Confirmar que `.env` / `.env.local` NÃO estão no repositório
- [ ] Repositório separado do sistema interno (sugestão: `alavi-site`)
- [ ] Commits pequenos e claros
- [ ] Nenhuma credencial no histórico do Git

## Vercel / Netlify

- [ ] Build command: `npm run build`
- [ ] Variáveis de ambiente configuradas no painel
- [ ] Domínio `alavidestinos.com.br` configurado e HTTPS ativo
- [ ] Verificar página 404 em produção
- [ ] Verificar `sitemap.xml` e `robots.txt` gerados (`/sitemap.xml`, `/robots.txt`)
- [ ] Verificar Analytics em produção (se configurado)
- [ ] Verificar envio do formulário em produção (ponta a ponta)
- [ ] Configurar redirecionamento de outros domínios adquiridos para o
      domínio principal (apenas após apresentar os registros de DNS exatos)
