import React from "react";
import PostsListContainer from "../PostsListContainer";
import NewChannelPostContainer from "../NewChannelPostContainer";
import ChannelDescriptionContainer from "../ChannelDescriptionContainer";

const ForumPanel = ({ channelId, isMember, isAdmin, isOwner, status }, ref) => {
  return (
    <div
      ref={ref}
      className="px-2 py-32 sm:px-8 md:px-16 lg:px-32 bg-secondaryBackground justify-center"
    >
      <ChannelDescriptionContainer
        channelId={channelId}
        isMember={isMember}
        isOwner={isOwner}
        status={status}
      />
      {isAdmin && <NewChannelPostContainer channelId={channelId} />}
      <PostsListContainer
        channelId={channelId}
        isMember={isMember}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default React.forwardRef(ForumPanel);
