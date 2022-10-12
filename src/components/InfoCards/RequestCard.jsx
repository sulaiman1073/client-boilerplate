import React from "react";
import ImageInfoCard from "./ImageInfoCard";
import FriendRequestButtons from "../Controls/FriendRequestButtons";

export default function RequestCard({ user, handleProfile }) {
  const buttons = <FriendRequestButtons user={user} size="sm" />;

  return (
    <ImageInfoCard
      avatar={user.avatar}
      username={user.username}
      controls={buttons}
      title={user.username}
      subtitle={`${user.firstName} ${user.lastName}`}
      subtitleColor="gray"
      backgroundColor="gray"
      padding="none"
      cardClick={() => handleProfile(user.id)}
    />
  );
}
