import React from "react";
import { createPortal } from "react-dom";
interface Portalprops {
    isOpen : boolean
    onClose : ()=>void
    children: React.ReactNode
}
const Portal: React.FC<Portalprops> = ({isOpen,onClose, children }) => {
    if(!isOpen) return null
    return createPortal(
    <div className="fixed bottom-40 inset-0  bg-opacity-50 flex justify-center items-center z-1000">
      
      <div className="bg-black p-6 rounded-lg shadow-xl relative max-w-md w-full ">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl font-bold text-white cursor-pointer"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("cart-root")!
  );
};
export default Portal
