import { useEffect, useRef, useState } from "react";
import "mathlive";
import "mathlive/static.css";
import "mathlive/fonts.css";

export function MathFieldInput({
  label,
  value,
  onChange,
  placeholder = "Escribe la expresión",
  className = "",
}) {
  const inputRef = useRef(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const field = inputRef.current;
    if (!field) return;

    field.value = value ?? "";
    field.setAttribute("virtual-keyboard-mode", "manual");
    field.setAttribute("smart-fence", "true");
    field.setAttribute("placeholder", placeholder);

    const handleInput = (event) => {
      const texto = event.target.value ?? "";
      onChange?.({ target: { value: texto } });
    };

    field.addEventListener("input", handleInput);

    return () => {
      field.removeEventListener("input", handleInput);
    };
  }, [onChange, placeholder, value]);

  const alternarTeclado = () => {
    const field = inputRef.current;
    if (!field) return;

    if (typeof field.executeCommand === "function") {
      field.executeCommand("toggleVirtualKeyboard");
      setKeyboardVisible((visible) => !visible);
      return;
    }

    setKeyboardVisible((visible) => !visible);
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between gap-3">
          <label className="block text-sm font-semibold text-slate-700">{label}</label>
          <button
            type="button"
            onClick={alternarTeclado}
            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            {keyboardVisible ? "Ocultar teclado" : "Teclado matemático"}
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <math-field
          ref={inputRef}
          class={className || "min-h-[52px] w-full bg-white px-4 py-3 text-base text-slate-700"}
          value={value ?? ""}
          virtual-keyboard-mode="manual"
          smart-fence="true"
          aria-label={label || placeholder}
        />
      </div>
    </div>
  );
}
