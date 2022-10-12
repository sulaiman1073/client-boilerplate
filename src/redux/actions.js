import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../helpers/api";
import {
  // PUSH_MODAL,
  // PUSH_MODAL_PROFILE_MODAL,
  // PUSH_MODAL_DELETE_MESSAGE,
  // PUSH_MODAL_DELETE_CHANNEL,
  // POP_MODAL,
  // POP_ALL_MODAL,
  MODAL_CREATE_NEW_ACCOUNT,
  MODAL_CREATE_ROOM,
  MODAL_INVITE,
  MODAL_PROFILE,
  MODAL_WATCHING,
  // MODAL_MEMBERS,
  MODAL_FOLLOWERS,
  MODAL_LIST,
  MODAL_USER_SETTINGS,
  MODAL_EDIT_USER_SETTINGS,
  MODAL_CHANGE_PASSWORD,
  MODAL_BLOCKED_USERS,
  MODAL_IMAGE,
  // CLOSE_ALL_MODAL,
  MODAL_DELETE_MESSAGE,
  MODAL_ACCOUNT_SETTINGS,
  MODAL_DELETE_ACCOUNT,
  MODAL_DELETE_CHANNEL,
  MODAL_DELETE_POST,
  MODAL_ROOM_EXISTS,
  MODAL_SOCIAL_SHARE,
  VIDEO_RESULTS_PER_PAGE
} from "../helpers/constants";
import moment from "moment";
/* -------------------------------------------------------------------------- */
/*                                   GENERAL                                  */
/* -------------------------------------------------------------------------- */
export const wsConnect = createAction("general/wsConnect");
export const wsDisconnect = createAction("general/wsDisconnect");

export const validateSession = createAsyncThunk(
  "general/validateSession",
  async () => {
    const response = await api.validateSession();
    return response.data;
  }
);

export const refreshSession = createAsyncThunk(
  "general/refreshSession",
  async () => {
    const response = await api.refreshSession();
    return response.data;
  }
);

export const login = createAsyncThunk("general/login", async loginInfo => {
  try {
    const response = await api.login(loginInfo);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("Incorrect login info");
    } else {
      throw new Error("Couldn't log in");
    }
  }
});
export const logout = createAsyncThunk("general/logout", async () => {
  await api.logout();
  return {};
});
export const register = createAsyncThunk(
  "general/register",
  async registerInfo => {
    try {
      await api.register(registerInfo);
      return {
        usernameOrEmail: registerInfo.username,
        password: registerInfo.password
      };
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Couldn't register");
      }
    }
  }
);
export const deleteAccount = createAsyncThunk(
  "general/deleteAccount",
  async () => {
    await api.deleteAccount();
  }
);
/* -------------------------------------------------------------------------- */
/*                                    SELF                                    */
/* -------------------------------------------------------------------------- */

export const updateUser = createAsyncThunk(
  "self/updateUser",
  async (updateInfo, { getState }) => {
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        email,
        avatar
      } = getState().self;

      const formData = new FormData();

      if (updateInfo.firstName && updateInfo.firstName !== firstName) {
        formData.append("firstName", updateInfo.firstName);
      }
      if (updateInfo.lastName && updateInfo.lastName !== lastName) {
        formData.append("lastName", updateInfo.lastName);
      }
      if (updateInfo.dateOfBirth && updateInfo.dateOfBirth !== dateOfBirth) {
        formData.append("dateOfBirth", updateInfo.dateOfBirth);
      }
      if (updateInfo.email && updateInfo.email !== email) {
        formData.append("email", updateInfo.email);
      }
      if (updateInfo.password && updateInfo.password) {
        formData.append("password", updateInfo.password);
      }
      if (updateInfo.newPassword) {
        formData.append("newPassword", updateInfo.newPassword);
      }
      if (updateInfo.avatar === null) {
        formData.append("removeAvatar", true);
      } else if (updateInfo.avatar && updateInfo.avatar !== avatar) {
        const blob = await fetch(updateInfo.avatar).then(r => r.blob());
        formData.append("avatar", blob);
      }

      const response = await api.updateUser(formData);

      return { ...response.data };
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error();
      }
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                                RELATIONSHIPS                               */
/* -------------------------------------------------------------------------- */
export const sendFriendRequest = createAsyncThunk(
  "relationships/sendFriendRequest",
  async userId => {
    const response = await api.sendFriendRequest(userId);
    return response.data;
  }
);
export const cancelFriendRequest = createAsyncThunk(
  "relationships/cancelFriendRequest",
  async userId => {
    const response = await api.cancelFriendRequest(userId);
    return response.data;
  }
);
export const acceptFriendRequest = createAsyncThunk(
  "relationships/acceptFriendRequest",
  async userId => {
    const response = await api.acceptFriendRequest(userId);
    return response.data;
  }
);
export const rejectFriendRequest = createAsyncThunk(
  "relationships/rejectFriendRequest",
  async userId => {
    const response = await api.rejectFriendRequest(userId);
    return response.data;
  }
);
export const deleteFriend = createAsyncThunk(
  "relationships/deleteFriend",
  async userId => {
    const response = await api.unfriendUser(userId);
    return response.data;
  }
);

export const blockUser = createAsyncThunk(
  "relationships/blockUser",
  async user => {
    const response = await api.blockUser(user.id);
    return { ...response.data, user };
  }
);
export const unblockUser = createAsyncThunk(
  "relationships/unblockUser",
  async userId => {
    const response = await api.unblockUser(userId);
    return response.data;
  }
);

export const deleteSentFriendRequestWs = createAction(
  "relationships/deleteSentFriendRequest/ws"
);
export const addReceivedFriendRequestWs = createAction(
  "relationships/addReceivedFriendRequest/ws"
);
export const deleteReceivedFriendRequestWs = createAction(
  "relationships/deleteReceivedFriendRequestWs/ws"
);

export const addFriendWs = createAction("relationships/addFriend/ws");
export const deleteFriendWs = createAction("relationships/deleteFriend/ws");
export const addBlockerWs = createAction("relationships/addBlocker/ws");
export const deleteBlockerWs = createAction("relationships/deleteBlocker/ws");

// ACCEPT FR OR ADDFRIENDWS -> ADD CHANNEL (channel, self, chat settings, users, ...etc)
// DELETE FRIEND OR BLOCKUSER OR ADD BLOCKER -> DELETE CHANNEL
/* -------------------------------------------------------------------------- */
/*                                  CHANNELS                                  */
/* -------------------------------------------------------------------------- */

export const getChannel = createAsyncThunk(
  "channels/getChannel",
  async channelInfo => {
    const response = await api.getChannel(channelInfo);
    return response.data;
  }
);

export const visitAndLeaveChannel = createAsyncThunk(
  "channels/visitAndLeaveChannel",
  async visitAndLeaveInfo => {
    const response = await api.visitAndLeaveChannel(visitAndLeaveInfo);
    return response.data;
  }
);

export const addChannel = createAsyncThunk(
  "channels/addChannel",
  async channelInfo => {
    try {
      const formData = new FormData();
      formData.append("name", channelInfo.name);
      formData.append("description", channelInfo.description);
      formData.append("public", channelInfo.public);
      // formData.append("categories", channelInfo.categories);
      if (channelInfo.icon) {
        const blob = await fetch(channelInfo.icon).then(r => r.blob());
        formData.append("icon", blob);
      }

      const response = await api.createChannel(formData);

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error();
      }
    }
  }
);
export const addChannelWs = createAction("channels/addChannel/ws");

export const updateChannel = createAsyncThunk(
  "channels/updateChannel",
  async (updateInfo, { getState }) => {
    try {
      const channelId = updateInfo.channelId;
      const channel = getState().channels[channelId];

      const formData = new FormData();
      if (updateInfo.name !== channel.name) {
        formData.append("name", updateInfo.name);
      }
      if (updateInfo.description !== channel.description) {
        formData.append("description", updateInfo.description);
      }
      if (updateInfo.public !== channel.public) {
        formData.append("public", updateInfo.public);
      }
      if (updateInfo.icon === null) {
        formData.append("removeIcon", true);
      } else if (updateInfo.icon && updateInfo.icon !== channel.icon) {
        const blob = await fetch(updateInfo.icon).then(r => r.blob());
        formData.append("icon", blob);
      }
      const response = await api.updateChannel(channelId, formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error();
      }
    }
  }
);
export const updateChannelWs = createAction("channels/updateChannel/ws");

export const deleteChannel = createAsyncThunk(
  "channels/deleteChannel",
  async channelId => {
    const response = await api.deleteChannel(channelId);
    return response.data;
  }
);
export const deleteChannelWs = createAction("channels/deleteChannel/ws");

export const addAdmin = createAsyncThunk(
  "channels/addAdmin",
  async updateInfo => {
    const response = await api.updateMember({ ...updateInfo, type: "admin" });
    return response.data;
  }
);
export const addAdminWs = createAction("channels/addAdmin/ws");

/* ----------------------------- MEMBERS --------------------------------- */

export const makeAdmin = createAsyncThunk(
  "members/makeAdmin",
  async ({ channelId, userId }) => {
    const response = await api.makeAdmin(channelId, userId);
    return response.data;
  }
);

export const deleteAdmin = createAsyncThunk(
  "members/deleteAdmin",
  async ({ channelId, userId }) => {
    const response = await api.deleteAdmin(channelId, userId);
    return response.data;
  }
);

export const addBan = createAsyncThunk(
  "members/addBan",
  async ({ channelId, bannedId }) => {
    const response = await api.addBan(channelId, bannedId);
    return response.data;
  }
);

export const deleteBan = createAsyncThunk(
  "members/deleteBan",
  async ({ channelId, bannedId }) => {
    const response = await api.deleteBan(channelId, bannedId);
    return response.data;
  }
);

export const addRoomMembers = createAsyncThunk(
  "members/addRoomMembers",
  async inviteInfo => {
    const { channelId, selectedFriends } = inviteInfo;
    const response = await api.addRoomMembers(channelId, selectedFriends);
    return response.data;
  }
);

export const deleteAdminWs = createAction("channels/deleteAdmin/ws");

export const addBanWs = createAction("channels/addBan/ws");

export const deleteBanWs = createAction("channels/deleteBan/ws");

export const addMemberWs = createAction("channels/addMember/ws");
export const addMembersWs = createAction("channels/addMembers/ws");
export const deleteMemberWs = createAction("channels/deleteMember/ws");

export const leaveRoom = createAsyncThunk(
  "channels/leaveRoom",
  async roomId => {
    const response = await api.leaveRoom(roomId);
    console.log("RES", response.data);
    return response.data;
  }
);
export const updateRoom = createAsyncThunk(
  "channels/updateRoom",
  async updateInfo => {
    const response = await api.updateRoom(updateInfo);
    return response.data;
  }
);

export const followChannel = createAsyncThunk(
  "channels/followChannel",
  async channelInfo => {
    const response = await api.followChannel(channelInfo);
    return response.data;
  }
);
export const unfollowChannel = createAsyncThunk(
  "channels/unfollowChannel",
  async channelId => {
    const response = await api.unfollowChannel(channelId);
    return response.data;
  }
);

export const setInitialScroll = createAction("chatSettings/setInitialScroll");

export const friendOnlineWs = createAction("channels/friendOnline/ws");
export const friendOfflineWs = createAction("channels/friendOffline/ws");
/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  MESSAGES                                  */
/* -------------------------------------------------------------------------- */
export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async messagesInfo => {
    const response = await api.getMessages(messagesInfo);

    return {
      ...response.data,
      direction: messagesInfo.afterMessageId ? "bottom" : "top"
    };
  }
);
export const getLatestMessages = createAsyncThunk(
  "messages/getLatestMessages",
  async messagesInfo => {
    const response = await api.getMessages(messagesInfo);

    return {
      ...response.data,
      direction: messagesInfo.afterMessageId ? "bottom" : "top"
    };
  }
);

export const addMessage = createAsyncThunk(
  "messages/addMessage",
  async (message, { getState }) => {
    const infoObject = {
      channelId: message.channelId,
      content: message.content,
      upload: message.upload
    };
    const response = await api.addMessage(infoObject);
    const payload = response.data;
    const { capacity } = getState().channels[payload.channelId].chatSettings;
    return { ...payload, capacity };
  }
);

export const addMessageWs = createAction("messages/addMessage/ws");

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async ({ status, id, channelId }) => {
    const response = await api.deleteMessage(id);
    return response.data;
    // if (status === undefined || status === "accepted") {
    //   const response = await api.deleteMessage(id);
    //   return response.data;
    // } else {
    //   return { status, id, channelId };
    // }
  }
);
export const deleteMessageWs = createAction("messages/deleteMessage/ws");
/* -------------------------------------------------------------------------- */
/*                                  NOTIFICATIONS                             */
/* -------------------------------------------------------------------------- */

export const setLastMessageSeen = createAction(
  "messages/setLastMessageSeen",
  async messageInfo => {
    const response = await api.deleteNotification(messageInfo.channelId);
    return response.data;
  }
);

/* -------------------------------------------------------------------------- */
/*                                    POSTS                                   */
/* -------------------------------------------------------------------------- */
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (channelId, { getState }) => {
    const posts = getState().posts[channelId];
    const beforePostId = posts[posts.length - 1].id;

    const response = await api.getPosts({
      channelId,
      beforePostId
    });

    return response.data;
  }
);

export const addPost = createAsyncThunk("posts/addPost", async postInfo => {
  const response = await api.addPost(postInfo);
  return response.data;
});
export const addPostWs = createAction("posts/addPost/ws");

export const deletePost = createAsyncThunk("posts/deletePost", async postId => {
  const response = await api.deletePost(postId);
  return response.data;
});
export const deletePostWs = createAction("posts/deletePost/ws");

export const flushPosts = createAction("posts/flushPosts");

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (likeInfo, { getState }) => {
    const { id: ownId } = getState().self;
    const { postId } = likeInfo;
    const response = await api.addLike({ postId });
    return { ...response.data, ownId };
  }
);
export const likePostWs = createAction("posts/likePost/ws");

export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async (likeInfo, { getState }) => {
    const { id: ownId } = getState().self;
    const { postId } = likeInfo;
    const response = await api.deleteLike({ postId });
    return { ...response.data, ownId };
  }
);
export const unlikePostWs = createAction("posts/unlikePost/ws");

export const incrementCommentCountWs = createAction(
  "posts/incrementCommentCount/ws"
);
export const decrementCommentCountWs = createAction(
  "posts/decrementCommentCount/ws"
);
/* -------------------------------------------------------------------------- */
/*                                  COMMENTS                                  */
/* -------------------------------------------------------------------------- */
export const getComments = createAsyncThunk(
  "comments/getComments",
  async commentsInfo => {
    const response = await api.getComments(commentsInfo);

    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (commentInfo, { getState }) => {
    const ownId = getState().self.id;
    const response = await api.addComment(commentInfo);
    return { ...response.data, ownId };
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentInfo, { getState }) => {
    const ownId = getState().self.id;
    const { commentId } = commentInfo;
    const response = await api.deleteComment(commentId);
    return { ...response.data, ownId };
  }
);

export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async (likeInfo, { getState }) => {
    const { id: ownId } = getState().self;
    const { commentId } = likeInfo;
    const response = await api.addLike({ commentId });
    return { ...response.data, ownId };
  }
);

export const unlikeComment = createAsyncThunk(
  "comments/unlikeComment",
  async (likeInfo, { getState }) => {
    const { id: ownId } = getState().self;
    const { commentId } = likeInfo;
    const response = await api.deleteLike({ commentId });
    return { ...response.data, ownId };
  }
);

export const addCommentWs = createAction("comments/addComment/ws");
export const deleteCommentWs = createAction("comments/deleteComment/ws");

export const likeCommentWs = createAction("comments/likeComment/ws");
export const unlikeCommentWs = createAction("comments/unlikeComment/ws");
/* -------------------------------------------------------------------------- */
/*                                   DRAFTS                                   */
/* -------------------------------------------------------------------------- */
export const setChatDraft = createAction("chatDrafts/setChatDraft");
export const setPostDraft = createAction("postDrafts/setPostDraft");
/* -------------------------------------------------------------------------- */
/*                                   INVITE                                   */
/* -------------------------------------------------------------------------- */
export const addInviteChannel = createAction("invite/addInviteChannel");
export const addInviteFriend = createAction("invite/addInviteFriend");
export const removeInviteFriend = createAction("invite/removeInviteFriend");

export const createRoom = createAsyncThunk(
  "invite/createRoom",
  async selectedFriends => {
    const response = await api.createRoom(selectedFriends);
    return response.data;
  }
);

/* -------------------------------------------------------------------------- */
/*                                 USERSEARCH                                 */
/* -------------------------------------------------------------------------- */
export const searchUsers = createAsyncThunk(
  "userSearch/searchUsers",
  async (username, { getState }) => {
    const { blocked, blockers } = getState().relationships;
    const blocks = [...blocked, ...blockers];

    if (username.trim().length > 0) {
      const response = await api.searchUsers(username);
      return {
        users: response.data.filter(user => !blocks.includes(user.id))
      };
    } else {
      return { users: [] };
    }
  }
);

export const clearUserSearch = createAction("userSearch/clear");

export const searchUsersWs = createAction(searchUsers.fulfilled.type);

/* -------------------------------------------------------------------------- */
/*                                 VIDEOSEARCH                                */
/* -------------------------------------------------------------------------- */

export const searchVideos = createAsyncThunk(
  "videoSearch/searchVideos",
  async (searchInfo, { getState }) => {
    const { source, next, terms, channelId } = searchInfo;
    const { page, source: currSource, terms: prevTerms } = getState().channels[
      channelId
    ].videoSearch;

    const finalTerms = next ? prevTerms : terms.trim();
    const finalSource = source ? source : currSource;

    let response = null;
    if (finalTerms && finalTerms !== "") {
      response = await api.searchVideos(
        finalSource,
        finalTerms,
        next ? page : null
      );
    }

    return {
      channelId,
      source: finalSource,
      next,
      terms: response ? finalTerms : "",
      page: response ? response.data.nextPageToken : 1,
      totalResults: response ? response.data.totalResults : 1,
      results: response ? response.data.results : []
    };
  }
);

export const getTrending = createAsyncThunk(
  "videoSearch/getTrending",
  async (searchInfo, { getState }) => {
    const { source, next } = searchInfo;
    const {
      page,
      source: currSource,
      results
    } = getState().general.trendingResults;

    const finalSource = source ? source : currSource;
    let finalPage = page;
    if (!next || page === 1 || currSource !== finalSource) {
      finalPage = null;
    }

    if (
      !next &&
      results.length <= VIDEO_RESULTS_PER_PAGE &&
      finalSource === currSource
    ) {
      return null;
    } else {
      const response = await api.searchVideos(finalSource, null, finalPage);

      return {
        source: finalSource,
        next,
        page: response ? response.data.nextPageToken : 1,
        totalResults: response ? response.data.totalResults : 1,
        results: response ? response.data.results : []
      };
    }
  }
);

export const addVideo = createAsyncThunk(
  "videoSearch/addVideo",
  async videoInfo => {
    const { channelId, ...minVideoInfo } = videoInfo;
    const response = await api.addVideo(channelId, minVideoInfo);
    return response.data;
  }
);

export const deleteVideo = createAsyncThunk(
  "videoSearch/deleteVideo",
  async videoInfo => {
    const { channelId, channelVideoId } = videoInfo;
    const response = await api.deleteVideo(channelVideoId, channelId);
    return response.data;
  }
);

export const swapVideos = createAsyncThunk(
  "videoSearch/swapVideos",
  async swapInfo => {
    const { channelId, ...minSwapInfo } = swapInfo;
    const response = await api.swapVideos(channelId, minSwapInfo);
    return response.data;
  }
);

export const addVideoWs = createAction("videoSearch/addVideo/ws");
export const deleteVideoWs = createAction("videoSearch/deleteVideo/ws");
export const swapVideosWs = createAction("videoSearch/swapVideos/ws");

/* -------------------------------------------------------------------------- */
/*                                CHANNELSEARCH                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 USERPROFILE                                */
/* -------------------------------------------------------------------------- */

export const getUserInfo = createAsyncThunk(
  "userProfile/getUserInfo",
  async (userId, { getState }) => {
    const { blockers } = getState().relationships;
    if (blockers.includes(userId)) throw new Error();

    const response = await api.getUser(userId);
    return response.data;
  }
);
export const getUserInfoModal = createAsyncThunk(
  "userProfile/getUserInfoModal",
  async (userId, { getState }) => {
    const { blockers } = getState().relationships;
    if (blockers.includes(userId)) throw new Error();

    const response = await api.getUser(userId);
    return response.data;
  }
);
/* -------------------------------------------------------------------------- */
/*                                    MODAL                                   */
/* -------------------------------------------------------------------------- */

export const closeModal = createAction("modal/close");
export const closeAllModals = createAction("modal/closeAll");
export const closeModalFinal = createAction("modal/closeModalFinal");

export const openCreateNewAccountModal = createAction("modal/open", () => ({
  payload: { component: MODAL_CREATE_NEW_ACCOUNT }
}));
export const openInviteModal = createAction(
  "modal/open",
  (channelId, isCreatingNewRoom) => ({
    payload: { component: MODAL_INVITE, channelId, isCreatingNewRoom }
  })
);
export const openSocialShareModal = createAction("modal/open", () => ({
  payload: { component: MODAL_SOCIAL_SHARE }
}));
export const openCreateRoomModal = createAction("modal/open", () => ({
  payload: { component: MODAL_CREATE_ROOM }
}));
export const openProfileModal = createAction("modal/open", userId => ({
  payload: { component: MODAL_PROFILE, userId }
}));
export const openDeleteMessageModal = createAction(
  "modal/open",
  ({ channelId, messageId }) => ({
    payload: { component: MODAL_DELETE_MESSAGE, channelId, messageId }
  })
);
export const openDeleteChannelModal = createAction("modal/open", channelId => ({
  payload: { component: MODAL_DELETE_CHANNEL, channelId }
}));
export const openDeletePostModal = createAction("modal/open", postId => {
  return { payload: { component: MODAL_DELETE_POST, postId } };
});
export const openWatchingModal = createAction("modal/open", () => ({
  payload: { component: MODAL_WATCHING }
}));
export const openFollowersModal = createAction("modal/open", channelId => ({
  payload: { component: MODAL_FOLLOWERS, channelId }
}));
export const openListModal = createAction(
  "modal/open",
  (channelId, content) => ({
    payload: { component: MODAL_LIST, channelId, content }
  })
);
export const openImageModal = createAction("modal/open", () => ({
  payload: { component: MODAL_IMAGE }
}));
export const openUserSettingsModal = createAction("modal/open", () => ({
  payload: { component: MODAL_USER_SETTINGS }
}));
export const openEditUserSettingsModal = createAction("modal/open", () => ({
  payload: { component: MODAL_EDIT_USER_SETTINGS }
}));
export const openChangePasswordModal = createAction("modal/open", () => ({
  payload: { component: MODAL_CHANGE_PASSWORD }
}));
export const openBlockedUsersModal = createAction("modal/open", () => ({
  payload: { component: MODAL_BLOCKED_USERS }
}));
export const openAccountSettingsModal = createAction("modal/open", () => ({
  payload: { component: MODAL_ACCOUNT_SETTINGS }
}));
export const openDeleteAccountModal = createAction("modal/open", () => ({
  payload: { component: MODAL_DELETE_ACCOUNT }
}));
export const openRoomExistsModal = createAction(
  "modal/open",
  (room, selectedIds) => ({
    payload: { component: MODAL_ROOM_EXISTS, room, selectedIds }
  })
);

/* -------------------------------------------------------------------------- */
/*                                    UI                                      */
/* -------------------------------------------------------------------------- */

export const toggleLeftPanel = createAction("ui/toggleLeftPanel");
export const setLeftPanelActiveTabChannels = createAction(
  "ui/setLeftPanelActiveTabChannels"
);
export const setLeftPanelActiveTabFriends = createAction(
  "ui/setLeftPanelActiveTabFriends"
);
export const clearError = createAction("api/clearError");
export const setAlert = createAction("ui/setAlert");

/* -------------------------------------------------------------------------- */
/*                              VIDEO                                         */
/* -------------------------------------------------------------------------- */

export const setPlaying = createAsyncThunk(
  "video/setPlaying",
  async playerInfo => {
    const videoObject = {
      queueStartPosition: playerInfo.queueStartPosition,
      clockStartTime: moment().format(),
      videoStartTime: playerInfo.videoStartTime
    };
    const response = await api.setPlaying(playerInfo.channelId, videoObject);

    return response.data;
  }
);

export const setPaused = createAsyncThunk(
  "video/setPaused",
  async playerInfo => {
    const videoObject = {
      queueStartPosition: playerInfo.queueStartPosition,
      clockStartTime: moment().format(),
      videoStartTime: playerInfo.videoStartTime
    };
    const response = await api.setPaused(playerInfo.channelId, videoObject);

    return response.data;
  }
);

export const setVolume = createAction("video/setVolume");

/* -------------------------------------------------------------------------- */
/*                                  MainPage                                  */
/* -------------------------------------------------------------------------- */

export const getTrendingChannels = createAsyncThunk(
  "trendingChannels/getTrendingChannels",
  async () => {
    const response = await api.getTrendingChannels();
    return response.data;
  }
);

export const getDiscoverChannels = createAsyncThunk(
  "discoverChannels/getDiscoverChannels",
  async () => {
    const response = await api.getDiscoverChannels();
    return response.data;
  }
);

export const getFollowingChannels = createAsyncThunk(
  "followingChannels/getFollowingChannels",
  async () => {
    const response = await api.getFollowingChannels();
    return response.data;
  }
);

export const searchChannels = createAsyncThunk(
  "searchChannels/getSearchChannels",
  async searchInfo => {
    const response = await api.searchChannels(searchInfo);
    return response.data;
  }
);
