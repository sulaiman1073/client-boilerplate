import React, { useState } from "react";

export default function GifSelection({ updateGifsOpen, isGifsOpen }) {
  const [isGifSelected, setGifSelected] = useState(false);
  const onGifClick = () => {
    setGifSelected(!isGifSelected);
  };
  return (
    <div>
      <div onClick={() => updateGifsOpen()} role="button">
        <div
          onClick={onGifClick}
          role="button"
          className={`${
            isGifSelected
              ? "bg-highlightText text-tertiaryText"
              : "bg-secondaryBackground hover:bg-highlightBackground"
          } w-10 h-10 p-2 rounded-lg transition transform ease-in-out hover:scale-110 duration-100 select-none`}
        >
          <p
            className={
              isGifSelected
                ? "text-tertiaryText font-bold"
                : "text-highlightText font-bold"
            }
          >
            GIF
          </p>
        </div>
      </div>
    </div>
  );
}
