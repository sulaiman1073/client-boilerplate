import { createReducer } from "@reduxjs/toolkit";
import {
  validateSession,
  login,
  logout,
  deleteAccount,
  updateUser,
  addChannel,
  createRoom,
  addChannelWs,
  deleteChannel,
  deleteChannelWs,
  followChannel,
  unfollowChannel,
  addBanWs,
  deleteFriend,
  deleteFriendWs,
  blockUser,
  addBlockerWs,
  acceptFriendRequest,
  addFriendWs,
  leaveRoom,
  getChannel
} from "../actions";

const initialState = {
  id: null,
  firstName: "",
  lastName: "",
  username: "",
  dateOfBirth: null,
  avatar: null,
  email: "",
  emailVerified: null,
  roomIds: [],
  channelIds: [],
  loadedChannels: []
};

const R_selfInit = (state, { payload }) => {
  state.id = payload.id;
  state.firstName = payload.firstName;
  state.lastName = payload.lastName;
  state.username = payload.username;
  state.dateOfBirth = payload.dateOfBirth;
  state.avatar = payload.avatar !== undefined ? payload.avatar : null;
  state.email = payload.email;
  state.emailVerified = payload.emailVerified;
  state.roomIds = Object.entries(payload.channels)
    .filter(([channelId, channel]) => channel.type !== "channel")
    .map(([channelId, channel]) => channelId);
  state.channelIds = Object.entries(payload.channels)
    .filter(([channelId, channel]) => channel.type === "channel")
    .map(([channelId, channel]) => channelId);
};

const R_updateUser = (state, { payload }) => {
  return {
    ...state,
    ...payload
  };
};

const R_addChannel = (state, { payload }) => {
  const channelId = payload.id || payload.channelId;

  if (payload.type === "channel" || payload.channel?.type === "channel") {
    if (!state.channelIds.includes(channelId)) {
      state.channelIds.push(channelId);
    }
  } else {
    if (!state.roomIds.includes(channelId)) {
      state.roomIds.push(channelId);
    }
  }
};
const R_deleteChannel = (state, { payload }) => {
  const channelId = payload.id || payload.channelId;

  if (channelId) {
    state.channelIds = state.channelIds.filter(id => id !== channelId);
    state.roomIds = state.roomIds.filter(id => id !== channelId);
  }
};

const R_deleteBannedChannel = (state, { payload }) => {
  if (state.id === payload.userId) {
    state.channelIds = state.channelIds.filter(id => id !== payload.channelId);
  }
};

const R_setLoadedChannels = (state, { payload }) => {
  state.loadedChannels.push(payload.channelId);
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [validateSession.fulfilled]: R_selfInit,
  [login.fulfilled]: R_selfInit,
  [updateUser.fulfilled]: R_updateUser,
  [addChannel.fulfilled]: R_addChannel,
  [addChannelWs]: R_addChannel,
  [createRoom.fulfilled]: R_addChannel,
  [followChannel.fulfilled]: R_addChannel,
  [acceptFriendRequest.fulfilled]: R_addChannel,
  [addFriendWs]: R_addChannel,
  [deleteChannel.fulfilled]: R_deleteChannel,
  [deleteChannelWs]: R_deleteChannel,
  [unfollowChannel.fulfilled]: R_deleteChannel,
  [leaveRoom.fulfilled]: R_deleteChannel,
  [addBanWs]: R_deleteBannedChannel,
  [deleteFriend.fulfilled]: R_deleteChannel,
  [deleteFriendWs]: R_deleteChannel,
  [blockUser.fulfilled]: R_deleteChannel,
  [addBlockerWs]: R_deleteChannel,
  [getChannel.fulfilled]: R_setLoadedChannels,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
