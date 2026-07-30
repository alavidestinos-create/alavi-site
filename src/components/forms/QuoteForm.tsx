"use client";

import { useRef, useState, type FormEvent } from "react";
import { emptyQuoteFormData, type QuoteFormData } from "@/types/quote";
import { validateQuoteForm, type QuoteFormErrors } from "@/lib/validation";
import { buildQuoteWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { formatCurrencyInput } from "@/lib/utils";
import { FieldWrapper, fieldClasses } from "@/components/forms/FormField";
import Link from "next/link";

type SubmitState = "idle" | "submitting" | "success" | "error" | "unavailable";

export function QuoteForm() {
  const [data, setData] = useState<QuoteFormData>(emptyQuoteFormData);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [state, setState] = useState<SubmitState>("idle");
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const hasStarted = useRef(false);

  function update<K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) {
    if (!hasStarted.current) {
      hasStarted.current = true;
      trackEvent("quote_form_start");
    }
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateQuoteForm(data);
    setErrors(validationErrors);

    const invalidKeys = Object.keys(validationErrors);
    if (invalidKeys.length > 0) {
      // Nunca falhar em silêncio: mostra um aviso destacado no topo e leva o
      // usuário direto até o primeiro campo com problema, mesmo que ele
      // esteja fora da área visível no momento do envio.
      setShowErrorSummary(true);
      const firstInvalidId = invalidKeys[0];
      const firstInvalidField = firstInvalidId ? document.getElementById(firstInvalidId) : null;
      firstInvalidField?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (firstInvalidField instanceof HTMLElement) {
        firstInvalidField.focus({ preventScroll: true });
      }
      trackEvent("quote_form_validation_error", { fields: invalidKeys.join(",") });
      return;
    }

    setShowErrorSummary(false);

    // Abre uma aba em branco de forma síncrona (ainda dentro do clique do
    // usuário) e só preenche o destino depois que o envio terminar. Isso
    // evita que o navegador bloqueie a abertura como pop-up, já que a
    // chamada assíncrona ao servidor aconteceria depois do gesto de clique.
    // Protegido em try/catch: alguns navegadores/extensões podem lançar uma
    // exceção (em vez de simplesmente retornar null) ao bloquear o pop-up —
    // sem essa proteção, o restante da função nunca chegava a rodar e o
    // envio parecia não fazer nada.
    let whatsAppTab: Window | null = null;
    try {
      whatsAppTab = window.open("", "_blank");
    } catch {
      whatsAppTab = null;
    }

    // Redireciona a aba pro WhatsApp imediatamente, sem esperar o e-mail.
    // O WhatsApp é o canal principal e não pode ficar refém da velocidade
    // do envio de e-mail (handshake SMTP com o Gmail + partida a frio da
    // função na Netlify podem levar alguns segundos). O e-mail continua
    // sendo enviado normalmente, só que em paralelo, em segundo plano.
    if (whatsAppTab) {
      whatsAppTab.location.href = buildWhatsAppUrl(buildQuoteWhatsAppMessage(data));
    }

    setState("submitting");

    // Evita que o formulário fique "travado" em "Enviando..." para sempre
    // caso a função da Netlify demore demais ou nunca responda.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      if (response.status === 501) {
        // Nenhum destino configurado ainda: fluxo esperado enquanto o
        // e-mail/webhook não estão definidos. O WhatsApp já foi aberto acima.
        setState("unavailable");
        trackEvent("quote_form_submit", { result: "unavailable" });
        return;
      }

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      setState("success");
      trackEvent("quote_form_submit", { result: "success" });
    } catch {
      // O WhatsApp já foi aberto acima, então o pedido não se perde mesmo
      // que o envio de e-mail falhe (rede, timeout, servidor fora do ar).
      setState("error");
      trackEvent("quote_form_submit", { result: "error" });
    } finally {
      clearTimeout(timeout);
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
        <h3 className="font-display text-lg font-semibold text-navy-900">
          Pedido enviado com sucesso!
        </h3>
        <p className="mt-2 text-sm text-navy-700">
          Recebemos suas informações e em breve entraremos em contato. Se
          preferir, você também pode continuar a conversa agora mesmo pelo
          WhatsApp.
        </p>
        <a
          href={buildWhatsAppUrl(buildQuoteWhatsAppMessage(data))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Continuar no WhatsApp
        </a>
      </div>
    );
  }

  if (state === "unavailable") {
    return (
      <div className="rounded-2xl border border-sand-300 bg-sand-50 p-8 text-center">
        <h3 className="font-display text-lg font-semibold text-navy-900">
          Envio automático indisponível no momento
        </h3>
        <p className="mt-2 text-sm text-navy-700">
          O envio automático do formulário ainda está sendo configurado. Para
          não perder seu pedido, continue diretamente pelo WhatsApp com os
          dados que você já preencheu.
        </p>
        <a
          href={buildWhatsAppUrl(buildQuoteWhatsAppMessage(data))}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Continuar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {state === "error" && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p>Não foi possível enviar seu pedido agora. Tente novamente em instantes.</p>
          <a
            href={buildWhatsAppUrl(buildQuoteWhatsAppMessage(data))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Continuar no WhatsApp
          </a>
        </div>
      )}

      {showErrorSummary && Object.keys(errors).length > 0 && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Verifique os campos destacados em vermelho antes de enviar — faltam
          algumas informações obrigatórias.
        </div>
      )}

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-1 font-display text-lg font-medium text-navy-900 sm:col-span-2">
          Seus dados
        </legend>
        <FieldWrapper label="Nome completo" htmlFor="fullName" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            className={fieldClasses(!!errors.fullName)}
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper label="WhatsApp" htmlFor="whatsapp" required error={errors.whatsapp} hint="Com DDD, ex: (11) 99999-9999">
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            className={fieldClasses(!!errors.whatsapp)}
            value={data.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper label="E-mail" htmlFor="email" required error={errors.email} className="sm:col-span-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClasses(!!errors.email)}
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </FieldWrapper>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-1 font-display text-lg font-medium text-navy-900 sm:col-span-2">
          Viagem
        </legend>
        <FieldWrapper label="Cidade de origem" htmlFor="originCity" required error={errors.originCity}>
          <input
            id="originCity"
            type="text"
            className={fieldClasses(!!errors.originCity)}
            value={data.originCity}
            onChange={(e) => update("originCity", e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper label="Destino desejado" htmlFor="destination" required error={errors.destination}>
          <input
            id="destination"
            type="text"
            className={fieldClasses(!!errors.destination)}
            value={data.destination}
            onChange={(e) => update("destination", e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper label="Data de ida" htmlFor="departureDate" error={errors.departureDate} required={!data.flexibleDates}>
          <input
            id="departureDate"
            type="date"
            disabled={data.flexibleDates}
            className={fieldClasses(!!errors.departureDate)}
            value={data.departureDate}
            onChange={(e) => update("departureDate", e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper label="Data de volta" htmlFor="returnDate" error={errors.returnDate}>
          <input
            id="returnDate"
            type="date"
            disabled={data.flexibleDates}
            className={fieldClasses(!!errors.returnDate)}
            value={data.returnDate}
            onChange={(e) => update("returnDate", e.target.value)}
          />
        </FieldWrapper>
        <label className="flex items-center gap-2 text-sm text-navy-700 sm:col-span-2">
          <input
            type="checkbox"
            checked={data.flexibleDates}
            onChange={(e) => update("flexibleDates", e.target.checked)}
            className="h-4 w-4 rounded border-navy-300 accent-teal-700 focus:ring-teal-500"
          />
          Tenho flexibilidade de datas
        </label>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-3">
        <legend className="mb-1 font-display text-lg font-medium text-navy-900 sm:col-span-3">
          Viajantes
        </legend>
        <FieldWrapper label="Adultos" htmlFor="adults" required error={errors.adults}>
          <input
            id="adults"
            type="number"
            min={1}
            className={fieldClasses(!!errors.adults)}
            value={data.adults}
            onChange={(e) => update("adults", Number(e.target.value))}
          />
        </FieldWrapper>
        <FieldWrapper label="Crianças" htmlFor="children">
          <input
            id="children"
            type="number"
            min={0}
            className={fieldClasses()}
            value={data.children}
            onChange={(e) => update("children", Number(e.target.value))}
          />
        </FieldWrapper>
        <FieldWrapper label="Bebês" htmlFor="infants">
          <input
            id="infants"
            type="number"
            min={0}
            className={fieldClasses()}
            value={data.infants}
            onChange={(e) => update("infants", Number(e.target.value))}
          />
        </FieldWrapper>
        {data.children > 0 && (
          <FieldWrapper
            label="Idade das crianças"
            htmlFor="childrenAges"
            required
            error={errors.childrenAges}
            hint="Ex: 4 e 7 anos"
            className="sm:col-span-3"
          >
            <input
              id="childrenAges"
              type="text"
              className={fieldClasses(!!errors.childrenAges)}
              value={data.childrenAges}
              onChange={(e) => update("childrenAges", e.target.value)}
            />
          </FieldWrapper>
        )}
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-1 font-display text-lg font-medium text-navy-900 sm:col-span-2">
          Preferências
        </legend>
        <FieldWrapper label="Tipo de viagem" htmlFor="tripType">
          <select
            id="tripType"
            className={fieldClasses()}
            value={data.tripType}
            onChange={(e) => update("tripType", e.target.value as QuoteFormData["tripType"])}
          >
            <option value="">Selecione</option>
            <option value="lazer">Lazer</option>
            <option value="lua-de-mel">Lua de mel</option>
            <option value="familia">Viagem em família</option>
            <option value="negocios">Negócios</option>
            <option value="neve">Viagem de neve</option>
            <option value="outro">Outro</option>
          </select>
        </FieldWrapper>
        <FieldWrapper label="Classe de voo" htmlFor="flightClass">
          <select
            id="flightClass"
            className={fieldClasses()}
            value={data.flightClass}
            onChange={(e) => update("flightClass", e.target.value as QuoteFormData["flightClass"])}
          >
            <option value="">Selecione</option>
            <option value="economica">Econômica</option>
            <option value="premium-economy">Premium Economy</option>
            <option value="executiva">Executiva</option>
            <option value="primeira-classe">Primeira Classe</option>
          </select>
        </FieldWrapper>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-3">
        <legend className="mb-1 font-display text-lg font-medium text-navy-900 sm:col-span-3">
          Hospedagem e serviços adicionais
        </legend>
        <label className="flex items-center gap-2 text-sm text-navy-700">
          <input
            type="checkbox"
            checked={data.needsAccommodation}
            onChange={(e) => update("needsAccommodation", e.target.checked)}
            className="h-4 w-4 rounded border-navy-300 accent-teal-700 focus:ring-teal-500"
          />
          Preciso de hospedagem
        </label>
        <label className="flex items-center gap-2 text-sm text-navy-700">
          <input
            type="checkbox"
            checked={data.needsInsurance}
            onChange={(e) => update("needsInsurance", e.target.checked)}
            className="h-4 w-4 rounded border-navy-300 accent-teal-700 focus:ring-teal-500"
          />
          Preciso de seguro viagem
        </label>
        <label className="flex items-center gap-2 text-sm text-navy-700">
          <input
            type="checkbox"
            checked={data.needsTransfer}
            onChange={(e) => update("needsTransfer", e.target.checked)}
            className="h-4 w-4 rounded border-navy-300 accent-teal-700 focus:ring-teal-500"
          />
          Preciso de transfer
        </label>

        {data.needsAccommodation && (
          <>
            <FieldWrapper
              label="Padrão de hospedagem"
              htmlFor="accommodationStandard"
              required
              error={errors.accommodationStandard}
            >
              <select
                id="accommodationStandard"
                className={fieldClasses(!!errors.accommodationStandard)}
                value={data.accommodationStandard}
                onChange={(e) =>
                  update("accommodationStandard", e.target.value as QuoteFormData["accommodationStandard"])
                }
              >
                <option value="">Selecione</option>
                <option value="economico">Econômico</option>
                <option value="confortavel">Confortável</option>
                <option value="luxo">Luxo</option>
                <option value="sem-preferencia">Sem preferência</option>
              </select>
            </FieldWrapper>
            <FieldWrapper label="Quantidade de quartos" htmlFor="roomsCount">
              <input
                id="roomsCount"
                type="number"
                min={1}
                className={fieldClasses()}
                value={data.roomsCount}
                onChange={(e) => update("roomsCount", Number(e.target.value))}
              />
            </FieldWrapper>
          </>
        )}
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-1 font-display text-lg font-medium text-navy-900 sm:col-span-2">
          Pontos e milhas
        </legend>
        <label className="flex items-center gap-2 text-sm text-navy-700 sm:col-span-2">
          <input
            type="checkbox"
            checked={data.wantsToUsePoints}
            onChange={(e) => update("wantsToUsePoints", e.target.checked)}
            className="h-4 w-4 rounded border-navy-300 accent-teal-700 focus:ring-teal-500"
          />
          Tenho interesse em usar pontos ou milhas nesta viagem
        </label>
        {data.wantsToUsePoints && (
          <>
            <FieldWrapper label="Programas de fidelidade" htmlFor="loyaltyPrograms" hint="Ex: Smiles, Latam Pass, Livelo">
              <input
                id="loyaltyPrograms"
                type="text"
                className={fieldClasses()}
                value={data.loyaltyPrograms}
                onChange={(e) => update("loyaltyPrograms", e.target.value)}
              />
            </FieldWrapper>
            <FieldWrapper label="Quantidade aproximada de pontos" htmlFor="approximatePoints">
              <input
                id="approximatePoints"
                type="text"
                className={fieldClasses()}
                value={data.approximatePoints}
                onChange={(e) => update("approximatePoints", e.target.value)}
              />
            </FieldWrapper>
          </>
        )}
      </fieldset>

      <fieldset className="grid gap-5">
        <legend className="mb-1 font-display text-lg font-medium text-navy-900">
          Orçamento e observações
        </legend>
        <FieldWrapper label="Orçamento estimado" htmlFor="estimatedBudget" hint="Opcional — ajuda a montar opções mais adequadas">
          <input
            id="estimatedBudget"
            type="text"
            inputMode="numeric"
            placeholder="R$ 0,00"
            className={fieldClasses()}
            value={data.estimatedBudget}
            onChange={(e) => update("estimatedBudget", formatCurrencyInput(e.target.value))}
          />
        </FieldWrapper>
        <FieldWrapper label="Observações" htmlFor="notes">
          <textarea
            id="notes"
            rows={4}
            className={fieldClasses()}
            value={data.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </FieldWrapper>
      </fieldset>

      <fieldset className="space-y-3">
        <label className="flex items-start gap-2 text-sm text-navy-700">
          <input
            type="checkbox"
            checked={data.allowContact}
            onChange={(e) => update("allowContact", e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-navy-300 accent-teal-700 focus:ring-teal-500"
          />
          Autorizo a ALAVI a entrar em contato comigo sobre este pedido de orçamento.
        </label>
        <label className="flex items-start gap-2 text-sm text-navy-700">
          <input
            id="acceptsPrivacyPolicy"
            type="checkbox"
            checked={data.acceptsPrivacyPolicy}
            onChange={(e) => update("acceptsPrivacyPolicy", e.target.checked)}
            aria-describedby={errors.acceptsPrivacyPolicy ? "acceptsPrivacyPolicy-error" : undefined}
            aria-invalid={errors.acceptsPrivacyPolicy ? true : undefined}
            className="mt-0.5 h-4 w-4 rounded border-navy-300 accent-teal-700 focus:ring-teal-500"
          />
          Li e concordo com a{" "}
          <Link href="/privacidade" className="underline hover:text-teal-700">
            Política de Privacidade
          </Link>
          .<span className="ml-0.5 text-teal-700">*</span>
        </label>
        {errors.acceptsPrivacyPolicy && (
          <p id="acceptsPrivacyPolicy-error" role="alert" className="text-xs font-medium text-red-600">
            {errors.acceptsPrivacyPolicy}
          </p>
        )}
      </fieldset>

      <div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex w-full items-center justify-center rounded-full bg-navy-900 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {state === "submitting" ? "Enviando..." : "Solicitar orçamento"}
        </button>
        <p className="mt-3 text-xs text-navy-500">
          Sem compromisso — um consultor entra em contato para dar continuidade ao seu pedido.
        </p>
      </div>
    </form>
  );
}
