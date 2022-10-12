import { createReducer } from "@reduxjs/toolkit";
import { logout, deleteAccount, getFollowingChannels } from "../actions";

const initialState = {
  channels: {},
  users: {},
  lastRequestAt: null
};

const R_addFollowingChannels = (state, { payload }) => {
  state.channels = payload.channels;
  state.users = payload.users;
  state.lastRequestAt = new Date().toString();
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [getFollowingChannels.fulfilled]: R_addFollowingChannels,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
