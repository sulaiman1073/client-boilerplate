import React, { useState } from "react";
import MessageAuthorAvatar from "./MessageAuthorAvatar";
import MessageCreatedTime from "./MessageCreatedTime";
import MessageAuthorUsername from "./MessageAuthorUsername";
import MessageContent from "./MessageContent";
import MessageHighlightSpan from "./MessageHighlightSpan";
import ChatOptionsButton from "./ChatOptionsButton";
import DateMessage from "./DateMessage";

export default function ChatMessage({
  message,
  ownId,
  defaultAvatar,
  clickedMessage,
  updateClickedMessage
}) {
  const [isHover, setHover] = useState(false);

  const messageComponent = (
    <div
      role="button"
      onClick={() => updateClickedMessage(message.id)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      className="flex bg-primaryBackground hover:bg-secondaryBackground rounded-md cursor-text flex-wrap"
      key={message.id}
    >
      <MessageHighlightSpan
        status={message.status}
        ownId={ownId}
        userId={message.userId}
      />
      <div className="w-68 pl-2">
        <MessageContent message={message} />
      </div>
      <ChatOptionsButton ownId={ownId} message={message} hover={isHover} />
    </div>
  );

  if (message.type === "date") return <DateMessage message={message} />;
  else if (
    message.type === "firstMessage" ||
    message.type === "firstLastMessage"
  ) {
    return (
      // Unfused message
      <div key={message.id} className="flex-col mt-6">
        <div className="flex items-center">
          <div className="flex h-12">
            <MessageHighlightSpan
              status={message.status}
              ownId={ownId}
              userId={message.userId}
            />
          </div>
          <div className="flex items-center space-x-2 cursor-pointer select-none pb-1 text-xs cursor-text">
            <div className="flex transition transform text-xs ease-in-out hover:scale-105 duration-100 items-center space-x-2 cursor-pointer">
              <MessageAuthorAvatar
                defaultAvatar={defaultAvatar}
                message={message}
              />
              <MessageAuthorUsername
                userId={message.userId}
                username={message.username}
              />
            </div>
            <MessageCreatedTime createdAt={message.createdAt} />
          </div>
        </div>
        {clickedMessage === message.id ? (
          <div
            className="flex items-center justify-center text-xs select-none py-1"
            onClick={() => updateClickedMessage(message.id)}
            role="button"
          >
            <div className="items-center justify-center bg-secondaryBackground px-2 py-1 rounded-md transition transform ease-in-out hover:scale-105 duration-100">
              <MessageCreatedTime createdAt={message.createdAt} />
            </div>
          </div>
        ) : null}
        {messageComponent}
      </div>
    );
  } else if (message.type === "message" || message.type === "lastMessage") {
    return (
      // Fused Message
      <React.Fragment>
        {clickedMessage === message.id ? (
          <div
            className="flex items-center justify-center text-xs select-none py-1"
            onClick={() => updateClickedMessage(message.id)}
            role="button"
          >
            <div className="items-center justify-center bg-secondaryBackground px-2 py-1 rounded-md transition transform ease-in-out hover:scale-105 duration-100">
              <MessageCreatedTime createdAt={message.createdAt} />
            </div>
          </div>
        ) : null}
        {messageComponent}
      </React.Fragment>
    );
  }
}
