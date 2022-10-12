import React from "react";
// import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Channel/Post";
import {
  likePost,
  unlikePost,
  openDeletePostModal,
  openProfileModal
} from "../redux/actions";

export default function PostContainer({ postId, isMember, isAdmin }) {
  const post = useSelector(state => state.posts[postId]);
  const { defaultAvatar } = useSelector(state => state.general);
  const { id: ownId } = useSelector(state => state.self);

  const dispatch = useDispatch();

  const handleToggleLike = (id, liked) => {
    if (liked) {
      dispatch(unlikePost({ postId: id }));
    } else {
      dispatch(likePost({ postId: id }));
    }
  };

  const handleOpenDeletePostModal = postId => {
    dispatch(openDeletePostModal(postId));
  };

  const handleOpenProfileModal = userId => {
    dispatch(openProfileModal(userId));
  };

  return (
    <Post
      id={post.id}
      content={post.content}
      upload={post.upload}
      createdAt={post.createdAt}
      authorId={post.author.id}
      username={post.author.username}
      avatar={post.author.avatar || defaultAvatar}
      liked={post.liked}
      likeCount={post.likeCount}
      commentCount={post.commentCount}
      selfCommentCount={post.commentCount}
      firstCommentId={post.firstCommentId}
      commentIds={post.comments}
      toggleLike={handleToggleLike}
      openDeletePostModal={handleOpenDeletePostModal}
      isLoading={false}
      isMember={isMember}
      isAdmin={isAdmin}
      openProfileModal={handleOpenProfileModal}
      ownId={ownId}
    />
  );
}
