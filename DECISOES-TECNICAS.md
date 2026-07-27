# Decisões técnicas

## Stack

- **Next.js 14 (App Router) + TypeScript + Tailwind CSS**: conforme
  preferência indicada no briefing. Como não havia projeto anterior na pasta
  (auditoria inicial confirmou pasta vazia), a stack foi criada do zero sem
  necessidade de migração.
- **Sem UI kit externo** (ex.: shadcn/ui, MUI): os componentes foram
  construídos diretamente com Tailwind para manter o número de dependências
  baixo, conforme pedido ("não instalar bibliotecas desnecessárias").
- **Sem Zod/React Hook Form**: validação implementada manualmente em
  `src/lib/validation.ts` para evitar dependências adicionais em um
  formulário que, embora extenso, tem regras relativamente simples.
- **Vitest** em vez de Jest: mais leve para configurar em projeto Next.js
  moderno e com boa compatibilidade com TypeScript/ESM.

## Formulário de orçamento sem backend definitivo

Optou-se por uma API route interna (`/api/orcamento`) que:

1. Valida os dados no servidor (nunca confia apenas no cliente).
2. Encaminha para `ORCAMENTO_WEBHOOK_URL`, se configurada.
3. Retorna 501 se nenhum destino estiver configurado — o frontend então
   oferece o fallback de continuar via WhatsApp com os dados já preenchidos.

Essa abordagem evita perder pedidos mesmo antes de existir uma integração
definitiva (webhook, serviço de formulário ou API do CRM).

## Consentimento de cookies e Analytics

Scripts do Google Analytics/GTM só são injetados se o respectivo ID estiver
definido **e** o visitante tiver aceitado cookies não essenciais
(`localStorage`). Isso evita carregar rastreamento antes do consentimento,
alinhado à LGPD.

## Ambiente de desenvolvimento sem acesso à internet

O ambiente usado para escrever este projeto não tinha acesso à internet
(registry do npm bloqueado por allowlist). Por isso, não foi possível rodar
`npm install`, `npm run build`, `npm run lint`, `npm run typecheck` nem
`npm test` durante o desenvolvimento. O código foi revisado manualmente
(balanceamento de sintaxe, resolução de imports/exports), mas a verificação
completa (FASE 7 do briefing original) precisa ser rodada localmente antes da
publicação — ver `CHECKLIST-PUBLICACAO.md`.

## Identidade visual

Dois arquivos de logo foram localizados na pasta do projeto (renders sem
fundo transparente): um ícone isolado (fundo cinza) e um selo circular com o
lockup completo "ALAVI Destinos & Experiências" (fundo preto/azul com glow).
A paleta em `tailwind.config.ts` foi gerada por amostragem de cor real
(Pillow) e cruzada entre os dois arquivos, confirmando consistência.

Tratamento aplicado a cada arquivo:

- **Ícone** (`brand-source/logo-icon-source.png`): recortado
  (`logo-icon-cropped.png`, bounding box calculado por saturação/luminância)
  e usado no Header (40px) e Footer (56px) dentro de um chip arredondado
  (`bg-navy-50`) que disfarça o halo cinza de fundo. Também é a fonte do
  favicon, `apple-touch-icon.png`, `icon-192/512.png` e da imagem Open Graph.
- **Selo circular** (`brand-source/logo-badge-source.png`): usado
  como está (sem recorte) na página Sobre, pois seu próprio fundo
  escuro/glow já funciona como composição em uma seção de cor sólida.

Tentei extrair um alpha channel (remoção de fundo) por segmentação de
saturação/luminância via Pillow/NumPy, mas o resultado deixa um halo
residual visível de perto (o glow do render tem cor, não é um fundo sólido
"chapado" que dê para recortar com limpeza sem uma ferramenta de matting
melhor). Por isso optei por **disfarçar o halo** (chip/composição) em vez de
tentar uma remoção de fundo malfeita. Ver `PENDENCIAS.md` para o pedido do
arquivo oficial com transparência real.

## Vulnerabilidades do `npm audit` (Next.js 14.2.35)

Em 24/07/2026, ao rodar `npm audit` antes da publicação, apareceram 9
vulnerabilidades associadas ao Next.js 14.2.35 (a versão já corrigida para o
problema de dezembro/2025). A maioria delas é específica de "Server Actions"
e de `rewrites()` — este projeto não usa nenhum dos dois (o formulário usa
uma API route comum em `src/app/api/orcamento/route.ts`, e `next.config.mjs`
não define `rewrites()`), então não se aplicam na prática. As de `postcss`
são de build (não processam entrada de visitantes em produção).

Resta uma vulnerabilidade mais genérica (confusão de cache no corpo de
respostas) que, em teoria, poderia afetar qualquer app Next.js. Corrigi-la
por completo exigiria subir para Next.js 15 (que exige também subir para
React 19) — uma mudança maior. Decisão tomada em conjunto com o cliente:
manter Next.js 14.2.35 por enquanto (risco residual baixo dado que os
vetores principais não se aplicam a este projeto) e publicar. Revisar essa
decisão periodicamente e considerar a atualização para Next.js 15/16 numa
janela de manutenção futura, com testes completos.

## Explore Destinos + Guia do Viajante (27/07/2026)

Reconstrução da seção de Destinos e substituição do Blog pelo Guia do
Viajante, com arquitetura orientada a dados:

- **Dados em JSON** (`src/data/destinations.json`, `articles.json`,
  `faq.json`, `parks.json`), carregados por wrappers TypeScript em
  `src/content/` que resolvem `imageKey` para a URL real da imagem
  (`src/content/images.ts`). Adicionar um novo destino exige apenas uma
  imagem verificada + um objeto no JSON — nenhum componente precisa mudar.
- **Sem preços, hotéis, passagens ou pacotes** em nenhum campo de destino
  (regra explícita do briefing — a ALAVI vende consultoria personalizada).
  "Onde se hospedar"/"Onde fazer compras"/"Restaurantes" descrevem áreas e
  estilos, nunca estabelecimentos específicos com valor.
- **Sem Framer Motion**: o briefing pediu "animações leves", mas o projeto
  já tinha `Reveal.tsx` (fade/translate via IntersectionObserver, sem
  dependência, respeita `prefers-reduced-motion`) cobrindo exatamente esse
  papel. Como o ambiente de build não tinha acesso ao registry do npm para
  validar a instalação, e um dos limites explícitos do projeto é não
  introduzir dependências desnecessárias, optei por reutilizar o `Reveal`
  existente em todos os novos componentes em vez de adicionar uma
  biblioteca nova.
- **Mapa por iframe público do Google Maps** (`?output=embed`, sem chave de
  API) em vez de uma lib de mapas — leve e sem custo/dependência.
- **Rota do Blog renomeada para `/guia-do-viajante`**, com redirects 301
  (`/blog` → `/guia-do-viajante`, `/blog/:slug` → `/guia-do-viajante/:slug`)
  configurados em `next.config.mjs` para não quebrar links já indexados. Os
  arquivos antigos em `src/app/blog/` não puderam ser apagados pelo
  ambiente (permissão negada pelo sync do OneDrive) — ficaram no repositório
  como código morto, inofensivo, pois o redirect intercepta a rota antes de
  renderizar a página antiga. Podem ser removidos manualmente mais tarde.
