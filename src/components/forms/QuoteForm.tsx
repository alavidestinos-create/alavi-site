"use client";

import { useRef, useState, type FormEvent } from "react";
import { emptyQuoteFormData, type QuoteFormData } from "@/types/quote";
import { validateQuoteForm, type QuoteFormErrors } from "@/lib/validation";
import { buildQuoteWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { FieldWrapper, fieldClasses } from "@/components/forms/FormField";
import Link from "next/link";

type SubmitState = "idle" | "submitting" | "success" | "error" | "unavailable";

export function QuoteForm() {
  const [data, setData] = useState<QuoteFormData>(emptyQuoteFormData);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [state, setState] = useState<SubmitState>("idle");
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

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setState("submitting");

    try {
      const response = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 501) {
        // Nenhum endpoint de destino configurado ainda: fluxo esperado
        // enquanto ORCAMENTO_WEBHOOK_URL não é definido.
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
      setState("error");
      trackEvent("quote_form_submit", { result: "error" });
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center">
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
      <div className="rounded-2xl border border-navy-200 bg-navy-50 p-6 text-center">
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
          Não foi possível enviar seu pedido agora. Tente novamente em instantes
          ou fale diretamente pelo WhatsApp usando o botão no rodapé da página.
        </div>
      )}

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-1 font-display text-base font-semibold text-navy-900 sm:col-span-2">
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
        <legend className="mb-1 font-display text-base font-semibold text-navy-900 sm:col-span-2">
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
        <legend className="mb-1 font-display text-base font-semibold text-navy-900 sm:col-span-3">
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
        <legend className="mb-1 font-display text-base font-semibold text-navy-900 sm:col-span-2">
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
        <legend className="mb-1 font-display text-base font-semibold text-navy-900 sm:col-span-3">
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
        <legend className="mb-1 font-display text-base font-semibold text-navy-900 sm:col-span-2">
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
        <legend className="mb-1 font-display text-base font-semibold text-navy-900">
          Orçamento e observações
        </legend>
        <FieldWrapper label="Orçamento estimado" htmlFor="estimatedBudget" hint="Opcional — ajuda a montar opções mais adequadas">
          <input
            id="estimatedBudget"
            type="text"
            className={fieldClasses()}
            value={data.estimatedBudget}
            onChange={(e) => update("estimatedBudget", e.target.value)}
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

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-teal-700 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {state === "submitting" ? "Enviando..." : "Solicitar orçamento"}
      </button>
    </form>
  );
}
