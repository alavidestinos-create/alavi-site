import { cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function FieldWrapper({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
  className,
}: FieldWrapperProps) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;

  // Conecta automaticamente o campo (input/select/textarea) filho à mensagem
  // de erro/dica via aria-describedby e sinaliza aria-invalid, sem exigir
  // que cada um dos campos do formulário declare isso manualmente.
  const describedBy = error ? errorId : hint ? hintId : undefined;
  const field =
    isValidElement(children) && (error || hint)
      ? cloneElement(children as ReactElement<Record<string, unknown>>, {
          "aria-describedby": describedBy,
          "aria-invalid": error ? true : undefined,
        })
      : children;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-navy-800">
        {label}
        {required && <span className="ml-0.5 text-teal-700">*</span>}
      </label>
      {field}
      {hint && !error && (
        <p id={hintId} className="text-xs text-navy-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

const baseFieldClasses =
  "w-full rounded-lg border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30";

export function fieldClasses(hasError?: boolean): string {
  return cn(baseFieldClasses, hasError && "border-red-400 focus:border-red-500 focus:ring-red-500/30");
}
