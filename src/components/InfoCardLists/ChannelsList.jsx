import React from "react";
import RoomIcon from "../Controls/RoomIcon";
import InfoCard from "../InfoCards/InfoCard";
import InfoCardList from "./InfoCardList";
import strings from "../../helpers/localization";

export default function ChannelsList({
  channels,
  selected,
  handleSelect,
  emptyMessage,
  isLoading,
  ...rest
}) {
  const itemRenderer = channel => {
    const roomIcon = (
      <RoomIcon
        ids={[channel.id]}
        images={[channel.icon]}
        watching={channel.watching}
        size="md"
      />
    );

    return (
      <>
        {isLoading ? (
          <InfoCard isLoading={isLoading} />
        ) : (
          <InfoCard
            avatar={roomIcon}
            title={channel.name}
            subtitle={`${channel?.viewers?.length || 0} ${strings.online}`}
            subtitleSize="xs"
            backgroundColor={
              selected === channel.id ? "highlight" : "transparent"
            }
            cardClick={() => handleSelect(channel.id)}
          />
        )}
      </>
    );
  };

  return (
    <InfoCardList
      items={channels}
      itemRenderer={itemRenderer}
      emptyMessage={emptyMessage}
      {...rest}
    />
  );
}
