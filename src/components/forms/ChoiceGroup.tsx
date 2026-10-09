import { cn } from "@/lib/utils";

export interface ChoiceOption {
  value: string;
  label: string;
  description?: string;
}

interface ChoiceGroupProps {
  /** Também usado como id do grupo (para foco em caso de erro de validação). */
  id: string;
  legend: string;
  options: ChoiceOption[];
  /** Valores selecionados (um único item no modo de escolha única). */
  selected: string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  /** Classes de grade, ex.: "sm:grid-cols-3". */
  columns?: string;
}

/**
 * Grupo de opções em formato de "cartões" clicáveis (radio ou checkbox por
 * baixo, para manter acessibilidade e navegação por teclado).
 */
export function ChoiceGroup({
  id,
  legend,
  options,
  selected,
  onChange,
  multiple = false,
  required,
  hint,
  error,
  className,
  columns = "sm:grid-cols-3",
}: ChoiceGroupProps) {
  const legendId = `${id}-legend`;
  const errorId = `${id}-error`;

  function handleSelect(value: string) {
    if (multiple) {
      onChange(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
    } else {
      onChange([value]);
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p id={legendId} className="text-sm font-medium text-navy-800">
        {legend}
        {required && <span className="ml-0.5 text-teal-700">*</span>}
      </p>
      <div
        id={id}
        tabIndex={-1}
        role={multiple ? "group" : "radiogroup"}
        aria-labelledby={legendId}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        className={cn("grid grid-cols-2 gap-3 outline-none", columns)}
      >
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <label key={option.value} className="relative cursor-pointer">
              <input
                type={multiple ? "checkbox" : "radio"}
                name={id}
                value={option.value}
                checked={checked}
                onChange={() => handleSelect(option.value)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex h-full flex-col rounded-xl border bg-white px-4 py-3 text-sm transition-colors",
                  "border-sand-300 text-navy-800 hover:border-teal-400",
                  "peer-checked:border-teal-600 peer-checked:bg-teal-50 peer-checked:text-navy-900",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500/40",
                  error && !checked && "border-red-300"
                )}
              >
                <span className="font-semibold">{option.label}</span>
                {option.description && (
                  <span className="mt-0.5 text-xs font-normal text-navy-500">{option.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {hint && !error && <p className="text-xs text-navy-500">{hint}</p>}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
