export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-xl transition"
    >
      {children}
    </button>
  );
};
