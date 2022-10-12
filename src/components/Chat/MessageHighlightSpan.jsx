import React from "react";

export default function MessageHighlightSpan({ ownId, userId, status }) {
  return (
    <span
      className={`w-0.2 mr-4 ${
        userId !== ownId || status === "rejected" || status === "pending"
          ? "bg-highlightBackground"
          : "bg-highlightText"
      }`}
    ></span>
  );
}
