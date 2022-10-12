import {
  login,
  register,
  createRoom,
  addRoomMembers,
  deleteAccount,
  updateUser,
  searchUsers,
  addChannel,
  getChannel,
  updateChannel,
  deleteChannel,
  updateRoom,
  addAdmin,
  deleteAdmin,
  addBan,
  deleteBan,
  leaveRoom,
  addMessage,
  getMessages,
  getLatestMessages,
  deleteMessage,
  addPost,
  getPosts,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  getComments,
  deleteComment,
  likeComment,
  unlikeComment,
  followChannel,
  unfollowChannel,
  getUserInfo,
  getUserInfoModal,
  getFollowingChannels,
  getDiscoverChannels,
  getTrendingChannels,
  searchChannels
} from "../actions";

const formatType = type => type.split("/").slice(0, 2).join("/");

const idsOfActions = {
  [formatType(register.fulfilled.type)]: "registerApi",
  [formatType(login.fulfilled.type)]: "loginApi",
  [formatType(deleteAccount.fulfilled.type)]: "deleteAccountApi",
  [formatType(updateUser.fulfilled.type)]: "userUpdateApi",
  [formatType(searchUsers.fulfilled.type)]: "userSearchApi",
  [formatType(addChannel.fulfilled.type)]: "channel",
  [formatType(getChannel.fulfilled.type)]: "channel",
  [formatType(updateChannel.fulfilled.type)]: "channel",
  [formatType(deleteChannel.fulfilled.type)]: "channel",
  [formatType(leaveRoom.fulfilled.type)]: "channel",
  [formatType(addAdmin.fulfilled.type)]: "manageUsers",
  [formatType(deleteAdmin.fulfilled.type)]: "manageUsers",
  [formatType(addBan.fulfilled.type)]: "manageUsers",
  [formatType(deleteBan.fulfilled.type)]: "manageUsers",
  [formatType(createRoom.fulfilled.type)]: "invite",
  [formatType(addRoomMembers.fulfilled.type)]: "invite",
  [formatType(updateRoom.fulfilled.type)]: "room",
  [formatType(followChannel.fulfilled.type)]: "followChannel",
  [formatType(unfollowChannel.fulfilled.type)]: "followChannel",
  // MESSAGES
  [formatType(addMessage.fulfilled.type)]: "addMessage",
  [formatType(getMessages.fulfilled.type)]: "messages",
  [formatType(getLatestMessages.fulfilled.type)]: "messages",
  [formatType(deleteMessage.fulfilled.type)]: "deleteMessage",
  // POSTS
  [formatType(addPost.fulfilled.type)]: "addPost",
  [formatType(getPosts.fulfilled.type)]: "posts",
  [formatType(deletePost.fulfilled.type)]: "deletePost",
  [formatType(likePost.fulfilled.type)]: "post",
  [formatType(unlikePost.fulfilled.type)]: "post",
  // COMMENTS
  [formatType(addComment.fulfilled.type)]: "addComment",
  [formatType(getComments.fulfilled.type)]: "comments",
  [formatType(deleteComment.fulfilled.type)]: "deleteComment",
  [formatType(likeComment.fulfilled.type)]: "comment",
  [formatType(unlikeComment.fulfilled.type)]: "comment",
  [formatType(getUserInfo.fulfilled.type)]: "userPage",
  [formatType(getUserInfoModal.fulfilled.type)]: "userPageModal",
  // MAINPAGE
  [formatType(getFollowingChannels.fulfilled.type)]: "followingChannels",
  [formatType(getDiscoverChannels.fulfilled.type)]: "discoverChannels",
  [formatType(getTrendingChannels.fulfilled.type)]: "trendingChannels",
  [formatType(searchChannels.fulfilled.type)]: "channelSearch"
};

const initialState = Object.values(idsOfActions)
  .map(id => ({ [id]: { status: "initial" } }))
  .reduce((obj, item) => ({ ...obj, ...item }));

export default (state = initialState, { type, meta, error }) => {
  if (type === "api/clearError") {
    return { ...state, userUpdateApi: { status: "initial" } };
  }

  if (!meta) return state;

  const actionId = idsOfActions[formatType(type)];

  if (!actionId) return state;

  const currentStatus = state[actionId].status;
  const args = meta.arg;

  if (type.endsWith("pending") && currentStatus !== "loading") {
    return {
      ...state,
      [actionId]: { status: "loading", loading: true, args }
    };
  } else if (type.endsWith("fulfilled") && currentStatus === "loading") {
    return {
      ...state,
      [actionId]: { status: "success", args }
    };
  } else if (type.endsWith("rejected") && currentStatus === "loading") {
    return {
      ...state,
      [actionId]: {
        status: "error",
        error: error.message || true,
        args
      }
    };
  }

  return state;
};
