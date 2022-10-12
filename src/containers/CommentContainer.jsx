import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeComment, unlikeComment, openProfileModal } from "../redux/actions";
import Comment from "../components/Channel/Comment";

export default function CommentContainer({ commentId }) {
  const { defaultAvatar } = useSelector(state => state.general);
  const comment = useSelector(state => state.comments[commentId]);
  const dispatch = useDispatch();

  const handleToggleLike = (id, liked) => {
    if (liked) {
      dispatch(unlikeComment({ commentId: id }));
    } else {
      dispatch(likeComment({ commentId: id }));
    }
  };

  const handleOpenProfileModal = id => {
    dispatch(openProfileModal(id));
  };

  return (
    <Comment
      id={comment.id}
      username={comment.author.username}
      avatar={comment.author.avatar || defaultAvatar}
      authorId={comment.author.id}
      createdAt={comment.createdAt}
      content={comment.content}
      liked={comment.liked}
      likeCount={comment.likeCount}
      toggleLike={handleToggleLike}
      openProfileModal={handleOpenProfileModal}
    />
  );
}
