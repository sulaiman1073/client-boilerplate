import React, { useState } from "react";
import CommentContainer from "../../containers/CommentContainer";
import NewChannelComment from "./NewChannelComment";
import Button from "../Controls/Button";

export default function CommentSection({
  postId,
  firstCommentId,
  commentIds,
  handleGetComments,
  sendComment,
  isMember,
  showNewComment
}) {
  const commentPageSize = 3;
  const [numOfShownComments, setNumOfShownComments] = useState(commentPageSize);

  const showButton =
    commentIds.length > 3 ||
    (commentIds.length === 3 && firstCommentId !== commentIds[0]);

  const hasMoreComments =
    firstCommentId !== commentIds.slice(-1 * numOfShownComments)[0];

  const handleViewMoreComments = () => {
    if (firstCommentId !== commentIds[0]) {
      handleGetComments({
        postId: postId,
        beforeCommentId: commentIds[0]
      });
      setNumOfShownComments(numOfShownComments * 2);
    } else {
      setNumOfShownComments(0);
    }
  };

  const handleHideComments = () => {
    setNumOfShownComments(commentPageSize);
  };

  return (
    <div className="my-2 px-1 w-84 sm:w-102 lg:w-104 max-w-xl">
      {showButton && (
        <Button
          styleNone
          styleNoneContent={
            hasMoreComments ? "View more comments" : "Hide comments"
          }
          className="text-secondaryText text-xs px-2"
          onClick={
            hasMoreComments ? handleViewMoreComments : handleHideComments
          }
          analyticsString={
            hasMoreComments
              ? "View more comments Button: ChannelPost"
              : "Hide comments Button: ChannelPost"
          }
        />
      )}
      {commentIds.slice(-numOfShownComments).map(commentId => (
        <CommentContainer commentId={commentId} key={commentId} />
      ))}
      {showNewComment && (
        <NewChannelComment postId={postId} sendComment={sendComment} />
      )}
    </div>
  );
}
