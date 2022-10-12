import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../../components/Modals/ModalContainer";
import NewRoomModal from "../../components/Modals/NewRoomModal";
import SearchHeader from "../../components/SearchHeader";
import { buildTagInput } from "../../components/Controls/TagInput";
import {
  createRoom,
  addRoomMembers,
  openRoomExistsModal
} from "../../redux/actions";
import {
  filterSearch,
  handleCancel,
  handleEnter,
  mapIdsToUsers,
  onCheck
} from "../../helpers/functions";
import sortBy from "lodash/sortBy";
import _ from "lodash";

export default function InviteFriendsContainer({ handleModalClose }) {
  const { isCreatingNewRoom } = useSelector(state => state.modal);
  const { channelId } = useSelector(state => state.modal);
  const { friends } = useSelector(state => state.relationships);
  const { defaultAvatar } = useSelector(state => state.general);
  const users = useSelector(state => state.users);
  const channels = useSelector(state => state.channels);
  const { roomIds, id: ownId } = useSelector(state => state.self);
  const rooms = sortBy(
    roomIds.map(roomId => {
      const members = mapIdsToUsers(
        channels[roomId].members,
        users,
        defaultAvatar
      ).filter(m =>
        channels[roomId].members.length === 1 ? true : m.id !== ownId
      );

      return {
        id: roomId,
        ...channels[roomId],
        members
      };
    }),
    room => new Date(room.lastMessageAt)
  );

  let friendsMap = mapIdsToUsers(
    isCreatingNewRoom
      ? friends
      : friends.filter(f => !channels[channelId].members?.includes(f)),
    users,
    defaultAvatar
  );

  const [visible, setVisible] = useState(friendsMap);
  const [selected, setSelected] = useState([]);

  const nameField = "username";
  const currentRoomMembersIds = channels[channelId]?.members?.filter(
    id => id !== ownId
  );

  const dispatch = useDispatch();

  const handleInviteFriends = () => {
    const userIds = selected.map(obj => obj.id);
    const roomExistsIndex = rooms.findIndex(room => {
      const memberIds = room.members.map(obj => obj.id);
      return _.isEmpty(
        _.xor([...userIds, ...currentRoomMembersIds], memberIds)
      );
    });

    if (roomExistsIndex !== -1) {
      const room = rooms[roomExistsIndex];
      const userIds = room.members.map(obj => obj.id);
      dispatch(openRoomExistsModal(room, userIds));
    } else {
      dispatch(addRoomMembers({ channelId, userIds }));
    }
  };

  const handleCreateRoom = () => {
    const userIds = selected.map(obj => obj.id);
    const roomExistsIndex = rooms.findIndex(room => {
      const memberIds = room.members.map(obj => obj.id);
      return _.isEmpty(_.xor(userIds, memberIds));
    });

    if (roomExistsIndex !== -1) {
      const room = rooms[roomExistsIndex];
      const userIds = room.members.map(obj => obj.id);
      dispatch(openRoomExistsModal(room, userIds));
    } else {
      dispatch(createRoom(userIds));
    }
  };

  return (
    <ModalContainer
      isOpen={true}
      width="sm"
      fixedFullHeight={true}
      handleModalClose={handleModalClose}
      header={
        <SearchHeader
          title="Select Friends"
          filterSearch={(searchTerm, items) =>
            filterSearch(items, nameField, setVisible, searchTerm)
          }
          buildInput={buildTagInput(selected, id =>
            handleCancel(selected, setSelected, id)
          )}
          handleEnter={() =>
            handleEnter(selected, setSelected, visible, nameField)
          }
          items={friendsMap}
        />
      }
    >
      <NewRoomModal
        users={visible}
        selected={selected}
        onCheck={(id, name) => onCheck(selected, setSelected, id, name)}
        handleSend={isCreatingNewRoom ? handleCreateRoom : handleInviteFriends}
        isCreatingNewRoom={isCreatingNewRoom}
      />
    </ModalContainer>
  );
}
