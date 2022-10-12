import React, { useState } from "react";
import ModalContainer from "../../components/Modals/ModalContainer";
import SearchHeader, { buildSearchInput } from "../../components/SearchHeader";
import StretchList from "../../components/InfoCardLists/StretchList";
import FollowersList from "../../components/InfoCardLists/FollowersList";
import { filterSearch, mapIdsToUsers } from "../../helpers/functions";
import { useSelector, useDispatch } from "react-redux";
import { openProfileModal } from "../../redux/actions";

export default function ListUsersContainer({ handleModalClose }) {
  // TODO: Watching Now
  const dispatch = useDispatch();
  const channelId = useSelector(state => state.modal.channelId);
  const content = useSelector(state => state.modal.content);
  let title;
  const list = useSelector(state => {
    if (content === "followers") {
      title = "Following";
      return state.channels[channelId].members;
    } else if (content === "admins") {
      title = "Admins";
      return state.channels[channelId].admins;
    }
  });
  const users = useSelector(state => state.users);
  const { defaultAvatar } = useSelector(state => state.general);

  const usersMap = mapIdsToUsers(list, users, defaultAvatar);

  const [visible, setVisible] = useState(usersMap);

  return (
    <ModalContainer
      isOpen={true}
      width="sm"
      fixedFullHeight={true}
      handleModalClose={handleModalClose}
      header={
        <SearchHeader
          title={title}
          filterSearch={(searchTerm, items) =>
            filterSearch(items, "username", setVisible, searchTerm)
          }
          buildInput={buildSearchInput}
          items={usersMap}
        />
      }
    >
      <StretchList
        list={FollowersList}
        users={visible}
        handleProfile={id => dispatch(openProfileModal(id))}
      />
    </ModalContainer>
  );
}
