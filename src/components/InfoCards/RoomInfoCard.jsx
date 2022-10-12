import React from "react";
import RoomIcon from "../Controls/RoomIcon";
import InfoCard from "../InfoCards/InfoCard";
import moment from "moment";
import "moment/locale/ko";
import "moment/locale/ru";
import strings from "../../helpers/localization";
import { channelHasNewMessage } from "../../util/channelHasNewMessage";

export default function RoomInfoCard({
  room,
  selected,
  controls,
  handleSelect,
  addBorder,
  isLoading
}) {
  // Selects avatars of room members
  const images = room.members.map(m => m.avatar);
  // Gives room a name by combining member usernames
  const name = room.members.map(m => " " + m.username).join();
  let subtitleAndDate = "";
  try {
    JSON.parse(room.lastMessageContent);
    if (room.lastMessageContent.includes("/200.gif")) {
      subtitleAndDate =
        moment(room.lastMessageAt).locale(strings.location).fromNow() +
        " · GIF";
    } else if (room.lastMessageContent) {
      subtitleAndDate =
        moment(room.lastMessageAt).locale(strings.location).fromNow() +
        " · " +
        room.lastMessageContent;
    } else {
      subtitleAndDate = "";
    }
  } catch {
    subtitleAndDate =
      room.lastMessageContent &&
      moment(room.lastMessageAt).locale(strings.location).fromNow() +
        " · " +
        room.lastMessageContent;
  }

  const roomIcon = (
    <RoomIcon
      images={images}
      self={room.type === "self"}
      online={room.online}
      watching={room.watching}
      notifications={room.notifications}
      size="lg"
      isLoading={isLoading}
    />
  );
  const doesChannelHasNewMessage = channelHasNewMessage(room);
  return (
    <InfoCard
      avatar={roomIcon}
      controls={controls}
      title={name}
      subtitle={subtitleAndDate}
      subtitleColor={doesChannelHasNewMessage ? "black" : "gray"}
      boldFont={doesChannelHasNewMessage}
      badge={doesChannelHasNewMessage}
      addBorder={addBorder}
      backgroundColor={selected === room.id ? "highlight" : "white"}
      padding="xs"
      cardClick={handleSelect ? () => handleSelect(room.id) : null}
      isLoading={isLoading}
    />
  );
}
