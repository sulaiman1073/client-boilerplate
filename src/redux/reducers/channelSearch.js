import { createReducer } from "@reduxjs/toolkit";
import { logout, deleteAccount, searchChannels } from "../actions";

const initialState = {
  channelName: null,
  page: null,
  channels: {},
  users: {},
  lastRequestAt: null
};

const R_addSearchedChannels = (state, { payload }) => {
  state.channels = payload.channels;
  // if (state.channelName !== payload.channelName) {
  //   state.channels = payload.channels;
  //   state.users = payload.users;
  // } else if (
  //   state.channelName === payload.channelName &&
  //   state.page < payload.page
  // ) {
  //   state.channels = {
  //     ...state.channels,
  //     ...payload.channels
  //   };
  //   state.users = {
  //     ...state.users,
  //     ...payload.users
  //   };
  // }
  // state.channelName = payload.channelName;
  // state.page = payload.page;
  // state.lastRequestAt = new Date().toString();
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [searchChannels.fulfilled]: R_addSearchedChannels,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
