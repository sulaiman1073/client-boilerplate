import { createReducer } from "@reduxjs/toolkit";
import {
  closeModal,
  closeAllModals,
  closeModalFinal,
  logout,
  deleteAccount,
  createRoom,
  deleteMessage,
  deleteChannel,
  addRoomMembers
} from "../actions";

const initialState = {
  components: [],
  closing: false,
  channelId: null,
  userId: null,
  messageId: null,
  postId: null,
  isCreatingNewRoom: null,
  room: null,
  selectedIds: null,
  content: null
};

const R_openModal = (state, { payload }) => {
  state.components.push(payload.component);
  state.channelId = payload.channelId || null;
  state.userId = payload.userId || null;
  state.messageId = payload.messageId || null;
  state.postId = payload.postId || null;
  state.isCreatingNewRoom = payload.isCreatingNewRoom || null;
  state.room = payload.room || null;
  state.selectedIds = payload.selectedIds || null;
  state.content = payload.content || null;
  state.postId = payload.postId || null;
  state.closing = false;
};

const R_closeModal = state => {
  state.components.pop();
};
const R_closeAllModals = state => {
  state.closing = true;
};
const R_closeModalFinal = state => {
  state.components = [];
  state.closing = false;
};

export default createReducer(initialState, {
  "modal/open": R_openModal,
  [closeModal]: R_closeModal,
  [closeModalFinal]: R_closeModalFinal,
  [closeAllModals]: R_closeAllModals,
  [logout.fulfilled]: R_closeAllModals,
  [deleteAccount.fulfilled]: R_closeAllModals,
  [deleteChannel.fulfilled]: R_closeAllModals,
  [createRoom.fulfilled]: R_closeModal,
  [addRoomMembers.fulfilled]: R_closeModal,
  [deleteMessage.fulfilled]: R_closeModal
});
