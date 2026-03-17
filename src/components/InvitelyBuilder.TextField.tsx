type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  maxLength,
}: TextFieldProps) {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="mb-1 block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[#8c7b6b]"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-[rgba(74,55,40,0.2)] bg-white px-3 py-2 text-[0.88rem] text-[#1a1612] outline-none transition focus:border-[#c9a84c]"
      />
    </div>
  );
}
