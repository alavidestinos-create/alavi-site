"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { emptyQuoteFormData, type QuoteFormData } from "@/types/quote";
import { validateQuoteForm, type QuoteFormErrors } from "@/lib/validation";
import { buildQuoteWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { formatCurrencyInput } from "@/lib/utils";
import { FieldWrapper, fieldClasses } from "@/components/forms/FormField";
import { ChoiceGroup, type ChoiceOption } from "@/components/forms/ChoiceGroup";
import Link from "next/link";

type SubmitState = "idle" | "submitting" | "success" | "error" | "unavailable";

const interestOptions: ChoiceOption[] = [
  { value: "passagem-aerea", label: "Passagem aérea", description: "Voos nacionais e internacionais" },
  { value: "pacote", label: "Pacote / roteiro", description: "Viagem completa e personalizada" },
  { value: "cruzeiro", label: "Cruzeiro", description: "Nacional ou internacional" },
  { value: "hospedagem", label: "Hospedagem", description: "Hotéis e resorts" },
  { value: "outro", label: "Outro", description: "Conte nas observações" },
];

const cruiseScopeOptions: ChoiceOption[] = [
  { value: "nacional", label: "Nacional", description: "Costa brasileira" },
  { value: "internacional", label: "Internacional", description: "Caribe, Europa, Alasca..." },
  { value: "indiferente", label: "Tanto faz", description: "Quero ver as opções" },
];

const cruiseRegionOptions: ChoiceOption[] = [
  { value: "Costa brasileira", label: "Costa brasileira" },
  { value: "América do Sul e Patagônia", label: "América do Sul e Patagônia" },
  { value: "Caribe e Bahamas", label: "Caribe e Bahamas" },
  { value: "Europa e Mediterrâneo", label: "Europa e Mediterrâneo" },
  { value: "Norte da Europa e Fiordes", label: "Norte da Europa e Fiordes" },
  { value: "Alasca", label: "Alasca" },
  { value: "Bermudas", label: "Bermudas" },
  { value: "Ásia e Oceania", label: "Ásia e Oceania" },
  { value: "Expedições polares", label: "Expedições polares" },
  { value: "Ainda não sei", label: "Ainda não sei" },
];

const cruiseLineOptions: ChoiceOption[] = [
  { value: "Royal Caribbean", label: "Royal Caribbean" },
  { value: "Celebrity Cruises", label: "Celebrity Cruises" },
  { value: "Costa Cruzeiros", label: "Costa Cruzeiros" },
  { value: "Azamara", label: "Azamara" },
  { value: "Silversea", label: "Silversea" },
  { value: "Crystal", label: "Crystal" },
  { value: "AmaWaterways", label: "AmaWaterways" },
  { value: "Uniworld", label: "Uniworld" },
  { value: "Hurtigruten Expeditions", label: "Hurtigruten" },
  { value: "Swan Hellenic", label: "Swan Hellenic" },
  { value: "Ritz-Carlton Yacht Collection", label: "Ritz-Carlton Yacht" },
  { value: "Sem preferência", label: "Sem preferência" },
];

const cruiseDurationOptions: ChoiceOption[] = [
  { value: "fim-de-semana", label: "Fim de semana" },
  { value: "3-5", label: "3 a 5 noites" },
  { value: "6-8", label: "6 a 8 noites" },
  { value: "9-14", label: "9 a 14 noites" },
  { value: "15-mais", label: "15 ou mais" },
  { value: "indiferente", label: "Indiferente" },
];

const cabinOptions: ChoiceOption[] = [
  { value: "interna", label: "Interna", description: "Sem janela" },
  { value: "externa", label: "Externa", description: "Com janela" },
  { value: "varanda", label: "Varanda", description: "Com varanda privativa" },
  { value: "suite", label: "Suíte", description: "Mais espaço e serviços" },
  { value: "indiferente", label: "Indiferente" },
];

const travelInterestOptions: ChoiceOption[] = [
  { value: "Praia", label: "Praia" },
  { value: "Parques temáticos", label: "Parques temáticos" },
  { value: "Gastronomia", label: "Gastronomia" },
  { value: "Cultura e história", label: "Cultura e história" },
  { value: "Aventura e natureza", label: "Aventura e natureza" },
  { value: "Compras", label: "Compras" },
  { value: "Descanso e bem-estar", label: "Descanso e bem-estar" },
  { value: "Vida noturna", label: "Vida noturna" },
  { value: "Neve", label: "Neve" },
];

const contactChannelOptions: ChoiceOption[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
  { value: "telefone", label: "Ligação" },
];

const contactPeriodOptions: ChoiceOption[] = [
  { value: "manha", label: "Manhã" },
  { value: "tarde", label: "Tarde" },
  { value: "noite", label: "Noite" },
  { value: "qualquer", label: "Qualquer horário" },
];

const suggestedDestinations = [
  "Orlando",
  "Miami",
  "Nova York",
  "Cancún",
  "Buenos Aires",
  "Bariloche",
  "Santiago",
  "Lisboa",
  "Paris",
  "Roma",
  "Dubai",
  "Tóquio",
];

function Section({
  step,
  title,
  description,
  children,
}: {
  step: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="grid gap-5 sm:grid-cols-2">
      <legend className="mb-1 flex items-center gap-3 font-display text-lg font-medium text-navy-900 sm:col-span-2">
        <span
          aria-hidden="true"
          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-xs font-semibold text-white"
        >
          {step}
        </span>
        {title}
      </legend>
      {description && <p className="-mt-3 text-sm text-navy-500 sm:col-span-2">{description}</p>}
      {children}
    </fieldset>
  );
}

function CheckboxField({
  checked,
  onChange,
  children,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex items-center gap-2 text-sm text-navy-700 ${className ?? ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-navy-300 accent-teal-700 focus:ring-teal-500"
      />
      {children}
    </label>
  );
}

function buildMonthOptions(): Array<{ value: string; label: string }> {
  const options: Array<{ value: string; label: string }> = [];
  const now = new Date();
  for (let i = 0; i < 18; i += 1) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    options.push({ value, label: label.charAt(0).toUpperCase() + label.slice(1) });
  }
  return options;
}

export function QuoteForm() {
  const [data, setData] = useState<QuoteFormData>(emptyQuoteFormData);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [state, setState] = useState<SubmitState>("idle");
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [monthOptions, setMonthOptions] = useState<Array<{ value: string; label: string }>>([]);
  const hasStarted = useRef(false);

  // Calculado no cliente para evitar divergência de hidratação na virada do mês.
  useEffect(() => {
    setMonthOptions(buildMonthOptions());
  }, []);

  function update<K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) {
    if (!hasStarted.current) {
      hasStarted.current = true;
      trackEvent("quote_form_start");
    }
    setData((prev) => ({ ...prev, [key]: value }));
    // Limpa o erro do campo assim que o cliente começa a corrigi-lo.
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  const isCruise = data.interest === "cruzeiro";
  let step = 0;
  const nextStep = () => {
    step += 1;
    return step;
  };

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
      trackEvent("quote_form_submit", { result: "success", interest: data.interest });
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
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
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

      <Section step={nextStep()} title="O que você está procurando?">
        <ChoiceGroup
          id="interest"
          legend="Escolha uma opção"
          required
          options={interestOptions}
          selected={data.interest ? [data.interest] : []}
          onChange={([value]) => update("interest", (value ?? "") as QuoteFormData["interest"])}
          error={errors.interest}
          columns="sm:grid-cols-3"
          className="sm:col-span-2"
        />
      </Section>

      <Section step={nextStep()} title="Seus dados">
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
      </Section>

      <Section
        step={nextStep()}
        title="Destino e datas"
        description={
          isCruise
            ? "Conte para onde e quando você gostaria de navegar. Os cruzeiros operam por temporada, então quanto mais flexível, mais opções."
            : "Quanto mais flexível você for, mais opções conseguimos comparar."
        }
      >
        <FieldWrapper
          label={isCruise ? "Cidade de onde você sai" : "Cidade de origem"}
          htmlFor="originCity"
          required
          error={errors.originCity}
          className={isCruise ? "sm:col-span-2" : undefined}
        >
          <input
            id="originCity"
            type="text"
            autoComplete="address-level2"
            className={fieldClasses(!!errors.originCity)}
            value={data.originCity}
            onChange={(e) => update("originCity", e.target.value)}
          />
        </FieldWrapper>

        {isCruise ? (
          <>
            <ChoiceGroup
              id="cruiseRegions"
              legend="Regiões de interesse"
              required
              multiple
              hint="Você pode marcar mais de uma."
              options={cruiseRegionOptions}
              selected={data.cruiseRegions}
              onChange={(next) => update("cruiseRegions", next)}
              error={errors.cruiseRegions}
              columns="sm:grid-cols-3"
              className="sm:col-span-2"
            />
            <FieldWrapper
              label="Outro destino ou porto específico"
              htmlFor="destination"
              hint="Opcional — ex.: Santorini, Fiordes da Noruega"
              className="sm:col-span-2"
            >
              <input
                id="destination"
                type="text"
                className={fieldClasses()}
                value={data.destination}
                onChange={(e) => update("destination", e.target.value)}
              />
            </FieldWrapper>
          </>
        ) : (
          <>
            <FieldWrapper label="Destino desejado" htmlFor="destination" required error={errors.destination}>
              <input
                id="destination"
                type="text"
                list="destinos-sugeridos"
                className={fieldClasses(!!errors.destination)}
                value={data.destination}
                onChange={(e) => update("destination", e.target.value)}
              />
              <datalist id="destinos-sugeridos">
                {suggestedDestinations.map((destination) => (
                  <option key={destination} value={destination} />
                ))}
              </datalist>
            </FieldWrapper>
            <FieldWrapper
              label="Segunda opção de destino"
              htmlFor="secondDestination"
              hint="Opcional — ajuda a comparar alternativas"
              className="sm:col-span-2"
            >
              <input
                id="secondDestination"
                type="text"
                list="destinos-sugeridos"
                className={fieldClasses()}
                value={data.secondDestination}
                onChange={(e) => update("secondDestination", e.target.value)}
              />
            </FieldWrapper>
          </>
        )}

        <FieldWrapper
          label={isCruise ? "Data de embarque" : "Data de ida"}
          htmlFor="departureDate"
          error={errors.departureDate}
          required={!data.flexibleDates}
        >
          <input
            id="departureDate"
            type="date"
            disabled={data.flexibleDates}
            className={fieldClasses(!!errors.departureDate)}
            value={data.departureDate}
            onChange={(e) => update("departureDate", e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper
          label={isCruise ? "Data de desembarque" : "Data de volta"}
          htmlFor="returnDate"
          error={errors.returnDate}
        >
          <input
            id="returnDate"
            type="date"
            disabled={data.flexibleDates}
            className={fieldClasses(!!errors.returnDate)}
            value={data.returnDate}
            onChange={(e) => update("returnDate", e.target.value)}
          />
        </FieldWrapper>
        <CheckboxField
          checked={data.flexibleDates}
          onChange={(checked) => update("flexibleDates", checked)}
          className="sm:col-span-2"
        >
          Tenho flexibilidade de datas (ainda não defini)
        </CheckboxField>

        {data.flexibleDates && (
          <FieldWrapper label="Mês ou período preferido" htmlFor="travelMonth" hint="Opcional">
            <select
              id="travelMonth"
              className={fieldClasses()}
              value={data.travelMonth}
              onChange={(e) => update("travelMonth", e.target.value)}
            >
              <option value="">Qualquer época</option>
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FieldWrapper>
        )}
        {!isCruise && (
          <FieldWrapper
            label="Duração da viagem"
            htmlFor="tripDuration"
            hint="Opcional"
            className={data.flexibleDates ? undefined : "sm:col-span-2"}
          >
            <select
              id="tripDuration"
              className={fieldClasses()}
              value={data.tripDuration}
              onChange={(e) => update("tripDuration", e.target.value as QuoteFormData["tripDuration"])}
            >
              <option value="">Selecione</option>
              <option value="ate-5">Até 5 dias</option>
              <option value="6-8">6 a 8 dias</option>
              <option value="9-12">9 a 12 dias</option>
              <option value="13-20">13 a 20 dias</option>
              <option value="21-mais">21 dias ou mais</option>
              <option value="indefinido">Ainda não sei</option>
            </select>
          </FieldWrapper>
        )}
      </Section>

      <Section step={nextStep()} title="Quem vai viajar">
        <div className="grid gap-5 sm:col-span-2 sm:grid-cols-3">
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
        </div>
      </Section>

      {isCruise ? (
        <Section
          step={nextStep()}
          title="Preferências do cruzeiro"
          description="Tudo opcional — nos ajuda a selecionar as saídas certas para você."
        >
          <ChoiceGroup
            id="cruiseScope"
            legend="Tipo de cruzeiro"
            options={cruiseScopeOptions}
            selected={data.cruiseScope ? [data.cruiseScope] : []}
            onChange={([value]) => update("cruiseScope", (value ?? "") as QuoteFormData["cruiseScope"])}
            className="sm:col-span-2"
          />
          <ChoiceGroup
            id="cruiseLines"
            legend="Companhias de interesse"
            multiple
            options={cruiseLineOptions}
            selected={data.cruiseLines}
            onChange={(next) => update("cruiseLines", next)}
            columns="sm:grid-cols-3"
            className="sm:col-span-2"
          />
          <ChoiceGroup
            id="cruiseDuration"
            legend="Duração do cruzeiro"
            options={cruiseDurationOptions}
            selected={data.cruiseDuration ? [data.cruiseDuration] : []}
            onChange={([value]) => update("cruiseDuration", (value ?? "") as QuoteFormData["cruiseDuration"])}
            columns="sm:grid-cols-3"
            className="sm:col-span-2"
          />
          <ChoiceGroup
            id="cabinType"
            legend="Tipo de cabine"
            options={cabinOptions}
            selected={data.cabinType ? [data.cabinType] : []}
            onChange={([value]) => update("cabinType", (value ?? "") as QuoteFormData["cabinType"])}
            columns="sm:grid-cols-5"
            className="sm:col-span-2"
          />
          <FieldWrapper
            label="Porto de embarque preferido"
            htmlFor="departurePort"
            hint="Ex.: Santos, Rio de Janeiro, Miami"
          >
            <input
              id="departurePort"
              type="text"
              className={fieldClasses()}
              value={data.departurePort}
              onChange={(e) => update("departurePort", e.target.value)}
            />
          </FieldWrapper>
          <CheckboxField
            checked={data.cruiseDrinkPackage}
            onChange={(checked) => update("cruiseDrinkPackage", checked)}
            className="self-end pb-3"
          >
            Tenho interesse em pacote de bebidas (open bar)
          </CheckboxField>
        </Section>
      ) : (
        <Section step={nextStep()} title="Preferências da viagem">
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
          {data.interest !== "hospedagem" && (
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
          )}
          <ChoiceGroup
            id="travelInterests"
            legend="O que você mais quer viver nessa viagem?"
            multiple
            hint="Marque quantas quiser — assim montamos um roteiro com a sua cara."
            options={travelInterestOptions}
            selected={data.travelInterests}
            onChange={(next) => update("travelInterests", next)}
            columns="sm:grid-cols-3"
            className="sm:col-span-2"
          />
        </Section>
      )}

      <Section
        step={nextStep()}
        title={isCruise ? "Serviços adicionais" : "Hospedagem e serviços adicionais"}
      >
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2">
          {(isCruise || data.interest === "pacote") && (
            <CheckboxField checked={data.needsFlights} onChange={(checked) => update("needsFlights", checked)}>
              {isCruise ? "Preciso de passagem aérea até o porto" : "Preciso de passagem aérea"}
            </CheckboxField>
          )}
          <CheckboxField
            checked={data.needsAccommodation}
            onChange={(checked) => update("needsAccommodation", checked)}
          >
            {isCruise ? "Preciso de hospedagem antes/depois do cruzeiro" : "Preciso de hospedagem"}
          </CheckboxField>
          <CheckboxField checked={data.needsInsurance} onChange={(checked) => update("needsInsurance", checked)}>
            Preciso de seguro viagem
          </CheckboxField>
          <CheckboxField checked={data.needsTransfer} onChange={(checked) => update("needsTransfer", checked)}>
            Preciso de transfer
          </CheckboxField>
          {!isCruise && data.interest !== "hospedagem" && (
            <CheckboxField
              checked={data.needsCheckedBaggage}
              onChange={(checked) => update("needsCheckedBaggage", checked)}
            >
              Preciso de bagagem despachada
            </CheckboxField>
          )}
        </div>

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
      </Section>

      <Section step={nextStep()} title="Pontos e milhas">
        <CheckboxField
          checked={data.wantsToUsePoints}
          onChange={(checked) => update("wantsToUsePoints", checked)}
          className="sm:col-span-2"
        >
          Tenho interesse em usar pontos ou milhas nesta viagem
        </CheckboxField>
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
      </Section>

      <Section step={nextStep()} title="Orçamento e observações">
        <FieldWrapper
          label="Orçamento estimado"
          htmlFor="estimatedBudget"
          hint="Opcional — ajuda a montar opções mais adequadas"
          className="sm:col-span-2"
        >
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
        <FieldWrapper
          label="Observações"
          htmlFor="notes"
          hint={
            isCruise
              ? "Ex.: comemoração, necessidades de acessibilidade, restrições alimentares."
              : "Ex.: comemoração, pedidos especiais, lugares que não pode faltar."
          }
          className="sm:col-span-2"
        >
          <textarea
            id="notes"
            rows={4}
            className={fieldClasses()}
            value={data.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </FieldWrapper>
      </Section>

      <Section step={nextStep()} title="Como prefere ser contatado?">
        <ChoiceGroup
          id="preferredContact"
          legend="Canal"
          options={contactChannelOptions}
          selected={data.preferredContact ? [data.preferredContact] : []}
          onChange={([value]) => update("preferredContact", (value ?? "") as QuoteFormData["preferredContact"])}
          columns="sm:grid-cols-3"
          className="sm:col-span-2"
        />
        <ChoiceGroup
          id="preferredPeriod"
          legend="Melhor período"
          options={contactPeriodOptions}
          selected={data.preferredPeriod ? [data.preferredPeriod] : []}
          onChange={([value]) => update("preferredPeriod", (value ?? "") as QuoteFormData["preferredPeriod"])}
          columns="sm:grid-cols-4"
          className="sm:col-span-2"
        />
      </Section>

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
          <span>
            Li e concordo com a{" "}
            <Link href="/privacidade" className="underline hover:text-teal-700">
              Política de Privacidade
            </Link>
            .<span className="ml-0.5 text-teal-700">*</span>
          </span>
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
