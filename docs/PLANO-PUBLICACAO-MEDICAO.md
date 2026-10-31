# Plano de publicação — mensuração e marketing ALAVI

Documento operacional. Complementa `docs/MEDICAO-MARKETING.md` (arquitetura, eventos e consentimento) e usa o contêiner `docs/gtm/alavi-gtm-container.json`.

> Regra de ouro: **nenhum ID de teste (ex.: `GTM-TEST123`) vai para produção.** Só IDs reais, criados sob a titularidade da ALAVI, entram nas variáveis do Netlify.

---

## 1. Inventário de ativos (conferido em 31/10/2026)

| Ativo | Situação encontrada | Quem age |
|---|---|---|
| Instagram `@alavi.destinos` | Existe, "Alavi Destinos & Experiências", categoria Agência de viagens, 148 seguidores. **O perfil, a bio e o link não são alterados por este projeto** (fora do escopo, decisão do dono). | Nenhuma ação neste plano. |
| Google Tag Manager | A conta `alavidestinos@gmail.com` **não tem** nenhuma conta/contêiner GTM. | Dono: criar (seção 3). |
| Google Analytics 4 | A conta `alavidestinos@gmail.com` **não tem** conta GA. | Dono: criar (seção 4). |
| Search Console | Sem propriedades na conta `alavidestinos@gmail.com`. | Dono: criar (seção 5). |
| Google Ads | Não foi possível ler o conteúdo (acesso de leitura da página negado ao assistente). | Dono: informar se já existe conta. |
| Meta Business / Pixel | Navegador sem login no Meta Business. | Dono: entrar e seguir a seção 6. |
| Microsoft Clarity | Navegador sem login no Clarity. | Dono: entrar e seguir a seção 7. |
| Netlify | Navegador do assistente sem login. | Dono: conferir/ajustar variáveis (seção 8). |

Contas Google presentes no Chrome: `contasapagarpf1@gmail.com`, `jvimoveispf@gmail.com`, `morganaduarte0102@gmail.com`, `alavidestinos@gmail.com`. **Usar apenas `alavidestinos@gmail.com`** para os ativos da ALAVI. Os ativos não devem ser criados nas outras contas.

Por que o assistente não criou GTM/GA4/Meta/Clarity: criar contas e aceitar termos de serviço é ação reservada ao titular. Tudo o que não exige criar conta (contêiner pronto, documentação, código, testes) está feito.

---

## 2. Convenção de UTMs

Sempre minúsculas, sem acentos, sem espaços (use `-`), **nunca** nome, e-mail ou telefone.

| Parâmetro | Valores | Exemplo |
|---|---|---|
| `utm_source` | `google`, `meta`, `instagram`, `whatsapp`, `email`, `parceiro-<nome>` | `instagram` |
| `utm_medium` | `cpc`, `paid_social`, `social`, `bio`, `story`, `email`, `referral` | `bio` |
| `utm_campaign` | `<aaaa-mm>_<destino-ou-tema>_<objetivo>` | `2026-11_cruzeiro_leads` |
| `utm_content` | variação do criativo/link | `video-01`, `link-bio` |
| `utm_term` | só busca paga: palavra-chave | `cruzeiro-bahamas` |

Modelos:

- UTMs só para links novos (anúncios, posts, e-mails). Os links existentes do Instagram permanecem como estão.
- Anúncio Meta (parâmetros de URL do anúncio): `utm_source=meta&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}` (nomes de campanha/anúncio já seguindo a regra acima).
- Google Ads: ativar a marcação automática (`gclid`); UTMs manuais são opcionais.

---

## 3. Google Tag Manager

1. Entrar em <https://tagmanager.google.com/> com `alavidestinos@gmail.com`.
2. Criar conta **ALAVI Destinos & Experiências**, país Brasil; contêiner **alavidestinos.com.br**, tipo **Web**. Anotar o ID `GTM-XXXXXXX`.
3. *Administrador → Configurações do contêiner*: ativar **Ativar visão geral do consentimento**.
4. *Administrador → Importar contêiner*: arquivo `docs/gtm/alavi-gtm-container.json`, espaço de trabalho **Novo** (ex.: "Importação ALAVI"), opção **Mesclar → Renomear tags, acionadores e variáveis conflitantes**. Se a importação recusar o arquivo, criar manualmente conforme a tabela da seção 3.2 (o conteúdo é o mesmo).
5. Em *Variáveis*, preencher as três constantes com os IDs reais (seções 4, 6 e 7): `CONST - GA4 Measurement ID`, `CONST - Meta Pixel ID`, `CONST - Clarity Project ID`.
6. Nas tags importadas, tirar o estado **Pausada** só depois de preencher a constante correspondente.
7. Usar **Visualizar (Preview)** e validar (seção 9) **antes** de publicar. Publicar somente com aprovação.

### 3.1 O que o contêiner importado contém

- **Todas as tags vêm pausadas** e têm o acionador de bloqueio `BLOCK - areas excluidas` (`/admin`, `/painel`, `/crm`, `/api`).
- **Consentimento por tag** (configuração "Consentimento adicional"):
  - GA4 (todas as tags `GA4 - …`) e Clarity → exigem `analytics_storage`.
  - Meta (todas as tags `META - …`) → exigem `ad_storage`.
- O site já envia `consent default` (tudo negado) e `consent update` antes de carregar o GTM; o GTM só é carregado depois que o visitante escolhe pelo menos uma categoria. **Não presumir** que carregar o GTM garante o respeito à escolha: a barreira real está no consentimento de cada tag. Conferir isso na *Visão geral do consentimento* e no Preview (seção 9).

### 3.2 Tags, acionadores e conversões

| Tag | Acionador | Papel |
|---|---|---|
| GA4 - Google tag (config) | Initialization | Configura GA4 e envia o `page_view` da primeira página |
| GA4 - evento whatsapp_click | `whatsapp_click` | Clique (intenção). **Não é lead.** |
| GA4 - evento quote_form_start | `quote_form_start` | Diagnóstico de funil |
| GA4 - evento quote_form_submit | `quote_form_submit` | Tentativa de envio. **Não é lead.** |
| GA4 - evento generate_lead | `generate_lead` | **Lead confirmado** (só após sucesso real do servidor) |
| GA4 - evento quote_form_error | `quote_form_error` | Falhas de envio (diagnóstico) |
| GA4 - page_view em troca de rota | `route_change` | `page_view` das páginas seguintes (navegação sem recarregar) |
| META - Pixel base + PageView | Initialization | Carrega o Pixel |
| META - PageView em troca de rota | `route_change` | PageView das páginas seguintes |
| META - Lead | `generate_lead` | Lead confirmado, com `eventID` (= `event_id`) para deduplicação futura com a API de Conversões |
| META - Contact | `whatsapp_click` | Secundário: clique no WhatsApp (opcional; não usar como lead) |
| CLARITY - projeto | Initialization | Gravação de sessões; chama `clarity('consentv2', …)` com `analytics_Storage: granted` e `ad_Storage: denied` |

Conversões:

- **Principal:** `generate_lead`.
- **Secundárias:** `whatsapp_click` e `quote_form_submit` (aparecem como eventos; só marque como evento-chave se for útil para otimização).
- **Evitar duplicidade:** importar a conversão do Google Ads **a partir do evento-chave do GA4** *ou* usar tag nativa de conversão do Google Ads — **nunca os dois**. Recomendação inicial: importação do GA4 (uma única fonte). Para a Meta, o evento `Lead` vem somente da tag do GTM; o código do site não instala o Pixel quando o GTM está ativo.

---

## 4. Google Analytics 4

1. <https://analytics.google.com/> com `alavidestinos@gmail.com` → criar conta e propriedade "ALAVI - site".
2. Fuso **(GMT-03:00) Horário de Brasília / America/Sao_Paulo**, moeda **Real brasileiro (BRL)**.
3. Fluxo de dados **Web**: `https://alavidestinos.com.br`. Anotar o ID `G-XXXXXXXXXX` (vai na variável `CONST - GA4 Measurement ID`).
4. Em *Medição otimizada*, **desativar "Mudanças de página com base em eventos do histórico do navegador"** — a tag `GA4 - page_view em troca de rota` já cobre isso; manter as duas ligadas duplicaria visualizações.
5. Em *Eventos*, marcar `generate_lead` como **evento-chave**.
6. Em *Administrador → Vinculações*: vincular Google Ads e Search Console quando existirem.
7. Em *Retenção de dados*: 14 meses (para exploração).

---

## 5. Search Console

1. <https://search.google.com/search-console> com `alavidestinos@gmail.com`.
2. Adicionar a propriedade **Domínio** `alavidestinos.com.br` (verificação por registro DNS TXT — exige acesso ao painel do domínio, ex. Registro.br) **ou** **Prefixo do URL** `https://alavidestinos.com.br/` verificada pela tag do GTM/GA4.
3. Enviar o sitemap: `https://alavidestinos.com.br/sitemap.xml`.
4. Vincular ao GA4 (seção 4, item 6).

---

## 6. Meta (Business, Pixel e Instagram)

1. Entrar em <https://business.facebook.com/> com a conta que administra a página da ALAVI.
2. Conferir o **portfólio empresarial** (use o existente; só criar se não houver) e quem são os administradores.
3. Vincular: Página do Facebook, conta profissional do Instagram `@alavi.destinos`, conta de anúncios (moeda **BRL**, fuso **America/Sao_Paulo**).
4. *Gerenciador de Eventos → Conectar fontes de dados → Web → Meta Pixel*: criar o Pixel "ALAVI - site". O ID numérico vai em `CONST - Meta Pixel ID`.
5. *Configurações da empresa → Domínios*: verificar `alavidestinos.com.br`.
6. Validar com **Testar eventos** (seção 9). A **API de Conversões** fica adiada: exigiria endpoint servidor com token, consentimento e deduplicação; o `event_id` já é enviado para isso. Tokens futuros ficam somente em variáveis de servidor do Netlify, sem prefixo `NEXT_PUBLIC_`.

---

## 7. Microsoft Clarity

1. <https://clarity.microsoft.com/> → novo projeto "ALAVI - site", URL `https://alavidestinos.com.br`. ID em `CONST - Clarity Project ID`.
2. *Settings → Setup / Cookie consent*: marcar que o projeto **requer consentimento de cookies**. O contêiner já informa o consentimento via `clarity('consentv2', …)` (documentação Microsoft: <https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2>).
3. *Settings → Masking*: **Strict** (ou no mínimo Balanced). O formulário de orçamento já tem `data-clarity-mask="True"`.
4. Não há áreas administrativas no site público; se `/admin`, `/painel` ou `/crm` passarem a existir, a tag já é bloqueada nesses caminhos.
5. Vincular ao GA4 em *Settings → Setup → Google Analytics integration* (opcional).

---

## 8. Netlify (variáveis de ambiente de produção)

Só o dono altera. Para medição: **somente** `NEXT_PUBLIC_GTM_ID` (ID real `GTM-…`). `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` e `NEXT_PUBLIC_CLARITY_ID` ficam **vazias** (a arquitetura é GTM).

Para o formulário entregar de verdade, precisa existir **um** destino: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` (e `ORCAMENTO_EMAIL_TO`) **ou** `ORCAMENTO_WEBHOOK_URL`. Sem destino, a API responde 501 e o visitante é encaminhado ao WhatsApp (nesse caso **não** há `generate_lead`). Confirmar nos *Site configuration → Environment variables* quais existem (sem copiar valores para lugar nenhum).

---

## 9. Validação com dados reais (depois de criar os IDs)

Registrar print/anotação de cada item.

**Formulário (HTTP 200 = lead aceito):** o `/api/orcamento` só devolve 200 quando o servidor SMTP **aceitou** o destinatário (verificação `accepted`) ou o webhook respondeu 2xx. Teste de ponta a ponta no **deploy de prévia** (nunca com cliente real): enviar com nome `TESTE TÉCNICO ALAVI — DESCONSIDERAR`, e-mail e WhatsApp do próprio dono, e conferir (a) chegada na caixa `ORCAMENTO_EMAIL_TO`, (b) `generate_lead` no Preview do GTM **somente** após a resposta de sucesso. Observação: se o SMTP estiver configurado, o cliente (e-mail informado) recebe também um e-mail de confirmação — use seu próprio e-mail.

**Consentimento e cookies (DevTools → Application → Cookies, domínio do site):**

| Cenário | Esperado |
|---|---|
| Antes de escolher / Recusar | Nenhuma requisição a `googletagmanager`, `google-analytics`, `facebook`, `clarity`; sem cookies `_ga*`, `_gcl_*`, `_fbp`, `_clck`, `_clsk` |
| Só Análise | Gera `_ga*`, `_clck`, `_clsk`; **não** gera `_fbp`/`_fbc`/`_gcl_*` |
| Só Publicidade | Gera `_fbp` (e `_gcl_*` se houver Ads); **não** gera `_ga*`/`_clck` |
| Aceitar tudo | Todos |
| Retirar Análise (manter Publicidade) | Página recarrega; `_ga*`, `_gid`, `_gat*`, `_clck`, `_clsk` removidos; `_fbp` mantido; sem novas requisições do GA4/Clarity |
| Retirar Publicidade (manter Análise) | Página recarrega; `_fbp`, `_fbc`, `_gcl_*` removidos; `_ga*` mantido |

Limitação: cookies de **terceiros** (ex.: do domínio `clarity.ms`, `facebook.com`) não podem ser apagados pelo site; o navegador do visitante é quem os remove. O Clarity, ao receber `consentv2` negado, encerra a sessão e apaga os cookies dele no domínio do site.

**Plataformas:**

- GTM **Preview / Tag Assistant**: cada ação gera 1 disparo por tag esperada (tabela da seção 3.2); na *Visão geral do consentimento*, ver o estado por tag.
- GA4 **DebugView** (usar o modo debug do Tag Assistant): 1 `whatsapp_click` por clique; `generate_lead` 1× por envio com sucesso.
- Meta **Testar eventos**: `PageView`, `Contact` (clique) e `Lead` (1× por envio, com ID de evento).
- Clarity: abrir o site, aceitar Análise e conferir a sessão; verificar que campos do formulário aparecem mascarados.
- URLs: conferir que nenhum parâmetro de URL contém dados pessoais (o formulário envia por POST; os eventos só levam categorias).

---

## 10. Relatórios (gratuitos)

**Painel no Looker Studio** (gratuito; conectores nativos gratuitos para GA4, Search Console e Google Ads):

| Página | Métricas |
|---|---|
| Visão geral | Usuários, sessões, canais (`Grupo de canais padrão`), origem/mídia/campanha |
| Entrada | Páginas de destino (landing pages), engajamento |
| Conversas e leads | Eventos `whatsapp_click`, `quote_form_submit`, `generate_lead` (contagem) |
| Taxas | Cliques no WhatsApp ÷ sessões; **leads confirmados** (`generate_lead`) ÷ sessões; `generate_lead` ÷ `quote_form_submit` |
| Anúncios | Google Ads: custo, cliques, conversões (conector nativo). Meta Ads: exportação |

Meta Ads e Instagram: não há conector gratuito nativo no Looker Studio. Alternativas gratuitas: relatórios nativos do **Gerenciador de Anúncios** e do **Meta Business Suite / Insights do Instagram** (com exportação CSV agendada) e importação do CSV numa planilha Google conectada ao Looker Studio. **Não contratar conectores pagos.**

Não exibir receita, vendas ou retorno sobre investimento: o site mede visitas, cliques e pedidos de orçamento, não vendas. Ligar pedidos fechados ao anúncio exigiria o CRM (futuro).

---

## 11. Custos opcionais (nada foi contratado)

- Domínio/DNS e GTM/GA4/Clarity/Search Console/Looker Studio: gratuitos.
- Anúncios (Google e Meta): pagos por clique/impressão — só começam quando o titular cadastrar pagamento e publicar campanhas.
- Conectores de terceiros (Meta Ads no Looker): pagos — opcionais, não necessários.
- API de Conversões via parceiro/servidor gerenciado (ex. gateway do GTM server-side): custo de infraestrutura — adiada.

---

## 12. Sequência final de publicação

1. Dono cria GTM, GA4, Search Console, Meta (Pixel) e Clarity (seções 3–7) e informa **só os IDs** (nunca senhas/códigos).
2. Importar o contêiner, preencher as 3 constantes, validar no **Preview**.
3. Abrir o Pull Request da branch `feat/medicao-marketing`; revisar; aprovar.
4. No Netlify, definir `NEXT_PUBLIC_GTM_ID` (ID real) **no contexto de prévia**, gerar o deploy de prévia e rodar os testes da seção 9.
5. Aprovar. Fazer o merge → deploy de produção; definir `NEXT_PUBLIC_GTM_ID` em produção e **publicar a versão do contêiner GTM** na mesma janela (as duas coisas juntas).
6. Em produção: repetir os testes da seção 9 com um envio `TESTE TÉCNICO ALAVI — DESCONSIDERAR`, conferir DebugView, Testar eventos e Clarity; marcar `generate_lead` como evento-chave (se ainda não).
7. Só depois: Google Ads/Meta Ads (importar conversão, criar campanhas com UTMs). Anúncios não foram e não serão publicados sem decisão do titular.

Reversão: no GTM, voltar à versão anterior do contêiner; no Netlify, remover `NEXT_PUBLIC_GTM_ID` (o site volta a não carregar nenhuma ferramenta).
