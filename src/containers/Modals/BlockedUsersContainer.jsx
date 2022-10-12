import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalContainer from "../../components/Modals/ModalContainer";
import BlockedUsersModal from "../../components/Modals/BlockedUsersModal";
import SearchHeader, { buildSearchInput } from "../../components/SearchHeader";
import { unblockUser } from "../../redux/actions";
import { filterSearch, mapIdsToUsers } from "../../helpers/functions";

export default function BlockedUsersContainer({ handleModalClose }) {
  const { blocked } = useSelector(state => state.relationships);
  const { defaultAvatar } = useSelector(state => state.general);
  const users = useSelector(state => state.users);
  const blockedMap = mapIdsToUsers(blocked, users, defaultAvatar);

  const [visible, setVisible] = useState(blockedMap);

  const dispatch = useDispatch();

  return (
    <ModalContainer
      isOpen={true}
      width="sm"
      fixedFullHeight={true}
      handleModalClose={handleModalClose}
      header={
        <SearchHeader
          title="Blocked Users"
          filterSearch={(searchTerm, items) =>
            filterSearch(items, "username", setVisible, searchTerm)
          }
          items={blockedMap}
          buildInput={buildSearchInput}
        />
      }
    >
      <BlockedUsersModal
        users={visible}
        handleUnblock={id => dispatch(unblockUser(id))}
      />
    </ModalContainer>
  );
}
