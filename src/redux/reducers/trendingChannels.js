import { createReducer } from "@reduxjs/toolkit";
import { logout, deleteAccount, getTrendingChannels } from "../actions";

const initialState = {
  channels: {},
  users: {},
  lastRequestAt: null
};

const R_addTrendingChannels = (state, { payload }) => {
  state.channels = payload.channels;
  state.users = payload.users;
  state.lastRequestAt = new Date().toString();
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [getTrendingChannels.fulfilled]: R_addTrendingChannels,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
