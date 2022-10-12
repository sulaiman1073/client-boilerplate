import React from "react";

export default function DateMessage({ message }) {
  return (
    <div
      className="ChatMessages--date flex justify-center items-center m-8 select-none"
      key={message.id}
    >
      <h4 className="bg-highlightBackground rounded-md px-3 py-1 text-secondaryText text-xs">
        {message.date}
      </h4>
    </div>
  );
}
