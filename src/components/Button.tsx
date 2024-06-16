import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick: () => void;
  text: string;
}
export function Button({ onClick, text, ...rest }: ButtonProps) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      {...rest}
      className={twMerge(
        "group relative h-10 w-40 overflow-hidden rounded-2xl bg-green-500 text-lg font-bold text-white",
        rest.className
      )}
    >
      {text}
      <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
    </button>
  );
}
