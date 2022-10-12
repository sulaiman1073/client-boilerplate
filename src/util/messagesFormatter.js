import groupBy from "lodash/groupBy";
import dateFormatter from "./dateFormatter";

const messagesFormatter = messages => {
  const messagesByDate = groupBy(messages, x =>
    dateFormatter(new Date(x.createdAt), true)
  );

  const newMessages = {};

  Object.entries(messagesByDate).forEach(([date, msg]) => {
    if (!newMessages[date]) newMessages[date] = [];

    msg.forEach(userMessage => {
      if (newMessages[date].length === 0) {
        newMessages[date].push({
          id: userMessage.id,
          userId: userMessage.userId,
          username: userMessage.author.username,
          avatar: userMessage.author.avatar,
          createdAt: dateFormatter(new Date(userMessage.createdAt)),
          messages: [
            {
              id: userMessage.id,
              ...(userMessage.content && { content: userMessage.content }),
              ...(userMessage.upload && { upload: userMessage.upload })
            }
          ]
        });
      } else {
        if (
          newMessages[date][newMessages[date].length - 1].userId ===
          userMessage.userId
        ) {
          newMessages[date][newMessages[date].length - 1].messages.push({
            id: userMessage.id,
            ...(userMessage.content && { content: userMessage.content }),
            ...(userMessage.upload && { upload: userMessage.upload })
          });
        } else {
          newMessages[date].push({
            id: userMessage.id,
            userId: userMessage.userId,
            username: userMessage.author.username,
            avatar: userMessage.author.avatar,
            createdAt: dateFormatter(new Date(userMessage.createdAt)),
            messages: [
              {
                id: userMessage.id,
                ...(userMessage.content && { content: userMessage.content }),
                ...(userMessage.upload && { upload: userMessage.upload })
              }
            ]
          });
        }
      }
    });
  });

  return newMessages;
};

export default messagesFormatter;
