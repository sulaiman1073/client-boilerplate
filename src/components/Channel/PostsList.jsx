import React from "react";
import PostContainer from "../../containers/PostContainer";
import strings from "../../helpers/localization";

export default function PostsList({ postIds, isMember, isAdmin }) {
  return (
    <div className="flex flex-col h-auto">
      {postIds.map(postId => (
        <PostContainer
          key={postId}
          postId={postId}
          isMember={isMember}
          isAdmin={isAdmin}
        />
      ))}
      {postIds.length === 0 && (
        <p className="text-secondaryText text-center text-sm py-32">
          {strings.channelWelcomePost}
        </p>
      )}
    </div>
  );
}
