import React from "react";
import ModalContainer from "../../components/Modals/ModalContainer";
import DeleteMessageModal from "../../components/Modals/DeleteMessageModal";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessage } from "../../redux/actions";
import messagesFormatter2 from "../../util/messagesFormatter2";

export default function DeleteMessageContainer({ handleModalClose }) {
  const messageId = useSelector(state => state.modal.messageId);
  const channelId = useSelector(state => state.modal.channelId);
  const { id: ownId } = useSelector(state => state.self);
  const { defaultAvatar } = useSelector(state => state.general);
  const message = useSelector(state => state.messages[messageId]);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(
      deleteMessage({ status: message.status, id: messageId, channelId })
    );
  };

  const messages = messagesFormatter2([message]);

  return (
    <ModalContainer
      isOpen={true}
      width="sm"
      handleModalClose={handleModalClose}
    >
      <DeleteMessageModal
        message={messages[1]}
        ownId={ownId}
        defaultAvatar={defaultAvatar}
        handleCancel={handleModalClose}
        handleDelete={handleDelete}
      />
    </ModalContainer>
  );
}
