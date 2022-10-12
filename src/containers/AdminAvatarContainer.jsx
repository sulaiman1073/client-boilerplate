import React from "react";
import { useSelector } from "react-redux";
import AvatarIcon from "../components/Controls/AvatarIcon";

export default function AdminAvatarContainer({ adminId, className }) {
  const { defaultAvatar } = useSelector(state => state.general);
  const admin = useSelector(state => state.users[adminId]);

  return (
    <AvatarIcon
      avatar={admin.avatar || defaultAvatar}
      username={admin.username}
      className={className}
    />
  );
}
