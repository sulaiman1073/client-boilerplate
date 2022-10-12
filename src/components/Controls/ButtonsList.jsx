import React from "react";
import MenuButton from "./MenuButton";

export default function ButtonsList({ buttons }) {
  return (
    <div className="children:not-first:mt-1">
      {buttons.map((b, i) => (
        <MenuButton {...b} key={i} />
      ))}
    </div>
  );
}
