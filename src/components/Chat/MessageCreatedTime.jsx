import React from "react";

export default function MessageCreatedTime({ createdAt }) {
  return <span className="text-secondaryText">{createdAt}</span>;
}
