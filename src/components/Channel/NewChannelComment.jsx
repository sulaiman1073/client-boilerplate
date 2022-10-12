import React, { useState } from "react";

export default function NewChannelComment({
  postId,
  handleUploadImg,
  handleEmot,
  sendComment
}) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    // submit on Enter and not when shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendComment(value, postId);
      setValue("");
      console.log("submit");
    }
  };
  const handleSend = e => {
    // submit on Enter and not when shift+Enter
    e.preventDefault();
    sendComment(value, postId);
    setValue("");
    console.log("submit");
  };

  const handleChange = e => {
    e.target.style.height = "2.4rem";
    e.target.style.height = `${Math.min(e.target.scrollHeight + 2, 168)}px`;
    setValue(e.target.value);
  };
  return (
    <form
      onSubmit={handleSend}
      className="flex flex-row justify-center bg-secondaryBackground content-center py-2"
    >
      <textarea
        type="text"
        placeholder="Add a comment"
        className="rounded-lg mx-2 w-full px-6 py-2 h-10 shadow text-sm resize-none overflow-hidden focus:outline-none"
        row={1}
        value={value}
        maxLength={120}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        autoFocus
      />
      <input
        type="submit"
        value="Post"
        className="mx-2 bg-transparent text-highlightText font-bold mr-3 cursor-pointer outline-none"
      />
    </form>
  );
}
