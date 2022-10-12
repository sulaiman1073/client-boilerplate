import React, { useState, useRef } from "react";
import AvatarIcon from "../Controls/AvatarIcon";
import CommentSectionContainer from "../../containers/CommentSectionContainer";
import ToggleIcon from "../Controls/ToggleIcon";
import useOnClickOutside from "use-onclickoutside";
import PopupMenu from "../Controls/PopupMenu";
import Button from "../Controls/Button";
import strings from "../../helpers/localization";
import { formatDistanceToNow } from "../../helpers/datefns";

export default function Post({
  id,
  content,
  upload,
  createdAt,
  authorId,
  username,
  avatar,
  liked,
  likeCount,
  commentCount,
  selfCommentCount,
  firstCommentId,
  commentIds,
  toggleLike,
  openDeletePostModal,
  isLoading = false,
  isMember,
  isAdmin,
  openProfileModal,
  ownId
}) {
  const maxSelfCommentCount = 5;
  const [showNewComment, setShowNewComment] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const timeAgo = formatDistanceToNow(new Date(createdAt));

  const canComment =
    isAdmin || (isMember && selfCommentCount < maxSelfCommentCount);

  const handleComment = () => {
    if (canComment) setShowNewComment(!showNewComment);
  };

  useOnClickOutside(menuRef, () => {
    if (showMenu) {
      setShowMenu(false);
    }
  });

  if (isLoading) {
    return (
      <div className="bg-primaryBackground rounded-md p-4 my-8 max-w-md h-48 w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12" />
          <div className="flex-1 space-y-4 py-1">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col rounded-lg px-8 pt-4 mt-8 bg-primaryBackground shadow-sm hover:shadow-md cursor-pointer w-84 sm:w-102 lg:w-104">
        <div className="flex justify-between items-start w-full">
          <header
            className="flex items-center w-full space-x-2"
            onClick={() => openProfileModal(authorId)}
            role="button"
          >
            <AvatarIcon
              avatar={avatar}
              username={username}
              className="img w-10 h-10 rounded-circle transition transform ease-in-out hover:scale-110 duration-100"
            />
            <div className="flex flex-col w-84">
              <span className="truncate">{username}</span>
              <span className="text-secondaryText text-xs">{timeAgo}</span>
            </div>
          </header>
          {(isAdmin || authorId === ownId) && (
            <PopupMenu
              options={[
                {
                  name: "Delete",
                  handler: () => openDeletePostModal(id)
                }
              ]}
              disabled={ownId !== authorId}
              className="-mr-3"
            />
          )}
        </div>
        <div
          className="text-primaryText text-lg py-4 px-2 break-words"
          onClick={handleComment}
          role="button"
        >
          {content}
        </div>
        {/* 0 Likes 0 Comments */}
        <section
          className="flex justify-start text-xs py-1 space-x-2 text-secondaryText"
          onClick={handleComment}
          role="button"
        >
          <span className="select-none hover:filter-brightness-9 duration-100">
            {likeCount} {likeCount > 1 ? strings.likes : strings.like}
          </span>
          <span className="select-none hover:filter-brightness-9 duration-100">
            {commentCount}{" "}
            {commentCount > 1 ? strings.comments : strings.comment}
          </span>
        </section>
        {/* Like and Comment buttons */}
        {isMember && (
          <footer className="flex text-secondaryText text-xl space-x-6 pb-2 items-center">
            <ToggleIcon
              icons={{ default: ["far", "heart"], toggle: ["fa", "heart"] }}
              status={liked}
              toggleStatus={stat => toggleLike(id, stat)}
              className="bg-highlightBackground"
            >
              {strings.like}
            </ToggleIcon>
            {canComment && (
              <Button
                styleNone
                icon={["far", "comment"]}
                styleNoneContent={strings.comment}
                styleNoneContentClassName="text-sm font-bold ml-2"
                className="flex p-2 hover:filter-brightness-9"
                onClick={handleComment}
                analyticsString="Comment Button: ChannelPost"
              />
            )}
          </footer>
        )}
      </div>
      {/* Comment Section */}
      <CommentSectionContainer
        postId={id}
        firstCommentId={firstCommentId}
        commentIds={commentIds}
        commentCount={commentCount}
        isMember={isMember}
        showNewComment={showNewComment}
      />
    </div>
  );
}
