import React from "react";
import InfoCard from "./InfoCard";
import AvatarIcon from "../Controls/AvatarIcon";

export default function ImageInfoCard({
  avatar,
  username,
  imageClick,
  ...rest
}) {
  const image = (
    <AvatarIcon
      avatar={avatar}
      username={username}
      imageClick={imageClick}
      className="img w-10 h-10 rounded-circle"
    />
  );

  return <InfoCard avatar={image} {...rest} />;
}
