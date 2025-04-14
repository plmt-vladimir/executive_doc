import { useState } from "react";

export default function ComboBox({
  options,
  label,
  onChange,
  placeholder = "Выберите...",
  className = "", 
  multiple = false
}) {
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : "");

  const handleChange = (e) => {
    if (multiple) {
      const values = Array.from(e.target.selectedOptions, (option) => option.value);
      setSelectedValues(values);
      onChange(values);
    } else {
      setSelectedValues(e.target.value);
      onChange(e.target.value);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}> {/* ✅ Применили className */}
      {label && <label className="text-[--color-primary]">{label}</label>}
      <select
        value={selectedValues}
        onChange={handleChange}
        className="w-full p-2 rounded border border-[--color-border] bg-white text-[--color-primary] focus:outline-none"
        multiple={multiple}
      >
        <option
          value=""
          disabled={selectedValues !== ""}
          className="text-[--color-primary]"
        >
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="text-[--color-primary]"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}


