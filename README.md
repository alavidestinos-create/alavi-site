# ALAVI Destinos & Experiências — Site institucional

Site público da agência de viagens ALAVI Destinos & Experiências. Projeto
**independente** do sistema interno/CRM da agência (ver `docs/INTEGRACAO-API.md`
para a proposta de integração futura).

## Tecnologias

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) para testes unitários
- Sem backend próprio: o formulário de orçamento usa um webhook configurável
  (ver seção "Formulário de orçamento" abaixo)

## Requisitos

- Node.js 20 LTS ou superior
- npm 10 ou superior

## Instalação

```bash
npm install
```

## Execução local

```bash
cp .env.example .env.local
# edite .env.local com os valores reais (WhatsApp, e-mail, Instagram etc.)
npm run dev
```

Acesse http://localhost:3000

## Scripts disponíveis

| Script            | Descrição                                  |
| ----------------- | ------------------------------------------- |
| `npm run dev`      | Ambiente de desenvolvimento                 |
| `npm run build`    | Build de produção                           |
| `npm run start`    | Sobe o build de produção                    |
| `npm run lint`     | ESLint (regras `next/core-web-vitals`)      |
| `npm run typecheck`| Verificação de tipos TypeScript (`tsc --noEmit`) |
| `npm test`         | Testes unitários (Vitest)                   |

### ⚠️ Verificação ainda pendente neste ambiente

Este projeto foi escrito integralmente neste ambiente, mas **`npm install`,
`npm run build`, `npm run lint`, `npm run typecheck` e `npm test` não puderam
ser executados aqui** porque o sandbox de desenvolvimento não tem acesso à
internet (registry do npm bloqueado). O código foi revisado manualmente
(balanceamento de chaves/parênteses, resolução de imports/exports em todos os
arquivos internos), mas **antes de publicar, rode os comandos acima
localmente** e corrija o que aparecer.

## Variáveis de ambiente

Ver `.env.example` para a lista completa e comentada. Resumo:

- `NEXT_PUBLIC_SITE_URL` — URL pública do site
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número de WhatsApp Business (E.164, só dígitos)
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_INSTAGRAM_HANDLE`
- `ORCAMENTO_WEBHOOK_URL` / `ORCAMENTO_WEBHOOK_TOKEN` — destino do formulário de orçamento
- `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID` — Analytics (opcionais)

Nenhum valor real foi inventado; placeholders começando com `PENDENTE_` marcam
o que precisa ser preenchido pela agência.

## Estrutura de pastas

```
src/
  app/            Páginas (App Router) e rota de API do formulário
  components/     Componentes reutilizáveis (layout, sections, ui, forms...)
  config/site.ts  Configuração central (marca, contato, WhatsApp, SEO, analytics)
  content/        Conteúdo estruturado (serviços, destinos, FAQ, depoimentos)
  lib/            Funções utilitárias (validação, WhatsApp, analytics)
  types/          Tipos TypeScript compartilhados
docs/             Documentação adicional (integração futura com o CRM)
public/           Arquivos estáticos (manifest, imagens — pendente logo oficial)
```

## Identidade visual

O logotipo oficial da ALAVI ainda não foi incorporado como arquivo de imagem
(apenas visualizado durante o desenvolvimento). A paleta de cores em
`tailwind.config.ts` (tons `navy` e `teal`) foi extraída visualmente do logo
como aproximação provisória. Assim que os arquivos originais (PNG/SVG com
fundo transparente, versões para fundo claro/escuro, favicon) forem
fornecidos, substitua-os em `public/` e ajuste a paleta se necessário.

## Formulário de orçamento

O formulário (`/orcamento` e seção de contato) valida os dados no cliente e
no servidor (`src/lib/validation.ts`, `src/app/api/orcamento/route.ts`) e
envia para `ORCAMENTO_WEBHOOK_URL`, se configurada (pode ser um webhook do
Make/Zapier, um serviço de formulário, ou futuramente o CRM interno). Se essa
variável não estiver definida, o formulário direciona o cliente para
continuar via WhatsApp com uma mensagem pré-preenchida — nenhum pedido se
perde mesmo sem backend definitivo configurado.

## WhatsApp

O número é configurado em um único lugar: `NEXT_PUBLIC_WHATSAPP_NUMBER` (lido
por `src/config/site.ts`). Botões de WhatsApp estão no cabeçalho, hero,
serviços, destinos, formulário, rodapé e em um botão flutuante.

## Analytics

Google Analytics e Google Tag Manager só carregam se `NEXT_PUBLIC_GA_ID` /
`NEXT_PUBLIC_GTM_ID` estiverem definidos **e** o visitante tiver aceitado
cookies não essenciais no aviso de cookies (`CookieConsent`). Meta Pixel está
preparado via `NEXT_PUBLIC_META_PIXEL_ID`, mas ainda não implementado no
carregamento (adicionar quando o ID for fornecido).

## Publicação — GitHub → Vercel (recomendado)

1. Crie um repositório novo no GitHub (sugestão: `alavi-site`, separado do
   repositório do sistema interno).
2. `git push` o conteúdo deste projeto para esse repositório.
3. Na [Vercel](https://vercel.com/), importe o repositório.
4. Configure as variáveis de ambiente do `.env.example` no painel da Vercel
   (Settings → Environment Variables).
5. Build command: `npm run build` — Output: gerenciado automaticamente pelo
   adaptador Next.js da Vercel (não é necessário configurar diretório de saída).
6. Configure o domínio `alavidestinos.com.br` em Settings → Domains e siga as
   instruções de DNS exibidas pela própria Vercel (não altere DNS sem
   conferir os registros exatos exibidos no painel).

## Publicação alternativa — GitHub → Netlify

O projeto já inclui `netlify.toml` com o plugin oficial
`@netlify/plugin-nextjs` configurado (necessário para suporte completo ao App
Router, Server Components e otimização de imagens do Next.js na Netlify).

1. Importe o repositório na Netlify (Add new site → Import an existing project).
2. A Netlify deve detectar automaticamente as configurações de
   `netlify.toml` (build command `npm run build`, publish `.next`, plugin
   `@netlify/plugin-nextjs`, Node 20).
3. Configure as variáveis de ambiente do `.env.example` em Site settings →
   Environment variables.
4. Confirme o domínio em Domain settings.

## Domínio

Domínio principal previsto: `alavidestinos.com.br`. Outros domínios
adquiridos futuramente devem ser configurados como redirecionamento (301)
para o domínio principal — configuração feita no painel da Vercel/Netlify ou
no provedor de DNS, apresentando previamente os registros exatos necessários.

## Integração futura com o sistema interno (CRM)

Ver `docs/INTEGRACAO-API.md`. Este site não se conecta diretamente ao banco
de dados do sistema interno; qualquer integração futura deve ocorrer por API
HTTP autenticada.

## Documentos relacionados

- `docs/INTEGRACAO-API.md` — formato de dados sugerido para integração futura
- `PENDENCIAS.md` — lista de informações comerciais/jurídicas pendentes
- `DECISOES-TECNICAS.md` — decisões técnicas tomadas e por quê
- `CHECKLIST-PUBLICACAO.md` — checklist antes de publicar
