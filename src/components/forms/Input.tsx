interface InputProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Input = ({ icon, children }: InputProps) => {
  return (
    <div className="flex w-full max-w-4xl rounded-lg overflow-hidden border border-[#b3b3b3] border-opacity-20">
      <div className="bg-primary-color p-4 w-[3.5rem] flex items-center justify-center">
        <div className="text-white">{icon}</div>
      </div>

      {children}
    </div>
  );
};

export default Input;
