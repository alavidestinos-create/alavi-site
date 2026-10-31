# Medição e marketing — ALAVI

Este documento descreve o que está **implementado no código**, o que ainda precisa ser **configurado nas plataformas** (GTM, GA4, Meta, Clarity) e como **validar com dados reais**.

> Estado atual: toda a infraestrutura está pronta, mas **desligada**. Nenhum ID real foi informado; nenhum script de terceiros é carregado até que (1) um ID seja configurado e (2) o visitante consinta.

---

## 1. Arquitetura

| Peça | Arquivo | Função |
|---|---|---|
| Consentimento (estado/armazenamento) | `src/lib/consent.ts` | Lê/grava a escolha em `localStorage` (`alavi-cookie-consent`), converte para Consent Mode v2, compatível com os valores antigos `accepted`/`rejected`. |
| Configuração/validação de IDs | `src/lib/tracking-config.ts` | Valida o formato dos IDs vindos do ambiente; ignora IDs inválidos; define áreas excluídas. |
| Carregador único | `src/components/analytics/MarketingTags.tsx` | Define Consent Mode (tudo negado), carrega as ferramentas só após consentimento, trata mudança de rota e cliques em WhatsApp. |
| Eventos | `src/lib/analytics.ts` | `trackEvent()` — respeita consentimento, ignora áreas excluídas, nunca envia dados pessoais. |
| Banner | `src/components/cookie/CookieConsent.tsx` | Recusar / Personalizar (Necessários, Análise, Publicidade) / Aceitar todos. |
| Reabrir preferências | `src/components/cookie/CookiePreferencesButton.tsx` | Link "Preferências de cookies" no rodapé. |

### Regra anti-duplicidade

- **Com `NEXT_PUBLIC_GTM_ID`**: o código carrega **somente o GTM**. Os IDs diretos de GA4/Meta/Clarity são **ignorados** (`tracking-config.ts`). As ferramentas são configuradas dentro do contêiner.
- **Sem GTM**: o código carrega diretamente as ferramentas cujos IDs existirem (GA4 e Clarity com consentimento de *Análise*; Meta Pixel com *Publicidade*).
- Nunca as duas coisas ao mesmo tempo.
- O `<noscript>` do GTM **não** foi incluído de propósito: ele carregaria o contêiner sem consentimento.

### Áreas excluídas

`/admin`, `/painel`, `/crm`, `/api` (lista em `EXCLUDED_PATH_PREFIXES`). Hoje essas rotas não existem no site público; a exclusão já fica garantida para quando existirem (CRM/painel). No contêiner do GTM, reforce com uma condição de bloqueio para `Page Path` começando por esses prefixos.

---

## 2. Variáveis de ambiente

Todas opcionais e vazias por padrão (ver `.env.example`). **Não preencher com valores inventados.**

| Variável | Quando usar |
|---|---|
| `NEXT_PUBLIC_GTM_ID` | Caminho recomendado. Formato `GTM-XXXXXXX`. |
| `NEXT_PUBLIC_GA_ID` | Só sem GTM. Formato `G-XXXXXXXXXX`. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Só sem GTM. Número do Pixel. |
| `NEXT_PUBLIC_CLARITY_ID` | Só sem GTM. ID do projeto Clarity. |

IDs `NEXT_PUBLIC_*` são públicos por natureza (aparecem no navegador). **Tokens da Conversions API (Meta) ou Measurement Protocol (GA4) jamais devem usar prefixo `NEXT_PUBLIC_`** — se forem implementados no futuro, ficam apenas em variáveis do servidor (rota `/api/...`), sem prefixo público e sem commit.

---

## 3. Eventos (dataLayer / gtag / Meta)

Nenhum evento carrega nome, e-mail, telefone ou texto livre. Apenas categorias.

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `whatsapp_click` | Clique em qualquer link `wa.me` (botão flutuante, hero, rodapé, cartões…). **Intenção, não é lead.** | `link_location` (ex.: `float_button`, `hero`, `footer`) |
| `quote_form_start` | Primeira interação com o formulário | — |
| `quote_form_validation_error` | Tentativa de envio com campos inválidos | `fields` (apenas nomes dos campos, nunca valores) |
| `quote_form_submit` | Formulário válido e enviado (tentativa) | `form_name`, `lead_type` |
| `quote_form_whatsapp_handoff` | Encaminhamento para WhatsApp após envio | `form_name`, `lead_type` |
| **`generate_lead`** | **Só após sucesso confirmado do servidor** — este é o lead confirmado | `form_name`, `lead_type`, `event_id` |
| `quote_form_error` | Falha no envio / serviço indisponível | `reason` (`submit_failed` \| `unavailable`) |
| `route_change` | Navegação entre páginas (SPA) — modo GTM | `page_path` |

Outros nomes já previstos para uso futuro: `service_click`, `destination_click`, `instagram_click`, `article_share_whatsapp`, `article_link_copied`.

**Intenção vs. lead confirmado:** `whatsapp_click` e `quote_form_submit` medem intenção. Apenas `generate_lead` indica lead confirmado (servidor respondeu com sucesso). Use `generate_lead` como conversão principal.

`event_id` (UUID) acompanha `generate_lead` e é repassado ao Meta Pixel como `eventID`, permitindo deduplicar com uma futura Conversions API.

---

## 4. Consent Mode v2

Padrão em cada visita: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` = `denied`; `functionality_storage` e `security_storage` = `granted`.

- **Análise** → `analytics_storage`.
- **Publicidade** → `ad_storage`, `ad_user_data`, `ad_personalization`.
- Aceite posterior → `gtag('consent','update', …)` (sem recarregar).
- Revogação → atualiza o consentimento e **recarrega a página** (scripts de terceiros já carregados não podem ser descarregados com segurança).
- Antes de qualquer escolha, **nenhuma** requisição a `googletagmanager.com`, `google-analytics.com`, `facebook.net` ou `clarity.ms` é feita.

---

## 5. O que configurar nas plataformas (não feito — exige acesso)

### 5.1 GTM (caminho recomendado)
1. Criar contêiner Web em tagmanager.google.com → copiar o `GTM-XXXXXXX`.
2. Ativar **Consent Overview** (Admin → Container Settings → Enable consent overview).
3. Variáveis de camada de dados: `link_location`, `form_name`, `lead_type`, `event_id`, `reason`.
4. Acionadores (Evento personalizado): `whatsapp_click`, `quote_form_submit`, `generate_lead`, `route_change`, `quote_form_error`.
5. **GA4**: tag "Google tag" com o ID de medição, disparo em *Initialization – All Pages* (ela respeita o Consent Mode); tags de evento GA4 para `whatsapp_click` e `generate_lead` (marcar `generate_lead` como evento-chave no GA4). Evite `page_view` duplicado: desative o envio automático e use `route_change` como acionador para páginas navegadas via SPA, ou habilite "Mudanças no histórico" nas medições aprimoradas, mas **não ambos**.
6. **Meta Pixel**: tag HTML personalizada (ou template da galeria) com *Consentimento adicional* = `ad_storage`. Base code em *Initialization*; evento `Lead` no acionador `generate_lead`, usando `event_id` como `eventID`; `Contact` opcional no `whatsapp_click`.
7. **Clarity**: tag do template oficial Microsoft Clarity, com *Consentimento adicional* = `analytics_storage`.
8. Para todas as tags: exceção de acionamento quando `Page Path` começa com `/admin`, `/painel`, `/crm` ou `/api`.
9. Visualizar no **Modo de visualização (Preview)** antes de publicar o contêiner.

### 5.2 GA4
Criar a propriedade e o fluxo web, copiar o ID de medição (`G-…`) para a tag no GTM. Marcar `generate_lead` como evento-chave. Vincular ao Google Ads, se for usar.

### 5.3 Meta (Business Manager)
Criar/usar o Pixel em Gerenciador de Eventos, copiar o ID para a tag no GTM, depois testar com **Test Events**. Domínio `alavidestinos.com.br` precisa ser verificado em Brand Safety → Domínios se for usar otimização por eventos agregados.

### 5.4 Microsoft Clarity
Criar projeto, copiar o ID. Em *Settings → Masking*, usar **Strict** (ou ao menos "Balanced") para mascarar textos/inputs. Em *Settings → Setup*, ativar **Cookie consent** para respeitar o banner. O formulário já está marcado com `data-clarity-mask="True"`. Não integrar o Clarity a áreas administrativas.

---

## 6. Validação

### 6.1 Local (PowerShell, na pasta `alavi-site`)

```powershell
npm run typecheck
npm run lint
npm test
npm run build
npm run dev
```

Checklist manual em `http://localhost:3000` (navegador em janela anônima):

1. Primeira visita → aparece o banner com *Recusar / Personalizar / Aceitar todos*.
2. *Personalizar* → três categorias (Necessários bloqueado e ativo; Análise e Publicidade desligadas por padrão).
3. Aba Network antes de escolher: **zero** requisições a `googletagmanager`, `google-analytics`, `facebook`, `clarity`.
4. *Recusar* → nada de terceiros; recarregar mantém a escolha.
5. Rodapé → *Preferências de cookies* reabre o painel.
6. Console sem erros; `/orcamento` e os botões de WhatsApp funcionam normalmente.

Teste opcional do carregamento (valor fictício **apenas** em `.env.local`, nunca commitado): `NEXT_PUBLIC_GTM_ID=GTM-TEST123`. Em *Aceitar todos* deve aparecer uma requisição a `googletagmanager.com/gtm.js?id=GTM-TEST123`; antes disso, nenhuma. Em seguida, `window.dataLayer` no console deve conter os eventos ao clicar no WhatsApp. Remova a variável depois.

### 6.2 Com dados reais (depois de configurar as plataformas)
- GTM Preview: `whatsapp_click` ao clicar no botão; `generate_lead` **somente** após envio real do formulário.
- GA4 → DebugView / Tempo real.
- Meta → Test Events (verificar deduplicação por `event_id`).
- Clarity → gravação mostrando campos mascarados e ausência de `/admin`.
- Confirmar que, com *Recusar*, nenhum dos três recebe dados.

---

## 7. Resumo de status

| Item | Status |
|---|---|
| Implementado no código | Consentimento por categorias, Consent Mode v2, carregador único, eventos sem PII, `generate_lead` apenas pós-sucesso, mascaramento do Clarity no formulário, exclusão de áreas administrativas, testes unitários (`src/lib/__tests__/consent.test.ts`) |
| Configurado na plataforma | **Nada** — requer IDs/acessos |
| Validado com dados reais | **Nada** — depende dos itens acima |
