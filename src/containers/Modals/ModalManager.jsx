import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModalFinal } from "../../redux/actions";
import ProfileModal from "./ProfileModalContainer";
import EditUserSettingsContainer from "./EditUserSettingsContainer";
import ChangePasswordContainer from "./ChangePasswordContainer";
import BlockedUsersContainer from "./BlockedUsersContainer";
import InviteFriendsContainer from "./InviteFriendsContainer";
import RoomExistsContainer from "./RoomExistsContainer";
import DeleteMessageContainer from "./DeleteMessageContainer";
import ListUsersContainer from "./ListUsersContainer";
import DeleteChannelContainer from "./DeleteChannelContainer";
import DeletePostContainer from "./DeletePostContainer.jsx";
import {
  MODAL_PROFILE,
  MODAL_EDIT_USER_SETTINGS,
  MODAL_CHANGE_PASSWORD,
  MODAL_BLOCKED_USERS,
  MODAL_INVITE,
  MODAL_SOCIAL_SHARE,
  MODAL_ROOM_EXISTS,
  MODAL_DELETE_MESSAGE,
  MODAL_LIST,
  MODAL_DELETE_CHANNEL,
  MODAL_DELETE_POST
} from "../../helpers/constants";
import SocialShareContainer from "./SocialShareContainer";

const ModalComponents = {
  [MODAL_PROFILE]: ProfileModal,
  [MODAL_EDIT_USER_SETTINGS]: EditUserSettingsContainer,
  [MODAL_CHANGE_PASSWORD]: ChangePasswordContainer,
  [MODAL_BLOCKED_USERS]: BlockedUsersContainer,
  [MODAL_INVITE]: InviteFriendsContainer,
  [MODAL_SOCIAL_SHARE]: SocialShareContainer,
  [MODAL_ROOM_EXISTS]: RoomExistsContainer,
  [MODAL_DELETE_MESSAGE]: DeleteMessageContainer,
  [MODAL_LIST]: ListUsersContainer,
  [MODAL_DELETE_CHANNEL]: DeleteChannelContainer,
  [MODAL_DELETE_POST]: DeletePostContainer
};

export default function ModalManager() {
  const components = useSelector(state => state.modal.components);
  const dispatch = useDispatch();

  const handleAfterClose = () => {
    dispatch(closeModalFinal());
  };

  const ModalType =
    components.length > 0
      ? ModalComponents[components[components.length - 1]]
      : 0;

  return (
    <>
      {ModalType === 0 ? (
        <></>
      ) : (
        <ModalType handleModalClose={handleAfterClose} />
      )}
    </>
  );
}
