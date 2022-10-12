import React from "react";
import InfoCardList from "./InfoCardList";
import RoomInfoCard from "../InfoCards/RoomInfoCard";

export default function RoomsList({
  rooms,
  getControls,
  selected,
  handleSelect,
  isLoading,
  ...rest
}) {
  const itemRenderer = room => {
    return (
      <RoomInfoCard
        room={room}
        controls={getControls ? getControls(room) : null}
        selected={selected}
        handleSelect={handleSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <InfoCardList
      items={rooms}
      itemRenderer={itemRenderer}
      itemSize={70}
      {...rest}
    />
  );
}
