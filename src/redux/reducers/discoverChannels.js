import { createReducer } from "@reduxjs/toolkit";
import { logout, deleteAccount, getDiscoverChannels } from "../actions";

const initialState = {
  channels: {},
  users: {},
  lastRequestAt: null
};

const R_addDiscoverChannels = (state, { payload }) => {
  state.channels = payload.channels;
  state.users = payload.users;
  state.lastRequestAt = new Date().toString();
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [getDiscoverChannels.fulfilled]: R_addDiscoverChannels,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
