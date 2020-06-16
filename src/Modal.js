import React, { useEffect, useRef } from "react";

import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  //mythought: useRef is used to maintain reference to a particular instance of the DOM
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  //   const trapFocus = () => {
  //     return elRef.current.focus();
  //   };

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
