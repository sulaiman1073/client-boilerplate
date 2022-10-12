import React from "react";
import { useDispatch } from "react-redux";
import CommentSection from "../components/Channel/CommentSection";
import { getComments, addComment } from "../redux/actions";

export default function CommentSectionContainer({
  postId,
  firstCommentId,
  commentIds,
  isMember,
  showNewComment
}) {
  const dispatch = useDispatch();

  const handleGetComments = commentInfo => {
    dispatch(getComments(commentInfo));
  };

  const handleSendComment = (text, postId) => {
    if (text && text.length > 0) {
      dispatch(addComment({ postId, content: text }));
    }
  };

  return (
    <CommentSection
      postId={postId}
      firstCommentId={firstCommentId}
      commentIds={commentIds}
      handleGetComments={handleGetComments}
      sendComment={handleSendComment}
      isMember={isMember}
      showNewComment={showNewComment}
    />
  );
}
