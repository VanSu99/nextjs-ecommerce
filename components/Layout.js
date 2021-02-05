import React, { useState } from "react";
import Navbar from "./Header/Navbar";
import Notify from "./Notify";
import Modal from "./Modal";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const injectedProp = {
    isOpen,
    setIsOpen,
  };

  return (
    <div>
      <Navbar />
      <Notify />
      <Modal {...injectedProp} />
      {children}
    </div>
  );
}
