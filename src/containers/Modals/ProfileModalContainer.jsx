import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserInfoModal,
  deleteFriend,
  blockUser,
  unblockUser,
  updateUser,
  clearError
} from "../../redux/actions";
import ModalContainer from "../../components/Modals/ModalContainer";
import ProfileModal from "../../components/Modals/ProfileModal";
import { setRelationshipHandlers } from "../../helpers/functions";

export default function ProfileModalContainer({ handleModalClose }) {
  const { userId } = useSelector(state => state.modal);
  const { id: myId, channelIds } = useSelector(state => state.self);

  const {
    idModal: id,
    firstNameModal: firstName,
    lastNameModal: lastName,
    usernameModal: username,
    avatarModal: avatar
  } = useSelector(state => state.userProfile);
  const { defaultAvatar } = useSelector(state => state.general);
  const relationships = useSelector(state => state.relationships);
  const updateUserApi = useSelector(state => state.api.userUpdateApi);
  const channels = useSelector(state => state.channels);

  let followingChannelsCount = 0;
  channelIds
    .map(channelId => ({
      id: channelId,
      ownerId: channels[channelId].ownerId || channels[channelId].owner_id,
      members: channels[channelId].members
    }))
    .forEach(channel => {
      if (channel.ownerId !== myId && channel.members) {
        if (channel.members.includes(myId)) {
          followingChannelsCount += 1;
        }
      }
    });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoModal(userId));
  }, [dispatch, userId]);
  const updateAvatar = avatar => dispatch(updateUser({ avatar }));

  let plainUser = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    username: username,
    avatar: avatar
  };
  const user = setRelationshipHandlers(
    plainUser,
    relationships,
    dispatch,
    id !== myId ? defaultAvatar : null,
    myId
  );

  let blockHandler =
    user.variant === "blocked"
      ? () => dispatch(unblockUser(userId))
      : () => dispatch(blockUser(plainUser));

  const closeModalAndClearError = () => {
    handleModalClose();
    dispatch(clearError());
  };

  return (
    <ModalContainer isOpen={true} handleModalClose={closeModalAndClearError}>
      <ProfileModal
        user={user}
        following={followingChannelsCount}
        followers={22}
        friends={relationships.friends.length}
        recentVideos={[]}
        followedChannels={[]}
        unfriendHandler={() => dispatch(deleteFriend(userId))}
        blockHandler={blockHandler}
        updateAvatar={updateAvatar}
        updateUserApi={updateUserApi}
      />
    </ModalContainer>
  );
}
