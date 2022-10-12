import { useEffect, useState } from "react";

export default function useScrollDivOnLoad(channel, channelMessages) {
  const [hasMoreBottom, setHasMoreBottom] = useState(false);
  // TODO: Currently last message in state is checked if it has the ID of what server knows to be the last message
  // and checks if it is not pending or rejected, because if it is not checked server doesnt know the actual last message,
  // and chat keeps trying to get the last message.

  // There is a minor problem with this implementation. If you scroll to middle of chat, the latest messages
  // are erased from state and you try to load them back AND the last message in state just happens to be
  // rejected or pending, you will not receive the new messages.
  // But rejected and pending messages are deleted on client reload, so I wouldn't expect them to be that far in the state.
  // If it is ever necessary to fix this, we need a function that would recursivelly find the last accepted message and compare its ID
  // to what server knows is the last message.
  const conditions = {
    messageIsLastById:
      channel?.lastMessageId &&
      channel?.lastMessageId !==
        channelMessages[channelMessages.length - 1]?.id,
    lastMessageIsPendingOrRejected:
      channelMessages[channelMessages.length - 1]?.status === "pending" ||
      channelMessages[channelMessages.length - 1]?.status === "rejected"
  };
  useEffect(() => {
    if (
      conditions.messageIsLastById &&
      !conditions.lastMessageIsPendingOrRejected
    ) {
      setHasMoreBottom(true);
    } else {
      setHasMoreBottom(false);
    }
  }, [
    channel,
    channelMessages,
    conditions.lastMessageIsPendingOrRejected,
    conditions.messageIsLastById
  ]);
  return hasMoreBottom;
}
