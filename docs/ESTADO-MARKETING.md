# Estado da medição e marketing — ALAVI (31/10/2026)

IDs abaixo são públicos (aparecem no navegador). Nenhum segredo está neste arquivo.

## Ativos e IDs

| Ativo | Identificação |
|---|---|
| GTM | `GTM-NP7WZPTM` (conta 6401473835, contêiner 284539052). Versão 2 publicada (31/10/2026); versão 1 = contêiner vazio (alvo de reversão). |
| GA4 | Propriedade 561731852 "ALAVI - site", fluxo 16242443340, ID de medição `G-9B8BHTL48C`, fuso São Paulo, moeda BRL |
| Meta | Portfólio 1132880059919592, conta de anúncios 1714446789808549, Pixel/dataset "ALAVI - site" `1111983571550069` |
| Clarity | Projeto "alavi", ID `z6aru9zs94` |
| Netlify | Projeto `alavi-site`, deploy de `main`. `NEXT_PUBLIC_GTM_ID=GTM-NP7WZPTM` em Produção, Deploy Previews e Branch deploys |
| Search Console | Propriedade https://alavidestinos.com.br/ verificada por arquivo HTML (`public/googleef59b9203ea8d674.html`, manter no repo). Sitemap enviado e processado (92 páginas) |
| Google Ads | Conta "ALAVI DESTINOS" (ocid 8639601301). Vinculada ao GA4 561731852. Conversão "Enviar formulário de lead" importada do evento-chave `generate_lead` (Principal). Sem tag Google instalada, sem campanhas, sem gasto |
| GitHub | PR #1 mesclado em `main` (commits c7f0bc9, a9db8f1, d65ee8f). Deploy de produção de `main@6c26315` |

Conta Google de referência: alavidestinos@gmail.com (dona do GTM e do GA4).

## Feito e validado com dados reais

- GTM como único ponto de carga; GA4, Meta e Clarity só dentro do contêiner (sem duplicidade).
- 12 tags (GA4 config + 5 eventos + page_view de rota; Meta base, PageView de rota, Contact e Lead; Clarity), todas com consentimento por categoria e bloqueio de /admin, /painel, /crm, /api. O GTM confirmou "todas as tags configuradas para solicitar consentimento".
- Banner: antes da escolha, nenhuma requisição a GTM/GA/Meta/Clarity e nenhum cookie (testado em produção com visitante novo).
- Aceitar todos: cookies `_ga`, `_ga_9B8BHTL48C`, `_clck`, `_clsk`, `_fbp`; requisições reais a GA4, Meta e Clarity.
- Retirar só Publicidade: `_fbp` apagado, sem requisições ao Meta, Análise mantida.
- Recusar tudo: cookies apagados, nenhuma requisição de terceiros.
- GA4 Tempo real recebeu `first_visit`, `page_view`, `session_start` e `whatsapp_click`, 1 de cada.
- Meta Gerenciador de Eventos recebeu `PageView`, `Contact` e `Lead` do Pixel `1111983571550069`. `Lead` só dispara no `generate_lead` confirmado (200 do servidor + SMTP com destinatário aceito); `Contact` só no clique de WhatsApp/contato (intenção, não conversa nem venda).
- Formulário em produção (alavidestinos.com.br): envio identificado de teste, API 200, `generate_lead` com `event_id`, sem dados pessoais no dataLayer; e-mails de teste chegaram na caixa de destino (Gmail). Com consentimento recusado não há eventos.
- GA4: `generate_lead` marcado como evento-chave.
- Google Ads: vínculo com GA4 e conversão por importação (sem tag nativa, para não duplicar). A conversão antiga "Lead telefônico" já existia e não foi alterada.
- `docs/gtm/alavi-gtm-container.json` espelha a versão 2 publicada (12 tags ativas, IDs reais, sem segredos). É o arquivo de importação da versão publicada, não um export da interface do GTM.
- Netlify já tinha SMTP (`SMTP_HOST/PORT/USER/PASSWORD`) e `ORCAMENTO_EMAIL_TO` configurados.

## Reversão (restaura o comportamento anterior sem apagar as demais alterações)

1. Parar todas as tags imediatamente: GTM → Versões → versão 1 "Empty Container" → Publicar. O código do site continua igual; o GTM carrega vazio.
2. Site, opção A: Netlify → Deploys → `main@dcc7d02` → "Publish deploy". Restaura o site anterior, mas também remove tudo o que entrou depois, inclusive o arquivo de verificação do Search Console (reponha `public/googleef59b9203ea8d674.html` se fizer isso).
3. Site, opção B (preferível, mantém o resto): esvaziar/remover `NEXT_PUBLIC_GTM_ID` em Produção e disparar um NOVO build/deploy. A variável é incorporada no build, então removê-la sem refazer o deploy não tem efeito.
4. Não remover `public/googleef59b9203ea8d674.html`, ou a propriedade do Search Console perde a verificação.

## Pendências

1. Looker Studio: painel não criado. A tela do conector GA4 não carregou a lista de contas na automação (tentativas limitadas). Criar em lookerstudio.google.com com alavidestinos@gmail.com, conector Google Analytics, propriedade "ALAVI - site", conforme `docs/PLANO-PUBLICACAO-MEDICAO.md`.
2. Clarity: confirmar com uma sessão humana (a automação é classificada como bot e não gera gravação) que a gravação aparece e que os campos de formulário estão mascarados.
3. Meta: verificar o domínio alavidestinos.com.br em Business Settings → Segurança da marca → Domínios (exige meta-tag ou DNS).
4. API de Conversões da Meta: adiada. Viável sem custo via rota do Next no Netlify. Requisitos: gerar o token de acesso do dataset no Gerenciador de Eventos e guardá-lo só como variável de servidor (sem `NEXT_PUBLIC_`); enviar `Lead` somente com consentimento de Publicidade, `em`/`ph` com hash SHA-256, `_fbp`/`_fbc`, e `event_id` igual ao do Pixel para deduplicar; validar em deploy preview com "Eventos de teste". Não implementada para não subir envio server-side que não pôde ser testado de ponta a ponta.
5. Opcional: vincular Search Console ↔ GA4 e Clarity ↔ GA4.

## Fora do escopo, intocado

Bio, link e qualquer dado do Instagram. Nenhuma campanha ativada, nenhum gasto, nenhum pagamento cadastrado.
