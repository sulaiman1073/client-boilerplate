import { createReducer } from "@reduxjs/toolkit";
import {
  addInviteChannel,
  addInviteFriend,
  removeInviteFriend,
  createRoom,
  addRoomMembers,
  logout,
  deleteAccount
} from "../actions";

const initialState = {
  channelId: null,
  selectedFriends: []
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [addInviteChannel]: (state, { payload }) => {
    state.channelId = payload;
  },
  [addInviteFriend]: (state, { payload }) => {
    state.selectedFriends.push(payload);
  },
  [removeInviteFriend]: (state, { payload }) => {
    state.selectedFriends = state.selectedFriends.filter(id => id !== payload);
  },
  [createRoom.fulfilled]: R_resetState,
  [addRoomMembers.fulfilled]: R_resetState,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
