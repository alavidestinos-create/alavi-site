interface ArticleTableProps {
  headers: string[];
  rows: string[][];
}

/**
 * Tabela comparativa opcional dentro de um artigo (BlogPost.table) — usada,
 * por exemplo, no guia de bagagem de mão x despachada. Só aparece nos
 * artigos que a definirem; não afeta o template padrão dos demais artigos.
 */
export function ArticleTable({ headers, rows }: ArticleTableProps) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-sand-200">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-navy-950">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 font-display text-xs font-semibold uppercase tracking-wide text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row[0] ?? rowIndex} className={rowIndex % 2 === 1 ? "bg-sand-50" : "bg-white"}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={
                    cellIndex === 0
                      ? "px-4 py-3 align-top font-semibold text-navy-900 border-t border-sand-200"
                      : "px-4 py-3 align-top text-navy-700 border-t border-sand-200"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
