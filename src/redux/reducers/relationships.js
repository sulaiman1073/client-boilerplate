import { createReducer } from "@reduxjs/toolkit";
import {
  validateSession,
  login,
  logout,
  deleteAccount,
  sendFriendRequest,
  cancelFriendRequest,
  rejectFriendRequest,
  deleteSentFriendRequestWs,
  addReceivedFriendRequestWs,
  deleteReceivedFriendRequestWs,
  acceptFriendRequest,
  addFriendWs,
  deleteFriend,
  deleteFriendWs,
  blockUser,
  unblockUser,
  addBlockerWs,
  deleteBlockerWs
} from "../actions";

const initialState = {
  friends: [],
  sentFriendRequests: [],
  receivedFriendRequests: [],
  blocked: [],
  blockers: []
};

const R_relationshipsInit = (state, { payload }) => {
  if (payload.relationships) {
    let {
      friends,
      sentFriendRequests,
      receivedFriendRequests,
      blocked,
      blockers
    } = payload.relationships;
    state.friends = friends || [];
    state.sentFriendRequests = sentFriendRequests || [];
    state.receivedFriendRequests = receivedFriendRequests || [];
    state.blocked = blocked || [];
    state.blockers = blockers || [];
  }
};

const R_addSentFriendRequest = (state, { payload }) => {
  state.sentFriendRequests.push(payload.userId);
};

const R_deleteSentFriendRequest = (state, { payload }) => {
  state.sentFriendRequests = state.sentFriendRequests.filter(
    userId => userId !== payload.userId
  );
};
const R_addReceivedFriendRequest = (state, { payload }) => {
  state.receivedFriendRequests.push(payload.userId);
};

const R_deleteReceivedFriendRequest = (state, { payload }) => {
  state.receivedFriendRequests = state.receivedFriendRequests.filter(
    userId => userId !== payload.userId
  );
};

const R_addFriend = (state, { payload }) => {
  state.sentFriendRequests = state.sentFriendRequests.filter(
    userId => userId !== payload.userId
  );
  state.receivedFriendRequests = state.receivedFriendRequests.filter(
    userId => userId !== payload.userId
  );
  state.friends.push(payload.userId);
};

const R_deleteFriend = (state, { payload }) => {
  state.friends = state.friends.filter(userId => userId !== payload.userId);
};

const R_addBlock = (state, { payload }) => {
  state.sentFriendRequests = state.sentFriendRequests.filter(
    userId => userId !== payload.userId
  );
  state.receivedFriendRequests = state.receivedFriendRequests.filter(
    userId => userId !== payload.userId
  );
  state.friends = state.friends.filter(userId => userId !== payload.userId);
  state.blocked.push(payload.userId);
};

const R_deleteBlock = (state, { payload }) => {
  state.blocked = state.blocked.filter(userId => userId !== payload.userId);
};

const R_addBlocker = (state, { payload }) => {
  state.sentFriendRequests = state.sentFriendRequests.filter(
    userId => userId !== payload.userId
  );
  state.receivedFriendRequests = state.receivedFriendRequests.filter(
    userId => userId !== payload.userId
  );
  state.friends = state.friends.filter(userId => userId !== payload.userId);
  state.blockers.push(payload.userId);
};

const R_deleteBlocker = (state, { payload }) => {
  state.blockers = state.blockers.filter(userId => userId !== payload.userId);
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [validateSession.fulfilled]: R_relationshipsInit,
  [login.fulfilled]: R_relationshipsInit,
  [sendFriendRequest.fulfilled]: R_addSentFriendRequest,
  [cancelFriendRequest.fulfilled]: R_deleteSentFriendRequest,
  [deleteSentFriendRequestWs]: R_deleteSentFriendRequest,
  [addReceivedFriendRequestWs]: R_addReceivedFriendRequest,
  [rejectFriendRequest.fulfilled]: R_deleteReceivedFriendRequest,
  [deleteReceivedFriendRequestWs]: R_deleteReceivedFriendRequest,
  [acceptFriendRequest.fulfilled]: R_addFriend,
  [addFriendWs]: R_addFriend,
  [deleteFriend.fulfilled]: R_deleteFriend,
  [deleteFriendWs]: R_deleteFriend,
  [blockUser.fulfilled]: R_addBlock,
  [unblockUser.fulfilled]: R_deleteBlock,
  [addBlockerWs]: R_addBlocker,
  [deleteBlockerWs]: R_deleteBlocker,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
