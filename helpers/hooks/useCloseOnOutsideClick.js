import { useEffect, useRef } from "react";

function useCloseOnOutsideClick(onClose) {
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return [ref];
}

export default useCloseOnOutsideClick;
