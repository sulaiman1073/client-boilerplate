import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, updateUser } from "../../redux/actions";
import ModalContainer from "../../components/Modals/ModalContainer";
import ChangePasswordModal from "../../components/Modals/ChangePasswordModal";
import ContainerHeader from "../../components/ContainerHeader";

export default function ChangePasswordContainer({ handleModalClose }) {
  const updateUserApi = useSelector(state => state.api.userUpdateApi);
  const dispatch = useDispatch();

  const closeModalAndClearError = () => {
    handleModalClose();
    dispatch(clearError());
  };

  return (
    <ModalContainer
      isOpen={true}
      width="sm"
      handleModalClose={closeModalAndClearError}
      header={<ContainerHeader title="Change Password" />}
    >
      <ChangePasswordModal
        passwordUpdated={updateUserApi.status === "success"}
        loading={updateUserApi.loading}
        error={updateUserApi.status === "error" ? updateUserApi.error : false}
        handleSubmit={values => dispatch(updateUser(values))}
      />
    </ModalContainer>
  );
}
