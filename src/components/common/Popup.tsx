import { FC, useRef } from "react";

import { PopupItemsType } from "@/types";
import useOnClickOutside from "@/hooks/useOutsideClick";

type PopupProps = {
  items: PopupItemsType[];
  closePopup: () => void;
};

const Popup: FC<PopupProps> = ({ items, closePopup }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef, closePopup);

  return (
    <div
      className="min-w-36 bg-white shadow-xl border border-gray-400 flex flex-col rounded-md absolute top-4 right-0"
      ref={wrapperRef}
    >
      {items.map(({ text, func }) => (
        <p
          onClick={func}
          key={text}
          className="text-xs text-black-100 [&:not(:last-child)]:border-b border-gray-400 py-3 px-3 hover:bg-gray-200 rounded-sm"
        >
          {text}
        </p>
      ))}
    </div>
  );
};

export default Popup;
