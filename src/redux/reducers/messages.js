import { createReducer } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  logout,
  deleteAccount,
  getChannel,
  addMessage,
  addMessageWs,
  getMessages,
  getLatestMessages,
  deleteMessage,
  deleteMessageWs,
  deleteFriend,
  deleteFriendWs,
  blockUser,
  addBlockerWs,
  acceptFriendRequest,
  addFriendWs,
  createRoom,
  addChannel
} from "../actions";

const initialState = {};
// Defines how many messages can exist in state at once,
// When chat is scrolled to past messages.
// Reduced to 150 from 250, for scrolling performance.
export const extendedCapacity = 150;

const R_messagesInit = (state, { payload }) => {
  return {
    ...state,
    ...payload.messages
  };
  // if (payload.messages) {
  //   if (!state[payload.channelId]) {
  //     state[payload.channelId] = [];
  //   }

  //   if (state[payload.channelId].length < 50) {
  //     state[payload.channelId] = _.uniqBy(
  //       [...payload.messages, ...state[payload.channelId]],
  //       "id"
  //     );
  //   }
  // }
};

const R_addMessages = (state, { payload }) => {
  return {
    ...state,
    ...payload.messages
  };
};
const R_addMessage = (state, { payload, meta }) => {
  const { message } = payload;

  state[message.id] = message;

  delete state[meta.arg.id];

  // const { capacity, ...message } = payload;
  // // Removes pending message
  // let notFound = true;
  // let index = state[payload.channelId].length - 1;
  // while (notFound && index >= 0) {
  //   if (state[payload.channelId][index].status === "pending") {
  //     state[payload.channelId].splice(index, 1);
  //     notFound = false;
  //   } else {
  //     index -= 1;
  //   }
  // }
  // if (!state[payload.channelId]) {
  //   state[payload.channelId] = [message];
  // } else if (state[payload.channelId].length < extendedCapacity) {
  //   state[payload.channelId].push(message);

  //   if (capacity === 50) {
  //     state[payload.channelId] = state[payload.channelId].slice(-50);
  //   }
  // }
};

const R_addMessageWs = (state, { payload }) => {
  const { message } = payload;

  state[message.id] = message;

  // const { capacity, ...message } = payload;
  // if (!state[payload.channelId]) {
  //   state[payload.channelId] = [message];
  // } else if (state[payload.channelId].length < extendedCapacity) {
  //   state[payload.channelId].push(message);

  //   if (capacity === 50) {
  //     state[payload.channelId] = state[payload.channelId].slice(-50);
  //   }
  // }
};

const R_addPendingMessage = (state, { meta }) => {
  state[meta.arg.id] = {
    status: "pending",
    id: meta.arg.id,
    userId: meta.arg.userId,
    channelId: meta.arg.channelId,
    content: meta.arg.content,
    upload: meta.arg.upload,
    createdAt: new Date().toString(),
    author: {
      id: "",
      username: meta.arg.author.username,
      avatar: null
    }
  };
  // const tempMessage = {
  //   status: "pending",
  //   id: meta.arg.id,
  //   userId: meta.arg.userId,
  //   channelId: meta.arg.channelId,
  //   content: meta.arg.content,
  //   upload: meta.arg.upload,
  //   createdAt: Date.now(),
  //   author: {
  //     id: "",
  //     username: meta.arg.author.username,
  //     avatar: null
  //   }
  // };
  // if (state[meta.arg.channelId].length < extendedCapacity) {
  //   state[meta.arg.channelId].push(tempMessage);
  // }
};
const R_addRejectedMessage = (state, { meta }) => {
  if (state[meta.arg.id]) {
    state[meta.arg.id].status = "rejected";
  }

  // Removes pending message
  // let notFound = true;
  // let index = state[meta.arg.channelId].length - 1;
  // while (notFound && index >= 0) {
  //   if (state[meta.arg.channelId][index].status === "pending") {
  //     state[meta.arg.channelId].splice(index, 1);
  //     notFound = false;
  //   } else {
  //     index -= 1;
  //   }
  // }
  // const tempMessage = {
  //   status: "rejected",
  //   id: meta.arg.id,
  //   userId: meta.arg.userId,
  //   channelId: meta.arg.channelId,
  //   content: meta.arg.content,
  //   upload: null,
  //   createdAt: Date.now(),
  //   author: {
  //     id: "",
  //     username: meta.arg.author.username,
  //     avatar: null
  //   }
  // };
  // if (state[meta.arg.channelId].length < extendedCapacity) {
  //   state[meta.arg.channelId].push(tempMessage);
  // }
};
const R_deleteMessage = (state, { payload }) => {
  delete state[payload.messageId];
  // state[payload.channelId] = state[payload.channelId].filter(
  //   message => message.id !== payload.id
  // );
};

const R_replaceMessages = (state, { payload }) => {
  state[payload.channelId] = payload.messages;
};

const R_deleteChannelMessages = (state, { payload }) => {
  const channelId = payload.id || payload.channelId;

  if (channelId) {
    delete state[channelId];
  }
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [getChannel.fulfilled]: R_messagesInit,
  [acceptFriendRequest.fulfilled]: R_messagesInit,
  [addFriendWs]: R_messagesInit,
  [getMessages.fulfilled]: R_addMessages,
  [addMessage.fulfilled]: R_addMessage,
  [addMessage.pending]: R_addPendingMessage,
  [addMessage.rejected]: R_addRejectedMessage,
  [addMessageWs]: R_addMessageWs,
  [getLatestMessages.fulfilled]: R_replaceMessages,
  [deleteMessage.fulfilled]: R_deleteMessage,
  [deleteMessageWs]: R_deleteMessage,
  [deleteFriend.fulfilled]: R_deleteChannelMessages,
  [deleteFriendWs]: R_deleteChannelMessages,
  [blockUser.fulfilled]: R_deleteChannelMessages,
  [addBlockerWs]: R_deleteChannelMessages,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState,
  [createRoom.fulfilled]: R_messagesInit,
  [addChannel.fulfilled]: R_messagesInit
});
