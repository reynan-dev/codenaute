import { useState } from "react";

interface BurgerButtonProps {
    onClick: () => void
}

export const BurgerButton = ({ onClick }: BurgerButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-[3px] w-8 my-1 rounded-full bg-primary transition ease transform duration-300`;

    const handleOnClick = () => {
        setIsOpen(!isOpen)
        onClick()
    }

  return (
    <button
      className="flex flex-col h-10 w-fit justify-center items-center group"
      onClick={() => handleOnClick()}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "rotate-45 translate-y-[11px] opacity-100"
            : "opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "-rotate-45 -translate-y-[11px] opacity-100"
            : "opacity-100"
        }`}
      />
    </button>
  );
};
