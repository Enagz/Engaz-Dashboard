interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  icon: React.ReactNode;
}

const Input = ({
  label,
  value,
  onValueChange,
  placeholder = "Enter text to translate",
  icon,
  ...props
}: InputProps) => {
  return (
    <div className="flex w-full max-w-4xl rounded-lg overflow-hidden border border-[#b3b3b3] border-opacity-20">
      <div className="bg-primary-color p-4 w-[3.5rem] flex items-center justify-center">
        <div className="text-white">{icon}</div>
      </div>

      <input
        {...props}
        id={label}
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className="bg-global-bg placeholder:text-text-normal disabled:text-text-normal grow text-sm py-4 px-6 focus:outline-none"
      />
    </div>
  );
};

export default Input;
