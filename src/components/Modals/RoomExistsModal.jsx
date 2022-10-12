import React from "react";
import RoomInfoCard from "../InfoCards/RoomInfoCard";
import Button from "../Controls/Button";

export default function RoomExistsModal({
  room,
  openRoomHandler,
  createNewHandler
}) {
  return (
    <div className="flex flex-col items-center p-4">
      <p className="font-bold text-primaryText">This room already exists</p>
      <p className="text-xs py-1 text-secondaryText">
        Click below to enter the existing room
      </p>
      <div className="w-full py-4">
        <RoomInfoCard
          room={room}
          handleSelect={openRoomHandler}
          addBorder={true}
        />
      </div>
      <Button
        actionButton
        onClick={createNewHandler}
        analyticsString="Create New Room Button: RoomExistsModal"
      >
        Create New
      </Button>
    </div>
  );
}
