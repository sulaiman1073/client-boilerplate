import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ChannelDescription from "../components/Channel/ChannelDescription";
import {
  followChannel,
  unfollowChannel,
  openListModal,
  openProfileModal
} from "../redux/actions";

export default function NewChannelPostContainer({
  channelId,
  isMember,
  isOwner,
  status
}) {
  const channel = useSelector(state => state.channels[channelId]);
  const { defaultIcon } = useSelector(state => state.general);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followChannel(channelId));
  };

  const handleUnfollow = () => {
    dispatch(unfollowChannel(channelId));
  };

  const handleListAdmins = () => {
    dispatch(openListModal(channelId, "admins"));
  };

  const handleOpenProfileModal = id => {
    dispatch(openProfileModal(id));
  };

  return (
    <ChannelDescription
      id={channel.id}
      name={channel.name}
      icon={channel.icon || defaultIcon}
      description={channel.description}
      adminIds={channel.admins}
      status={status}
      handleFollow={handleFollow}
      handleUnfollow={handleUnfollow}
      handleListAdmins={handleListAdmins}
      openProfileModal={handleOpenProfileModal}
      isMember={isMember}
      isOwner={isOwner}
    />
  );
}
