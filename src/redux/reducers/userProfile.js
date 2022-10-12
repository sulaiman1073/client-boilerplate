import { createReducer } from "@reduxjs/toolkit";
import { getUserInfo, getUserInfoModal, updateUser } from "../actions";

const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  username: "",
  avatar: null,
  idModal: "",
  firstNameModal: "",
  lastNameModal: "",
  usernameModal: "",
  avatarModal: null
};

const R_setUserInfo = (state, { payload }) => {
  state.id = payload.id;
  state.firstName = payload.firstName;
  state.lastName = payload.lastName;
  state.username = payload.username;
  state.avatar = payload.avatar;
};
const R_setUserInfoModal = (state, { payload }) => {
  state.idModal = payload.id;
  state.firstNameModal = payload.firstName;
  state.lastNameModal = payload.lastName;
  state.usernameModal = payload.username;
  state.avatarModal = payload.avatar;
};

export default createReducer(initialState, {
  [getUserInfo.fulfilled]: R_setUserInfo,
  [getUserInfoModal.fulfilled]: R_setUserInfoModal,
  [updateUser.fulfilled]: R_setUserInfo,
  [updateUser.fulfilled]: R_setUserInfoModal
});
