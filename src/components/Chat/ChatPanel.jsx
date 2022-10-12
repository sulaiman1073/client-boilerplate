import React from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatActions from "./ChatActions";
import GifTable from "./GifTable";
import strings from "../../helpers/localization";

export default function ChatPanel({
  channelId,
  channelMessages,
  openFollowersList,
  followersCount,
  isRoom,
  isGifsOpen,
  updateGifsOpen,
  isMember
}) {
  return (
    <div className="w-84 h-full bg-primaryBackground flex flex-col">
      <ChatHeader
        channelId={channelId}
        openFollowersList={openFollowersList}
        followersCount={followersCount}
        isRoom={isRoom}
      />
      {channelMessages ? (
        <ChatMessages
          channelId={channelId}
          channelMessages={channelMessages}
          isGifsOpen={isGifsOpen}
        />
      ) : (
        <p className="flex w-full h-full text-secondaryText text-xs items-center justify-center">
          This is the start of the chat!
        </p>
      )}
      {isGifsOpen ? <GifTable updateGifsOpen={updateGifsOpen} /> : null}
      {isMember ? (
        <ChatActions updateGifsOpen={updateGifsOpen} isGifsOpen={isGifsOpen} />
      ) : (
        <div className="h-18 w-full flex bg-secondaryBackground text-sm text-secondaryText items-center justify-center cursor-not-allowed select-none">
          <h1>{strings.chatDisabledText}</h1>
        </div>
      )}
    </div>
  );
}
