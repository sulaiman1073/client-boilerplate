import { createReducer } from "@reduxjs/toolkit";
import {
  validateSession,
  login,
  logout,
  deleteAccount,
  getChannel,
  addChannel,
  addChannelWs,
  createRoom,
  addMessage,
  addMessageWs,
  getLatestMessages,
  setInitialScroll
} from "../actions";

import { extendedCapacity } from "./messages";

const initialState = {};

const R_initChatSettings = (state, { payload }) => {
  if (payload.channels) {
    const newChatSettings = {};

    Object.keys(payload.channels).forEach(channelId => {
      newChatSettings[channelId] = {
        capacity: 50,
        initialScroll: null
      };
    });

    return newChatSettings;
  }
  return payload.channels || {};
};

const R_addChatSettings = (state, { payload }) => {
  if (payload.isPublic || payload.isMember) {
    state[payload.channelId] = {
      capacity: 50,
      initialScroll: null
    };
  }
};

const R_resetScroll = (state, { payload }) => {
  state[payload.channelId].initialScroll = null;
};

const R_updateChannelInitialScroll = (state, { payload }) => {
  state[payload.channelId].capacity =
    payload.initialScroll === null ? 50 : extendedCapacity;
  state[payload.channelId].initialScroll = payload.initialScroll;
};

const R_resetChannelChatSettings = (state, { payload }) => {
  state[payload.channelId] = {
    capacity: 50,
    initialScroll: null
  };
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [validateSession.fulfilled]: R_initChatSettings,
  [login.fulfilled]: R_initChatSettings,
  [setInitialScroll]: R_updateChannelInitialScroll,
  [getChannel.fulfilled]: R_addChatSettings,
  [addChannel.fulfilled]: R_addChatSettings,
  [createRoom.fulfilled]: R_addChatSettings,
  [addChannelWs]: R_addChatSettings,
  [addMessage.fulfilled]: R_resetScroll,
  [addMessageWs]: R_resetScroll,
  [getLatestMessages.fulfilled]: R_resetChannelChatSettings,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
