export default function Textarea({ value, onChange, placeholder, className = "" }) {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 rounded border border-[--color-border] bg-white text-[--color-primary] resize-none font-[Roboto] ${className}`}
      />
    );
  }