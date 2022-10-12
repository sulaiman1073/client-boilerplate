import React from "react";
import ModalContainer from "../../components/Modals/ModalContainer";
import DeletePostModal from "../../components/Modals/DeletePostModal";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../redux/actions";

export default function DeleteChannelContainer({ handleModalClose }) {
  const dispatch = useDispatch();
  const postId = useSelector(state => state.modal.postId);
  const handleDelete = () => {
    dispatch(deletePost(postId));
  };

  return (
    <ModalContainer
      isOpen={true}
      width="sm"
      handleModalClose={handleModalClose}
    >
      <DeletePostModal
        handleDelete={handleDelete}
        handleCancel={handleModalClose}
      />
    </ModalContainer>
  );
}
