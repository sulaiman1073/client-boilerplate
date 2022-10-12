import React from "react";
import { useSelector } from "react-redux";
import PostsList from "../components/Channel/PostsList";

export default function PostsListContainer({ channelId, isMember, isAdmin }) {
  const postIds = useSelector(state => state.channels[channelId].posts);

  return <PostsList postIds={postIds} isMember={isMember} isAdmin={isAdmin} />;
}
