import { createReducer } from "@reduxjs/toolkit";
import {
  validateSession,
  login,
  logout,
  deleteAccount,
  addPost,
  setPostDraft
} from "../actions";

const initialState = {};

const R_resetState = () => initialState;
const R_draftsInit = (state, { payload }) => {
  const oldDrafts = payload.postDrafts || {};

  const channelIds = payload.channels ? Object.keys(payload.channels) : [];

  Object.keys(oldDrafts).forEach(channelId => {
    if (!channelIds.includes(channelId)) {
      delete oldDrafts[channelId];
    }
  });

  return oldDrafts;
};

const R_setChannelDraft = (state, { payload }) => {
  state[payload.channelId] = payload.draft;
};
const R_clearChannelDraft = (state, { payload }) => {
  delete state[payload.channelId];
};

export default createReducer(initialState, {
  [validateSession.fulfilled]: R_draftsInit,
  [login.fulfilled]: R_draftsInit,
  [setPostDraft]: R_setChannelDraft,
  [addPost.fulfilled]: R_clearChannelDraft,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
