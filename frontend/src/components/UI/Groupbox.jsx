import clsx from "clsx";

export default function GroupBox({
  title,
  icon,
  children,
  variant = "default", // default | white | transparent
  bordered = false,
  className = "",
}) {
  const variants = {
    default: "bg-[--color-background]",
    white: "bg-white text-black",
    transparent: "bg-transparent",
  };

  return (
    <div
      className={clsx(
        "p-6 rounded-2xl",
        variants[variant],
        bordered && "border border-[--color-border]",
        className
      )}
    >
      {title && (
        <div className="flex items-center mb-4">
          {icon && <div className="mr-2 text-xl">{icon}</div>}
          <h3 className="font-bold text-lg font-[Roboto]">{title}</h3>
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}
