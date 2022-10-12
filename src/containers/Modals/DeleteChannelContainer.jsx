import React from "react";
import ModalContainer from "../../components/Modals/ModalContainer";
import DeleteChannelModal from "../../components/Modals/DeleteChannelModal";
import { useSelector, useDispatch } from "react-redux";
import { deleteChannel } from "../../redux/actions";

export default function DeleteChannelContainer({ handleModalClose }) {
  const dispatch = useDispatch();
  const channelId = useSelector(state => state.modal.channelId);
  const handleDelete = () => {
    dispatch(deleteChannel(channelId));
  };

  return (
    <ModalContainer
      isOpen={true}
      width="sm"
      handleModalClose={handleModalClose}
    >
      <DeleteChannelModal
        handleDelete={handleDelete}
        handleCancel={handleModalClose}
      />
    </ModalContainer>
  );
}
