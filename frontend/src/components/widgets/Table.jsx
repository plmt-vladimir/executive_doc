import clsx from "clsx";

export default function Table({
  headers = [],
  rows = [],
  onRowClick,
  striped = false,
  centered = true,
  className = "",
  tableWidth = "w-full", // Принятие пропса для ширины
}) {
  return (
    <table
      className={clsx(
        "min-w-full table-auto border border-[--color-primary] rounded overflow-hidden shadow-md",
        tableWidth, // Применяем переданный пропс
        className
      )}
    >
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={clsx(
                "bg-[--color-primary] text-white font-bold border border-[--color-primary] px-4 py-2",
                centered && "text-center"
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={clsx(
              "border-b border-[--color-primary] transition cursor-pointer",
              striped && rowIndex % 2 === 1 && "bg-[--color-background]",
              "hover:bg-[--color-secondary]"
            )}
            onClick={() => onRowClick?.(row, rowIndex)}
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={clsx(
                  "border border-[--color-primary] text-[--color-primary] px-4 py-2", // Текст и границы темно-синие
                  centered && "text-center",
                  "break-words", // Добавляем класс для переноса текста
                  "max-w-xs" // Ограничиваем ширину ячеек
                )}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
