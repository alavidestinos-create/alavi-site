# Estado da medição e marketing — ALAVI (31/10/2026)

IDs abaixo são públicos (aparecem no navegador). Nenhum segredo está neste arquivo. Tokens ficam só em variáveis de servidor do Netlify.

## Ativos e IDs

| Ativo | Identificação |
|---|---|
| GTM | `GTM-NP7WZPTM` (conta 6401473835, contêiner 284539052). Versão 2 publicada (31/10/2026); versão 1 = contêiner vazio (alvo de reversão). |
| GA4 | Propriedade 561731852 "ALAVI - site", fluxo 16242443340, ID de medição `G-9B8BHTL48C`, fuso São Paulo, moeda BRL |
| Meta | Portfólio 1132880059919592, conta de anúncios 1714446789808549, Pixel/dataset "ALAVI - site" `1111983571550069`. Domínio alavidestinos.com.br verificado (ID 1172014998842216) |
| Clarity | Projeto "alavi", ID `z6aru9zs94` |
| Netlify | Projeto `alavi-site`, deploy de `main`. `NEXT_PUBLIC_GTM_ID=GTM-NP7WZPTM` em Produção, Deploy Previews e Branch deploys |
| Search Console | Propriedade https://alavidestinos.com.br/ verificada por arquivo HTML (`public/googleef59b9203ea8d674.html`). Sitemap enviado e processado (92 páginas) |
| Google Ads | Conta "ALAVI DESTINOS" (ocid 8639601301), vinculada ao GA4 561731852. Sem tag Google instalada, sem campanhas, sem gasto |
| GitHub | PR #1 (consentimento, GTM, eventos) e PR #2 (domínio Meta + API de Conversões desligada) mesclados em `main` |

Conta Google de referência: alavidestinos@gmail.com (dona do GTM, GA4, Ads e Search Console).

## Concluído e validado

- Looker Studio: relatório "ALAVI - Painel de medição" (conta alavidestinos@gmail.com, fonte GA4 "ALAVI - site"), com cartões de Visualizações, Sessões, Usuários ativos e Eventos principais, tabela de eventos (page_view, whatsapp_click, quote_form_*, generate_lead) e tabela de origem/mídia por sessões. Link: https://datastudio.google.com/reporting/ce8cd6b4-b5a9-4750-b750-74eee030b901 . Está privado (não compartilhado); compartilhe só com quem precisar. Eventos principais aparece 0 até o GA4 contar `generate_lead` depois de marcado como evento-chave.
- GTM como único ponto de carga; GA4, Meta e Clarity só dentro do contêiner (sem duplicidade). 12 tags ativas, todas com consentimento por categoria e bloqueio de /admin, /painel, /crm, /api. `docs/gtm/alavi-gtm-container.json` espelha a versão 2 publicada (IDs reais, sem segredos; arquivo de importação, não export da interface).
- Banner e cookies (produção, visitante novo): antes da escolha, nenhuma requisição de terceiros e nenhum cookie. Aceitar todos: `_ga`, `_ga_9B8BHTL48C`, `_clck`, `_clsk`, `_fbp`. Retirar só Publicidade: `_fbp` apagado, sem requisições ao Meta, Análise mantida. Recusar tudo: cookies apagados.
- GA4: eventos chegam no Tempo real; `generate_lead` marcado como evento-chave.
- Meta: `PageView`, `Contact` e `Lead` recebidos no Gerenciador de Eventos. `Lead` só dispara no `generate_lead` confirmado (200 do servidor + SMTP com destinatário aceito). `Contact` é só o clique de contato (intenção), não conversa nem venda.
- Formulário em produção: envio de teste identificado, API 200, `generate_lead` com `event_id`, e-mail chegou no Gmail. Sem consentimento, não há eventos.
- Meta, verificação de domínio: meta-tag `facebook-domain-verification` no `<head>` (`src/app/layout.tsx`); domínio alavidestinos.com.br com status Verificado. Manter a tag.
- Search Console: verificado por arquivo; sitemap processado. Manter `public/googleef59b9203ea8d674.html`.
- Google Ads: conferido em Todas as conversões. Há uma única conversão de formulário, "ALAVI - site (web) generate_lead", origem Google Analytics (GA4), objetivo "Enviar formulários de lead", Principal, contagem "Uma", janela de clique 90 dias, incluída nas metas da conta. Não há tag nativa do Google para o mesmo evento (sem duplicação). A conversão "AI-qualified call leads" (chamadas a partir de anúncios) é outra, preexistente e intocada.
- API de Conversões da Meta: código pronto e testado, mesclado e DESLIGADO (ver seção própria). Validado no Deploy Preview #2 que, com ela desligada, o formulário segue respondendo 200 e a meta-tag está presente.

## API de Conversões da Meta (pronta, desligada)

Código: `src/lib/meta-capi.ts`, chamada em `src/app/api/orcamento/route.ts` e `src/components/forms/QuoteForm.tsx`; testes em `src/lib/__tests__/meta-capi.test.ts`.

- Envia `Lead` ao servidor da Meta somente depois da entrega confirmada do lead, somente se o visitante deu consentimento de Publicidade (informado pelo navegador no envio) e somente se a API estiver ligada.
- Deduplicação: o mesmo `event_id` vai no Pixel (`generate_lead` → `eventID`) e no servidor.
- E-mail e telefone saem só com hash SHA-256 normalizado; `_fbp`/`_fbc` só com consentimento. Falha da Meta nunca derruba o formulário.
- O token nunca está no repositório nem no navegador.

Para ligar (ação sua, direto no Netlify, sem passar o token em conversa):

1. Meta: Gerenciador de Eventos → dataset "ALAVI - site" → Configurações → API de Conversões → Gerar token de acesso. Copie e cole o token apenas no passo 2. Em "Eventos de teste" copie o código de teste (TEST...).
2. Netlify: projeto `alavi-site` → Project configuration → Environment variables → Add variable. Crie `META_CAPI_ACCESS_TOKEN` (marque "Contains secret values"; escopos Functions e Runtime), `META_PIXEL_ID` = `1111983571550069` e, para o teste, `META_CAPI_TEST_EVENT_CODE` = código TEST. Deixe `META_CAPI_ENABLED` = `true` por último. Nenhuma delas pode começar com `NEXT_PUBLIC_`.
3. Refaça o deploy (Deploys → Trigger deploy). Envie um formulário de teste aceitando todos os cookies e confira em Eventos de teste que o `Lead` aparece como Navegador e Servidor, deduplicado (mesmo ID).
4. Remova `META_CAPI_TEST_EVENT_CODE` e refaça o deploy. Reversão: apague `META_CAPI_ENABLED` (ou ponha `false`) e refaça o deploy.

## Reversão (restaura o comportamento anterior sem apagar as demais alterações)

1. Parar todas as tags imediatamente: GTM → Versões → versão 1 "Empty Container" → Publicar. O código do site continua igual; o GTM carrega vazio.
2. Site, opção A: Netlify → Deploys → `main@dcc7d02` → "Publish deploy". Restaura o site anterior, mas também remove tudo o que entrou depois (arquivo de verificação do Search Console, meta-tag da Meta, API de Conversões). Reponha `public/googleef59b9203ea8d674.html` e a meta-tag se fizer isso.
3. Site, opção B (preferível, mantém o resto): esvaziar/remover `NEXT_PUBLIC_GTM_ID` em Produção e disparar um NOVO build/deploy. A variável é incorporada no build, então removê-la sem refazer o deploy não tem efeito.
4. Não remover `public/googleef59b9203ea8d674.html` nem a meta-tag `facebook-domain-verification`: perderiam a verificação do Search Console e da Meta.

## Bloqueado (exige ação sua)

1. API de Conversões: depende de gerar o token de acesso no Meta e colá-lo no Netlify (seção acima). Sem isso permanece desligada.
2. Clarity: confirmar com uma sessão humana (a automação é classificada como bot e não gera gravação) que a gravação aparece e que os campos de formulário estão mascarados.

## Opcional

- Vincular Search Console ↔ GA4 e Clarity ↔ GA4.
- Criar campanhas no Google Ads e Meta somente quando você decidir (nada foi ativado; sem gasto, sem pagamento cadastrado).

## Fora do escopo, intocado

Bio, link e qualquer dado do Instagram.

---

## Atualização — SEO local, domínios duplicados e proteção contra bots

### Concluído
- **Domínio canônico único (301):** `alavi-site.netlify.app`, `alavidestinos.com` e `www.alavidestinos.com` (http e https) redirecionam 301 para `https://alavidestinos.com.br` (bloco no fim do `netlify.toml`, `force = true`). Verificado em produção. **Desfazer:** remover o bloco e fazer novo deploy. O Google ainda pode mostrar URLs antigas do netlify.app por alguns dias/semanas até reindexar.
- **Perfil da Empresa no Google (perfil verificado, loja 03503273126397264600):** categoria principal alterada de "Agência de turismo" para **"Agência de viagens"**, com "Agência de turismo" como adicional; **Instagram** adicionado em perfis de redes sociais (somente o link público no Google; nada foi alterado no Instagram); **área de cobertura** = Passo Fundo (RS) e Rio Grande do Sul. As três edições ficam "pendentes" até o Google revisar (normalmente ~10 min). Site do perfil já era `https://alavidestinos.com.br/`; horários e WhatsApp já corretos.
- **Dados estruturados (JSON-LD TravelAgency):** CEP 99025-002, `areaServed` e `knowsAbout` (consistência NAP com o Perfil). Título/descrição já usam "Agência de Viagens em Passo Fundo".
- **Proteção contra bots (antes de anúncios):** `src/lib/bot-detection.ts`. Bots/automação (UA de bot/headless ou `navigator.webdriver`) **não carregam GTM/GA4/Meta/Clarity** (não entram em métricas, públicos nem remarketing); a API `/api/orcamento` responde 403 a clientes sem UA de navegador ou com UA de script/bot; `robots.txt` bloqueia `/api/` e rastreadores AhrefsBot, SemrushBot, MJ12bot, DotBot e Bytespider. **Desfazer:** reverter o PR #3.

### Bloqueado / ação humana
- **Perfil duplicado não verificado** (loja 04789423906161103247, "Verificação obrigatória", mesmo endereço sem a sala): duplicidade pode prejudicar o ranking. Opções: concluir a verificação (vídeo/código, só o dono pode) e depois **mesclar/remover**; ou solicitar a remoção do duplicado. Não foi apagado nada.
- **Cliques inválidos em anúncios (quando houver campanha):** o site só filtra bots de forma simples; a proteção principal é do Google Ads (filtro automático de cliques inválidos). Ao criar campanhas: desativar parceiros de pesquisa/Display se não necessários, excluir IPs internos, acompanhar "cliques inválidos" na coluna de relatórios, definir orçamento diário baixo no início. Para proteção forte (WAF), o caminho é Cloudflare gratuito na frente do domínio (exige alterar DNS; ação do dono).
- **Fotos reais, publicações (posts) e pedido de avaliações** no Perfil: dependem de ativos do dono (fotos da agência/equipe, link de avaliação do Perfil). Quanto mais avaliações e fotos recentes, melhor o ranking local.
- **Data de abertura** do Perfil: não preenchida (não foi encontrada fonte confiável; usar a data do CNPJ).

### Opcional
- Cadastrar `https://alavidestinos.com.br` e enviar o sitemap no Search Console (propriedade de domínio) e usar "Remoções" para as URLs antigas do netlify.app.
- Vincular Search Console ↔ GA4 e Clarity ↔ GA4.
- Investigar as 4 sessões "google / cpc" no GA4: a conta Google Ads "ALAVI DESTINOS" não tem campanhas; provável origem é link com UTM/auto-tag antigo ou tráfego automatizado. Conferir a dimensão "Nome do host" completa no relatório.

### Search Console (conta alavidestinos@gmail.com)
- Propriedades criadas e verificadas pelo arquivo HTML `public/googleef59b9203ea8d674.html` (**não remover**): `https://alavidestinos.com.br/` (sitemap.xml enviado, 92 URLs) e `https://alavi-site.netlify.app/`.
- **Remoção temporária (~6 meses)** de todas as URLs do prefixo `https://alavi-site.netlify.app/` solicitada em "Remoções" (os 301 garantem a saída definitiva). Para desfazer: Search Console → Remoções → cancelar a solicitação.
- `netlify.toml` tem uma exceção que mantém o arquivo de verificação acessível em netlify.app (regra `status = 200` antes dos 301). **Manter** enquanto a propriedade netlify.app for usada.
- O Google pode levar de horas a alguns dias para trocar o resultado já exibido; o nome "Netlify" some junto com a URL antiga.
