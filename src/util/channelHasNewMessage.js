// Taskes a channel or a room
export function channelHasNewMessage(channel) {
  if (
    (channel.type === "friend" || channel.type === "group") &&
    (channel.chatNotifications || channel.lastMessageIsNew)
  )
    return true;
  else return false;
}
