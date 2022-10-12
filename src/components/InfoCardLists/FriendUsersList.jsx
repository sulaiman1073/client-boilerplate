import React from "react";
import InfoCardList from "./InfoCardList";
import RequestCard from "../InfoCards/RequestCard";

export default function FriendUsersList({ users, handleProfile, ...rest }) {
  const itemRenderer = u => {
    return <RequestCard user={u} handleProfile={handleProfile} />;
  };
  return (
    <InfoCardList
      items={users}
      itemRenderer={itemRenderer}
      itemSize={60}
      {...rest}
    />
  );
}
