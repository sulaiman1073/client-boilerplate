import { createReducer } from "@reduxjs/toolkit";
import arrayMove from "array-move";
import {
  validateSession,
  refreshSession,
  login,
  logout,
  deleteAccount,
  getChannel,
  addChannel,
  addChannelWs,
  updateChannel,
  updateChannelWs,
  deleteChannel,
  deleteChannelWs,
  addAdmin,
  addAdminWs,
  deleteAdmin,
  deleteAdminWs,
  addBan,
  addBanWs,
  deleteBan,
  deleteBanWs,
  addMemberWs,
  addMembersWs,
  deleteMemberWs,
  deleteFriend,
  deleteFriendWs,
  blockUser,
  addBlockerWs,
  createRoom,
  leaveRoom,
  updateRoom,
  addMessage,
  addMessageWs,
  getMessages,
  getLatestMessages,
  deleteMessage,
  deleteMessageWs,
  addPost,
  addPostWs,
  deletePost,
  deletePostWs,
  followChannel,
  unfollowChannel,
  acceptFriendRequest,
  setInitialScroll,
  addFriendWs,
  searchVideos,
  friendOnlineWs,
  friendOfflineWs,
  addRoomMembers,
  setPlaying,
  setPaused,
  addVideo,
  deleteVideo,
  swapVideos,
  setLastMessageSeen,
  addVideoWs,
  deleteVideoWs,
  swapVideosWs
} from "../actions";

// import { extendedCapacity } from "./messages";
const extendedCapacity = 150;

const initialState = {};

const defaultVideoSearch = {
  source: "",
  terms: "",
  results: [],
  totalResults: 1,
  page: 1,
  searched: false
};

const R_initChannels = (state, { payload }) => {
  if (payload.channels) {
    let newChannels = {};

    Object.entries(payload.channels).forEach(([channelId, channel]) => {
      newChannels[channelId] = {
        // queue: [],
        ...channel,
        chatSettings: {
          capacity: 50,
          initialScroll: null
        },
        videoSearch: defaultVideoSearch
      };
    });

    return newChannels;
  } else {
    return {};
  }
};

const R_refreshChannels = (state, { payload }) => {
  if (payload.channels) {
    Object.entries(payload.channels).forEach(([channelId, channel]) => {
      state[channelId] = {
        ...state[channelId],
        ...channel
      };
    });
  }
};

const R_addChannel = (state, { payload }) => {
  const channelId = payload.id || payload.channelId;
  let { channel } = payload;

  state[channelId] = {
    ...state[channelId],
    ...channel,
    loaded: true,
    chatSettings: {
      capacity: 50,
      initialScroll: null
    },
    videoSearch: defaultVideoSearch
  };
};

const R_updateChannel = (state, { payload }) => {
  const channelId = payload.id || payload.channelId;

  state[channelId] = {
    ...state[channelId],
    ...payload.updatedChannel
  };
};

const R_setLastMessageSeen = (state, { payload }) => {
  if (state[payload.channelId].lastMessageIsNew)
    state[payload.channelId].lastMessageIsNew = false;
  if (state[payload.channelId].chatNotifications)
    state[payload.channelId].chatNotifications = null;
};

const R_updateLastMessageInfoPending = (state, { meta }) => {
  state[meta.arg.channelId].initialScroll = null;
  // state[meta.arg.channelId].lastMessageReceivedByServer = false;

  // if (!state[meta.arg.channelId].firstMessageId) {
  //   state[meta.arg.channelId].firstMessageId = meta.arg.id;
  // }
  // state[meta.arg.channelId].lastMessageId = meta.arg.id;
  // state[meta.arg.channelId].lastMessageAt = meta.arg.createdAt;
  // state[meta.arg.channelId].lastMessageUsername = meta.arg.author.username;
  // state[meta.arg.channelId].lastMessageContent = meta.arg.content;
  // state[meta.arg.channelId].initialScroll = null;

  if (!state[meta.arg.channelId].messages) {
    state[meta.arg.channelId].messages = [meta.arg.id];
  } else {
    state[meta.arg.channelId].messages.push(meta.arg.id);
  }
};

const R_updateLastMessageInfo = (state, { payload, meta }) => {
  const { channelId, message, capacity } = payload;

  if (!state[channelId].firstMessageId) {
    state[channelId].firstMessageId = message.id;
  }
  state[channelId].lastMessageId = message.id;
  state[channelId].lastMessageAt = message.createdAt;
  state[channelId].lastMessageUsername = message.author.username;
  state[channelId].lastMessageContent = message.content;
  state[channelId].lastMessageReceivedByServer = true;
  state[channelId].lastMessagesUpdateByWebsockets = false;
  state[channelId].initialScroll = null;

  // // Removes pending message
  state[channelId].messages = state[channelId].messages.filter(
    msgId => msgId !== meta.arg.id
  );

  if (!state[payload.channelId].messages) {
    state[payload.channelId].messages = [message.id];
  } else if (state[payload.channelId].messages.length < extendedCapacity) {
    state[payload.channelId].messages.push(message.id);

    if (capacity === 50) {
      state[payload.channelId].messages = state[
        payload.channelId
      ].messages.slice(-50);
    }
  }
};
const R_updateLastMessageInfoWs = (state, { payload }) => {
  const { channelId, message, capacity } = payload;

  if (!state[channelId].firstMessageId) {
    state[channelId].firstMessageId = message.id;
  }
  state[channelId].lastMessageId = message.id;
  state[channelId].lastMessageAt = message.createdAt;
  state[channelId].lastMessageUsername = message.author.username;
  state[channelId].lastMessageContent = message.content;
  state[channelId].lastMessageIsNew = true;
  state[channelId].lastMessageReceivedByServer = true;
  state[channelId].lastMessagesUpdateByWebsockets = true;
  state[channelId].initialScroll = null;

  if (!state[payload.channelId].messages) {
    state[payload.channelId].messages = [message.id];
  } else if (state[payload.channelId].messages.length < extendedCapacity) {
    state[payload.channelId].messages.push(message.id);

    if (capacity === 50) {
      state[payload.channelId].messages = state[
        payload.channelId
      ].messages.slice(-50);
    }
  }
};

const R_addMessages = (state, { payload }) => {
  state[payload.channelId].lastMessagesUpdateByWebsockets = false;

  // state.messages
  if (payload.direction === "bottom") {
    state[payload.channelId].messages = [
      ...state[payload.channelId].messages,
      ...Object.keys(payload.messages)
    ];

    if (state[payload.channelId].messages.length > extendedCapacity) {
      state[payload.channelId].messages = state[
        payload.channelId
      ].messages.slice(-100);
    }
  } else if (payload.direction === "top") {
    state[payload.channelId].messages = [
      ...Object.keys(payload.messages),
      ...state[payload.channelId].messages
    ];

    if (state[payload.channelId].messages.length > extendedCapacity) {
      state[payload.channelId].messages = state[
        payload.channelId
      ].messages.slice(0, 100);
    }
  }

  // if (payload.direction === "bottom") {
  //   state[payload.channelId] = state[payload.channelId]
  //     ? _.uniqBy([...state[payload.channelId], ...payload.messages], "id")
  //     : payload.messages;

  //   if (state[payload.channelId].length > extendedCapacity) {
  //     state[payload.channelId] = state[payload.channelId].slice(-100);
  //   }
  // } else if (payload.direction === "top") {
  //   state[payload.channelId] = state[payload.channelId]
  //     ? _.uniqBy([...payload.messages, ...state[payload.channelId]], "id")
  //     : payload.messages;

  //   if (state[payload.channelId].length > extendedCapacity) {
  //     state[payload.channelId] = state[payload.channelId].slice(0, 100);
  //   }
  // }
};
const R_updateLastMessageUpdateLatest = (state, { payload }) => {
  state[payload.channelId].lastMessagesUpdateByWebsockets = false;
  state[payload.channelId] = {
    capacity: 50,
    initialScroll: null
  };
};

const R_deletedMessageUpdate = (state, { payload }) => {
  state[payload.channelId].messages = state[payload.channelId].messages.filter(
    msgId => msgId !== payload.messageId
  );
  state[payload.channelId].firstMessageId = payload.firstMessageId;
  state[payload.channelId].lastMessageId = payload.lastMessageId;
  state[payload.channelId].lastMessageAt = payload.lastMessageAt;
};

const R_deletedPostUpdate = (state, { payload }) => {
  const { channelId, postId, firstPostId, lastPostId, lastPostAt } = payload;

  state[channelId].firstPostId = firstPostId;
  state[channelId].lastPostId = lastPostId;
  state[channelId].lastPostAt = lastPostAt;
  state[channelId].posts = state[channelId].posts.filter(
    pstId => pstId !== postId
  );
};

const R_updatePostInfo = (state, { payload }) => {
  const { channelId, post } = payload;

  if (!state[channelId].firstPostId) {
    state[channelId].firstPostId = post.id;
  }
  state[channelId].lastPostId = post.id;
  state[channelId].lastPostAt = post.createdAt;

  state[channelId].posts = [post.id, ...state[channelId].posts].slice(-20);
};

const R_addMember = (state, { payload }) => {
  state[payload.channelId].members.push(payload.userId);
};

const R_addMembers = (state, { payload }) => {
  state[payload.channel.id].members = payload.channel.members;
};

const R_deleteMember = (state, { payload }) => {
  state[payload.channelId].members = state[payload.channelId].members.filter(
    userId => userId !== payload.userId
  );
};

const R_addAdmin = (state, { payload }) => {
  state[payload.channelId].admins.push(payload.userId);
};

const R_addAdminWs = (state, { payload }) => {
  state[payload.channelId].admins.push(payload.userId);

  if (payload.banned) {
    state[payload.channelId].banned = payload.banned;
  }
};

const R_deleteAdmin = (state, { payload }) => {
  state[payload.channelId].admins = state[payload.channelId].admins.filter(
    userId => userId !== payload.userId
  );
};

const R_addBan = (state, { payload }) => {
  state[payload.channelId].members = state[payload.channelId].members.filter(
    userId => userId !== payload.userId
  );
  state[payload.channelId].admins = state[payload.channelId].admins.filter(
    userId => userId !== payload.userId
  );
  state[payload.channelId].banned.push(payload.userId);
};

const R_deleteBan = (state, { payload }) => {
  state[payload.channelId].banned = state[payload.channelId].banned.filter(
    userId => userId !== payload.userId
  );
};

const R_deleteChannel = (state, { payload }) => {
  const channelId = payload.id || payload.channelId;

  if (channelId) {
    delete state[channelId];
  }
};

const R_updateChannelInitialScroll = (state, { payload }) => {
  if (state[payload.channelId]) {
    // state[payload.channelId].chatSettings.capacity =
    //   payload.initialScroll === null ? 50 : extendedCapacity;
    // state[payload.channelId].chatSettings.initialScroll = payload.initialScroll;
    state[payload.channelId].capacity =
      payload.initialScroll === null ? 50 : extendedCapacity;
    state[payload.channelId].initialScroll = payload.initialScroll;
  }
};

const R_updateSearchedVideos = (state, { payload }) => {
  let results = [];
  if (payload.next) {
    results = [
      ...state[payload.channelId].videoSearch.results,
      ...payload.results
    ];
  } else {
    results = [...payload.results];
  }

  state[payload.channelId].videoSearch = {
    source: payload.source,
    terms: payload.terms,
    results: results,
    totalResults: payload.totalResults,
    page: payload.page ? payload.page : 1,
    searched: true
  };
};

const R_updateFriendRoomToOnline = (state, { payload }) => {
  state[payload.channelId].online = true;
};

const R_updateFriendRoomToOffline = (state, { payload }) => {
  state[payload.channelId].online = false;
};

const R_resetState = () => initialState;

const R_addVideo = (state, { payload }) => {
  state[payload.channelId].queue.push({
    ...payload.video,
    channelId: payload.channelId
  });

  R_updateChannel(state, { payload });
};

const R_deleteVideo = (state, { payload }) => {
  state[payload.channelId].queue.splice(payload.queuePosition, 1);

  R_updateChannel(state, { payload });
};

const R_swapVideos = (state, { payload }) => {
  const channelId = payload.channelId;

  state[channelId].queue = arrayMove(
    state[channelId].queue,
    payload.oldIndex,
    payload.newIndex
  );

  R_updateChannel(state, { payload });
};

// See what the server returns when inviting friends
// Only add users? Or update channel?
// Only add users, so that data is in sync?

export default createReducer(initialState, {
  [validateSession.fulfilled]: R_initChannels,
  [refreshSession.fulfilled]: R_refreshChannels,
  [login.fulfilled]: R_initChannels,
  [getChannel.fulfilled]: R_addChannel,
  [addChannel.fulfilled]: R_addChannel,
  [createRoom.fulfilled]: R_addChannel,
  [acceptFriendRequest.fulfilled]: R_addChannel,
  [addFriendWs]: R_addChannel,
  [addChannelWs]: R_addChannel,
  [updateChannel.fulfilled]: R_updateChannel,
  [updateRoom.fulfilled]: R_updateChannel,
  [updateChannelWs]: R_updateChannel,
  [deleteChannel.fulfilled]: R_deleteChannel,
  [deleteChannelWs]: R_deleteChannel,
  [leaveRoom.fulfilled]: R_deleteChannel,
  [deleteChannelWs]: R_deleteChannel,
  [deleteFriend.fulfilled]: R_deleteChannel,
  [deleteFriendWs]: R_deleteChannel,
  [blockUser.fulfilled]: R_deleteChannel,
  [addBlockerWs]: R_deleteChannel,
  [addRoomMembers.fulfilled]: R_addMembers,
  [addMembersWs]: R_addMembers,
  [followChannel.fulfilled]: R_addMember,
  [addMemberWs]: R_addMember,
  [unfollowChannel.fulfilled]: R_deleteMember,
  [deleteMemberWs]: R_deleteMember,
  [addAdmin.fulfilled]: R_addAdmin,
  [addAdminWs]: R_addAdminWs,
  [deleteAdmin.fulfilled]: R_deleteAdmin,
  [deleteAdminWs]: R_deleteAdmin,
  [addBan.fulfilled]: R_addBan,
  [addBanWs]: R_addBan,
  [deleteBan.fulfilled]: R_deleteBan,
  [deleteBanWs]: R_deleteBan,
  [addMessage.pending]: R_updateLastMessageInfoPending,
  [addMessage.fulfilled]: R_updateLastMessageInfo,
  [addMessageWs]: R_updateLastMessageInfoWs,
  [setLastMessageSeen.fulfilled]: R_setLastMessageSeen,
  [getMessages.fulfilled]: R_addMessages,
  [getLatestMessages.fulfilled]: R_updateLastMessageUpdateLatest,
  [deleteMessage.fulfilled]: R_deletedMessageUpdate,
  [deleteMessageWs]: R_deletedMessageUpdate,
  [addPost.fulfilled]: R_updatePostInfo,
  [addPostWs]: R_updatePostInfo,
  [deletePost.fulfilled]: R_deletedPostUpdate,
  [deletePostWs]: R_deletedPostUpdate,
  [setInitialScroll]: R_updateChannelInitialScroll,
  [searchVideos.fulfilled]: R_updateSearchedVideos,
  [friendOnlineWs]: R_updateFriendRoomToOnline,
  [friendOfflineWs]: R_updateFriendRoomToOffline,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState,
  [setPlaying.fulfilled]: R_updateChannel,
  [setPaused.fulfilled]: R_updateChannel,
  [addVideo.fulfilled]: R_addVideo,
  [addVideoWs]: R_addVideo,
  [deleteVideo.fulfilled]: R_deleteVideo,
  [deleteVideoWs]: R_deleteVideo,
  [swapVideos.fulfilled]: R_swapVideos,
  [swapVideosWs]: R_swapVideos
});
