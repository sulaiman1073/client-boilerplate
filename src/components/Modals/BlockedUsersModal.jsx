import React from "react";
import FollowersList from "../InfoCardLists/FollowersList";
import Button from "../Controls/Button";
import StretchList from "../InfoCardLists/StretchList";

export default function BlockedUsersModal({ users, handleUnblock }) {
  const getButton = user => {
    return (
      <Button
        actionButton
        size="sm"
        onClick={() => handleUnblock(user.id)}
        className="ml-auto"
        analyticsString="Unblock Button: BlockUsersModal"
      >
        Unblock
      </Button>
    );
  };

  return (
    <div className="flex flex-col items-stretch w-full h-full pt-1">
      <StretchList list={FollowersList} users={users} getControls={getButton} />
    </div>
  );
}
