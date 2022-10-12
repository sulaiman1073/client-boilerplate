import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, updateUser } from "../../redux/actions";
import ModalContainer from "../../components/Modals/ModalContainer";
import EditInformationModal from "../../components/Modals/EditInformationModal";
import ContainerHeader from "../../components/ContainerHeader";

export default function EditUserSettingsModal({ handleModalClose }) {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    username,
    avatar
  } = useSelector(state => state.self);

  const updateUserApi = useSelector(state => state.api.userUpdateApi);
  const dispatch = useDispatch();

  const closeModalAndClearError = () => {
    handleModalClose();
    dispatch(clearError());
  };

  return (
    <ModalContainer
      isOpen={true}
      handleModalClose={closeModalAndClearError}
      header={<ContainerHeader title="Edit Your Information" />}
    >
      <EditInformationModal
        username={username}
        initial={{
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: new Date(dateOfBirth),
          email: email,
          avatar: avatar
        }}
        handleSubmit={values => dispatch(updateUser({ ...values }))}
        informationUpdated={updateUserApi.status === "success"}
        loading={updateUserApi.loading}
        error={updateUserApi.status === "error" ? updateUserApi.error : false}
      />
    </ModalContainer>
  );
}
