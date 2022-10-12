import dateFormatter from "./dateFormatter";

// Receives messages from Redux state
const messagesFormatter2 = messages => {
  const newMessages = [];

  const isFirstMessage = (msg, index) => {
    const idx = index - 1;
    if (!messages[idx]) return true;
    if (msg.userId !== messages[idx].userId) return true;
    if (
      new Date(msg.createdAt).getDate() !==
      new Date(messages[idx].createdAt).getDate()
    )
      return true;
    return false;
  };

  const isLastMessage = (msg, index) => {
    const idx = index + 1;
    if (!messages[idx]) return true;
    if (msg.userId !== messages[idx].userId) return true;
    if (
      new Date(msg.createdAt).getDate() !==
      new Date(messages[idx].createdAt).getDate()
    )
      return true;
    return false;
  };

  const getMessageType = (msg, index) => {
    let type;
    const first = isFirstMessage(msg, index);
    const last = isLastMessage(msg, index);

    if (first && last) type = "firstLastMessage";
    else if (first) type = "firstMessage";
    else if (last) type = "lastMessage";
    else type = "message";

    return type;
  };

  const addMessageToNewMessages = (message, index) => {
    newMessages.push({
      status: message.status,
      type: getMessageType(message, index),
      id: message.id,
      userId: message.userId,
      content: message.content,
      upload: message.upload,
      username: message.author.username,
      avatar: message.author.avatar,
      createdAt: dateFormatter(new Date(message.createdAt))
    });
  };

  messages.forEach((message, index) => {
    // If newMessages array is empty, an additional date message is added.
    if (newMessages.length === 0) {
      newMessages.push({
        type: "date",
        id: message.createdAt,
        date: dateFormatter(new Date(message.createdAt), true)
      });

      addMessageToNewMessages(message, index);
      // If when the message was created is not equal to the DAY, the previous message was created, then an additional
      // date message is added.
    } else if (
      new Date(message.createdAt).getDate() !==
      new Date(messages[index - 1].createdAt).getDate()
    ) {
      newMessages.push({
        type: "date",
        id: message.createdAt,
        date: dateFormatter(new Date(message.createdAt), true)
      });

      addMessageToNewMessages(message, index);
    } else {
      // Otherwise the messages are just added.
      addMessageToNewMessages(message, index);
    }
  });

  return newMessages;
};

export default messagesFormatter2;
