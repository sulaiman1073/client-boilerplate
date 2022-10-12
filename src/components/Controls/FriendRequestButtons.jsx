import React, { useEffect } from "react";
import Button from "./Button";
import strings from "../../helpers/localization";
import ReactTooltip from "react-tooltip";

export default function FriendRequestButtons({
  user,
  size = "md",
  tooltipPlace = "left"
}) {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);
  // variants: self, friend, stranger, receivedRequest, sentRequest, blocked
  if (user.variant === "blocked") {
    return <></>;
  }

  const sentRequest = user.variant === "sentRequest";
  const addButton =
    user.variant === "friend" || user.variant === "self" ? (
      <></>
    ) : (
      <Button
        actionButton
        size={size}
        icon={sentRequest ? "paper-plane" : "user-plus"}
        background={sentRequest && "bgColor"}
        // disabled={sentRequest}
        className={sentRequest ? "ml-auto shadow-none" : "ml-auto"}
        onClick={e => {
          e.stopPropagation();
          user.handleAccept();
        }}
        analyticsString="Friend Rq Button: FriendRequestButtons"
        tooltip={
          sentRequest ? strings.requestSentButton : strings.addFriendsButton
        }
        tooltipPlace={tooltipPlace}
      />
    );

  const rejectButton =
    user.variant === "receivedRequest" || sentRequest ? (
      <Button
        actionButton
        size={size}
        icon="times"
        background="cancel"
        className="ml-2"
        onClick={e => {
          e.stopPropagation();
          user.handleReject();
        }}
        analyticsString="Canel Friend Rq Button:FriendRequestButtons"
        tooltip={strings.cancelButton}
      />
    ) : (
      <></>
    );

  return (
    <>
      {addButton}
      {rejectButton}
    </>
  );
}
