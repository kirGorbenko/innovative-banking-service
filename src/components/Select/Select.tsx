import React, {
  type FC,
  type InputHTMLAttributes,
  type FocusEvent,
  type KeyboardEvent,
  useRef,
  useState,
  useEffect,
} from "react";

import cn from "classnames";

import "./styles.css";

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  options?: string[];
  handleSelect?: (value: string) => void;
}

export const Select: FC<SelectProps> = ({
  options = [],
  onFocus,
  onKeyDown,
  handleSelect,
  value = "",
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const activeOptionRef = useRef<HTMLLIElement | null>(null);

  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: Event): void => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    isActive && handleScrollToActive();
  }, [isActive]);

  const handleScrollToActive = () => {
    if (menuRef.current && activeOptionRef.current) {
      const {top: menuTop} = menuRef.current.getBoundingClientRect();
      const {top: optionTop} = activeOptionRef.current.getBoundingClientRect();
      menuRef.current.scrollTop = optionTop - menuTop;
    }
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    setIsActive(true);
    onFocus && onFocus(event);
  };

  const handleChangeSelect = (value: string): void => {
    handleSelect && handleSelect(value);
    setIsActive(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Tab") {
      setIsActive(false);
    }
    onKeyDown && onKeyDown(event);
  };

  return (
    <div className="select" ref={wrapperRef}>
      <input
        readOnly
        type="text"
        value={value}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        {...props}
      />
      <img
        className="select__icon"
        src="/chevron-down.svg"
        alt="Chevron down"
      />
      {isActive && !(options.length === 0) && (
        <ul className="select__menu" ref={menuRef}>
          {options.map(option => (
            <li
              className={cn("select__item", {
                active: value === option,
              })}
              key={option}
              onClick={() => {
                handleChangeSelect(option);
              }}
              {...(value === option && {ref: activeOptionRef})}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
