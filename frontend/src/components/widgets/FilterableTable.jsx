import { useState, useMemo } from "react";
import Input from "@/components/UI/Input";
import ComboBox from "@/components/UI/ComboBox";
import clsx from "clsx";

export default function FilterableTable({ columns, data, className = "", tableWidth = "w-full", pageSize = 50 }) {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const handleFilterChange = (accessor, value) => {
    setFilters((prev) => ({ ...prev, [accessor]: value }));
    setPage(1); // сброс страницы при фильтрации
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        const filter = filters[col.accessor];
        if (!filter || filter === "") return true;

        const value = row[col.accessor];
        if (!value) return false;

        if (col.filterType === "select") {
          return value.toLowerCase().includes(filter.toLowerCase());
        }

        if (col.filterType === "date") {
          const rowDate = new Date(value);
          const filterDate = new Date(filter);
          return col.filterMode === "before"
            ? rowDate <= filterDate
            : rowDate >= filterDate;
        }

        return value.toLowerCase().includes(filter.toLowerCase());
      })
    );
  }, [filters, data, columns]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className={clsx("rounded shadow-md overflow-auto", tableWidth, className)}>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="bg-[--color-primary] text-white font-bold border-y border-l last:border-r border-[--color-primary] px-4 py-2 text-center"
              >
                <div className="flex flex-col items-center w-full">
                  <span className="mb-1">{col.header}</span>

                  {col.filterType === "select" && (
                    <ComboBox
                      placeholder="Все"
                      options={[{ label: "Все", value: "" }, ...(col.options || [])]}
                      value={filters[col.accessor] || ""}
                      onChange={(val) => handleFilterChange(col.accessor, val)}
                      className="w-full"
                    />
                  )}

                  {col.filterType === "date" && (
                    <Input
                      type="date"
                      value={filters[col.accessor] || ""}
                      onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
                      className="text-black w-full"
                    />
                  )}

                  {(col.filterType === "text" || col.filterType === undefined) && (
                    <input
                      type="text"
                      placeholder="Фильтр..."
                      value={filters[col.accessor] || ""}
                      onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
                      className="p-1 rounded text-sm w-full text-black"
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIdx) => (
            <tr key={rowIdx} className="transition cursor-pointer hover:bg-[--color-secondary]">
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className="border-y border-l last:border-r border-[--color-primary] text-[--color-primary] px-4 py-2 text-center break-words max-w-xs"
                >
                  {typeof col.render === "function" ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-2 bg-[--color-background] border-t border-[--color-border] text-[--color-primary] text-sm">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-2">←</button>
          <span>Страница {page} из {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-2">→</button>
        </div>
      )}
    </div>
  );
}