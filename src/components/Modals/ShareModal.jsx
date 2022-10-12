import React from "react";
import VideoCard from "../ThumbnailCards/VideoCard";
import Button from "../Controls/Button";
import CircleCheckBox from "../Controls/CircleCheckbox";
import RoomsList from "../InfoCardLists/RoomsList";
import StretchList from "../InfoCardLists/StretchList";

export default function ShareModal({
  rooms,
  selected,
  onCheck,
  handleSend,
  ...rest
}) {
  const getCheckbox = room => {
    return (
      <div className="ml-auto">
        <CircleCheckBox
          checked={selected.findIndex(r => r.id === room.id) >= 0}
          onChange={() => onCheck(room.id, room.name)}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-stretch w-full h-full pt-4 relative">
      <div className="pb-4 flex justify-center shadow-search z-10">
        <VideoCard {...rest} />
      </div>
      <StretchList list={RoomsList} rooms={rooms} getControls={getCheckbox} />
      <Button
        actionButton
        onClick={() => handleSend(selected)}
        analyticsString="Share Button: ShareModal"
        className="absolute bottom-0 self-center mb-4"
      >
        Send
      </Button>
    </div>
  );
}
