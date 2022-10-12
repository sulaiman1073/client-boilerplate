import { createReducer } from "@reduxjs/toolkit";
import {
  validateSession,
  login,
  logout,
  deleteAccount,
  getChannel,
  followChannel,
  addMemberWs,
  addMembersWs,
  sendFriendRequest,
  acceptFriendRequest,
  addFriendWs,
  addReceivedFriendRequestWs,
  blockUser,
  addAdminWs,
  addChannelWs,
  updateUser
} from "../actions";

const initialState = {};

const R_usersInit = (state, { payload }) => {
  return payload.users || {};
};

const R_addUsers = (state, { payload }) => {
  return {
    ...state,
    ...payload.users
  };
};

const R_addUser = (state, { payload }) => {
  const user = payload.user;
  state[payload.userId] = {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    avatar: user.avatar
  };
};

const R_updateUser = (state, { payload }) => {
  state[payload.id] = {
    ...state[payload.id],
    ...payload
  };
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [validateSession.fulfilled]: R_usersInit,
  [login.fulfilled]: R_usersInit,
  [getChannel.fulfilled]: R_addUsers,
  [followChannel.fulfilled]: R_addUser,
  [addMemberWs]: R_addUser,
  [addMembersWs]: R_addUsers,
  [sendFriendRequest.fulfilled]: R_addUser,
  [acceptFriendRequest.fulfilled]: R_addUsers,
  [addFriendWs]: R_addUsers,
  [addChannelWs]: R_addUsers,
  [addReceivedFriendRequestWs]: R_addUser,
  [addAdminWs]: R_addUsers,
  [blockUser.fulfilled]: R_addUser,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState,
  [updateUser.fulfilled]: R_updateUser
});
