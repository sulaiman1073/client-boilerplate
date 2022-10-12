import React from "react";
import classnames from "classnames";

export default function MenuButton({ selected, danger, text, onClick }) {
  const buttonClasses = classnames(
    "flex justify-center hover:bg-highlightBackground rounded-lg px-6 py-2 select-none",
    {
      "bg-highlightBackground": selected
    }
  );

  return (
    <div role="button" onClick={onClick} className={buttonClasses}>
      <p className={danger ? "text-errorText" : ""}>{text}</p>
    </div>
  );
}
