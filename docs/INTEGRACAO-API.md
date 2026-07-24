# Integração futura com o sistema interno (CRM)

Este site é um projeto **separado** do sistema interno/CRM da ALAVI. Não há
neste momento nenhuma dependência direta de banco de dados ou API do sistema
interno. Este documento apenas propõe o formato de dados para uma futura
integração via API, quando ela for desenvolvida.

## Princípios

- O site nunca deve se conectar diretamente ao banco de dados do CRM.
- Toda comunicação futura deve ocorrer por API HTTP autenticada (token/OAuth),
  nunca por credenciais expostas no frontend.
- Enquanto a integração não existe, o formulário de orçamento usa um webhook
  configurável (`ORCAMENTO_WEBHOOK_URL`) ou o fallback de WhatsApp.

## Entidade: Lead / Pedido de orçamento

Payload atualmente enviado por `POST /api/orcamento` ao webhook configurado
(ver `src/app/api/orcamento/route.ts` e `src/types/quote.ts`):

```json
{
  "source": "site-alavi",
  "submittedAt": "2026-07-23T18:00:00.000Z",
  "data": {
    "fullName": "string",
    "whatsapp": "string",
    "email": "string",
    "originCity": "string",
    "destination": "string",
    "departureDate": "YYYY-MM-DD",
    "returnDate": "YYYY-MM-DD",
    "flexibleDates": "boolean",
    "adults": "number",
    "children": "number",
    "childrenAges": "string",
    "infants": "number",
    "tripType": "lazer | lua-de-mel | familia | negocios | neve | outro",
    "flightClass": "economica | premium-economy | executiva | primeira-classe",
    "needsAccommodation": "boolean",
    "accommodationStandard": "economico | confortavel | luxo | sem-preferencia",
    "roomsCount": "number",
    "needsInsurance": "boolean",
    "needsTransfer": "boolean",
    "wantsToUsePoints": "boolean",
    "loyaltyPrograms": "string",
    "approximatePoints": "string",
    "estimatedBudget": "string",
    "notes": "string",
    "allowContact": "boolean",
    "acceptsPrivacyPolicy": "boolean"
  }
}
```

## Outras entidades sugeridas para a futura API do CRM

Estrutura sugerida apenas como ponto de partida para discussão com quem for
desenvolver a integração — nenhum contrato definitivo foi acordado.

- **Lead**: dados de contato + status (novo, em atendimento, convertido, perdido).
- **Cliente**: dados cadastrais vinculados a um ou mais leads/reservas.
- **Proposta**: opções de voo/hospedagem apresentadas a um lead, com validade.
- **Reserva**: proposta aceita, com status (confirmada, pendente, cancelada).
- **Voucher**: documento emitido para uma reserva confirmada.
- **Pacote / Destino**: catálogo de pacotes e destinos administrável fora do
  código-fonte do site (hoje vive em `src/content/destinations.ts` e
  `src/content/services.ts` como dados estáticos).
- **Pontos e milhas**: saldo e programas informados pelo cliente, vinculados a
  um lead ou cliente.
- **Área do cliente**: futura autenticação para o cliente acompanhar
  propostas, reservas e vouchers.

## Próximos passos quando a integração for planejada

1. Definir contrato de API (REST/GraphQL) e autenticação no lado do CRM.
2. Substituir o uso do webhook genérico em `ORCAMENTO_WEBHOOK_URL` por uma
   chamada direta ao endpoint de criação de Lead do CRM.
3. Avaliar sincronização de conteúdo de destinos/serviços (hoje estático) com
   um catálogo administrável no CRM, se fizer sentido.
