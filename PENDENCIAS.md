# Informações pendentes

Lista do que precisa ser fornecido pela ALAVI antes da publicação definitiva.
Nenhum destes dados foi inventado — todos aparecem como placeholder explícito
no código (buscar por `PENDENTE_`) até serem preenchidos.

## Comercial / contato

- [x] Número de WhatsApp Business: (54) 99231-2943
- [x] E-mail comercial: alavidestinos@gmail.com
- [x] Instagram: @alavi.destinos
- [x] Horário de atendimento: seg-sex 9h30–18h, sáb 9h30–12h
- [x] Endereço: Av. Brasil Centro, 1121, Sala 1203 – Centro, Passo Fundo - RS
- [ ] Confirmar se o e-mail `alavidestinos@gmail.com` é o definitivo ou se
      haverá um e-mail no domínio próprio (ex.: contato@alavidestinos.com.br)

## Jurídico / LGPD

- [ ] Razão social (`src/config/site.ts` → `legal.razaoSocial`)
- [ ] CNPJ (`src/config/site.ts` → `legal.cnpj`)
- [ ] Revisão das páginas `/privacidade`, `/termos` e `/cookies` por
      profissional jurídico antes da publicação definitiva

## Identidade visual

- [x] Paleta de cores (`navy`/`teal` em `tailwind.config.ts`) — extraída por
      amostragem de cor (Pillow) e **validada cruzando dois arquivos de logo**
      (ícone isolado e selo circular). Ainda assim, confirme com a versão
      final aprovada da identidade visual.
- [x] Favicon, `apple-touch-icon.png`, `icon-192/512.png` e imagem Open Graph
      gerados a partir do ícone real (`brand-source/logo-icon-cropped.png`).
- [x] Logo aplicado no Header (ícone, 40px), Footer (ícone, 56px) e na página
      Sobre (selo circular completo, `public/brand/logo-badge.jpg`).
- [ ] **Arquivo de logo com fundo transparente.** Os dois arquivos
      localizados (`brand-source/logo-icon-source.png` e
      `logo-badge-source.png`) são renders com fundo cinza/preto e glow, sem
      transparência real. No Header/Footer isso aparece como um leve halo
      acinzentado ao redor do ícone (dissimulado dentro de um chip
      arredondado, mas visível de perto). Quando o arquivo oficial em PNG/SVG
      com fundo transparente for fornecido, substituir os arquivos em
      `public/brand/` e regenerar favicon/OG (ver `DECISOES-TECNICAS.md`).
- [ ] Versão do wordmark "ALAVI" como arquivo de imagem/vetor (hoje é texto
      estilizado em HTML/CSS, não um arquivo de fonte customizada)

## Conteúdo

- [ ] Depoimentos reais de clientes, com autorização de uso
      (`src/content/testimonials.ts` — atualmente com placeholders)
- [ ] Fotos de destinos e experiências (Bariloche, Buenos Aires, Cancún,
      Caribe e demais) para substituir os blocos de imagem "pendente"
- [ ] Revisão final de todos os textos por alguém da agência

## Técnico / infraestrutura

- [ ] Domínio `alavidestinos.com.br` — acesso ao DNS para configuração na
      Vercel/Netlify
- [ ] Configurar o envio direto por e-mail do formulário de orçamento
      (variáveis `SMTP_HOST`/`SMTP_USER`/`SMTP_PASSWORD`/`ORCAMENTO_EMAIL_TO`
      em `.env.example` — recomendado usar uma "Senha de app" do Gmail da
      conta `alavidestinos@gmail.com`). Sem isso configurado no Netlify, o
      formulário continua caindo no fallback de WhatsApp.
- [ ] Alternativa: `ORCAMENTO_WEBHOOK_URL` (Make/Zapier, serviço de
      formulário, ou futura integração com o CRM)
- [ ] IDs de Analytics, se e quando a agência decidir usar
      (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`)
- [ ] Conta na Vercel (ou Netlify) e no GitHub para publicação
