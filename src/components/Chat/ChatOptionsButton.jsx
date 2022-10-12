import React from "react";
import PopupMenu from "../Controls/PopupMenu";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, openDeleteMessageModal } from "../../redux/actions";
import { v4 as uuidv4 } from "uuid";

function ChatOptionsButton2({ message, channel, ownId, match, hover }) {
  const dispatch = useDispatch();
  const currentUserUsername = useSelector(state => state.self.username);
  const apiLoading = useSelector(state => state.api.addMessage.loading);
  const userId = useSelector(state => state.self.id);
  const avatar = useSelector(state => state.self.avatar);
  const channelId = match.params.roomId || match.params.channelId;
  const handleSend = text => {
    if (text && text.length > 0 && !apiLoading) {
      dispatch(
        addMessage({
          id: uuidv4(),
          userId,
          channelId,
          content: text,
          upload: null,
          createdAt: new Date().toString(),
          author: {
            id: "",
            username: currentUserUsername,
            avatar: avatar
          }
        })
      );
    }
  };

  const conditions = {
    isMyMessage: message.userId === ownId,
    isAdminOfChannel:
      channel?.type === "channel" && channel.admins?.includes(ownId),
    messageAccepted:
      message?.status === undefined ||
      message?.status?.toLowerCase() === "accepted",
    messageRejected: message?.status?.toLowerCase() === "rejected",
    messagePending: message?.status?.toLowerCase() === "pending"
  };
  // Function that generates options of the pop up depending if message is rejected/accepted
  function getOptions() {
    const options = [];
    if (conditions.messageAccepted || conditions.messageRejected) {
      options.push({
        name: "Delete",
        handler: () =>
          dispatch(
            openDeleteMessageModal({
              channelId,
              messageId: message.id
            })
          ),
        danger: false
      });
    }
    if (conditions.messageRejected) {
      options.push({
        name: "Resend",
        handler: () => handleSend(message.content),
        danger: false
      });
    }
    return options;
  }
  // deletedMessageId === message.id && deletedMessageApiLoading
  // Returns the button only ((if you are the admin of the channel OR it is your own message) AND the message is not pending) OR the message is rejected.
  // Doesn't test if you sent the rejected message, can't think of a posibility where you could see other peoples rejected messages.
  // There is no ID generated if the message is rejected.
  return (
    <>
      {((conditions.isMyMessage || conditions.isAdminOfChannel) &&
        !conditions.messagePending) ||
      conditions.messageRejected ? (
        <div
          className={`flex transition-opacity duration-100 w-4 px-0 space-x-2 self-center mx-2 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        >
          <PopupMenu
            options={getOptions()}
            type="message"
            messageId={message.id}
            disabled={false}
          />
        </div>
      ) : null}
    </>
  );
}

export default withRouter(ChatOptionsButton2);
