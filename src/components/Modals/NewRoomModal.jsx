import React from "react";
import FollowersList from "../InfoCardLists/FollowersList";
import CircleCheckBox from "../Controls/CircleCheckbox";
import Button from "../Controls/Button";
import StretchList from "../InfoCardLists/StretchList";

export default function NewRoomModal({
  users,
  selected,
  onCheck,
  handleSend,
  isCreatingNewRoom
}) {
  const getControls = user => {
    return (
      <div className="ml-auto">
        <CircleCheckBox
          checked={selected.findIndex(u => u.id === user.id) >= 0}
          onChange={() => onCheck(user.id, user.username)}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-stretch w-full h-full relative cursor-pointer">
      <StretchList
        list={FollowersList}
        users={users}
        getControls={getControls}
      />
      <Button
        actionButton
        onClick={() => handleSend(selected)}
        analyticsString="Send New Room Invitation Button: NewRoomModal"
        className="absolute bottom-0 self-center mb-4"
        disabled={
          isCreatingNewRoom ? selected.length < 2 : selected.length === 0
        }
      >
        Send
      </Button>
    </div>
  );
}
