import React from "react";
import VideoCard from "../ThumbnailCards/VideoCard";
import Button from "../Controls/Button";
import RoomsList from "../InfoCardLists/RoomsList";
import StretchList from "../InfoCardLists/StretchList";

export default function WatchModal({ rooms, handleWatchNow, ...rest }) {
  const getButton = room => {
    return (
      <Button
        actionButton
        size="sm"
        onClick={() => handleWatchNow(room.id)}
        analyticsString="Watch Now Button: WatchModal"
        className="ml-auto"
      >
        Watch Now
      </Button>
    );
  };

  return (
    <div className="flex flex-col items-stretch w-full h-full">
      <div className="py-4 flex justify-center shadow-search z-10">
        <VideoCard {...rest} />
      </div>
      <StretchList list={RoomsList} rooms={rooms} getControls={getButton} />
    </div>
  );
}
