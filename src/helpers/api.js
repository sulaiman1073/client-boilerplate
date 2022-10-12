import axios from "axios";

const axiosConfig =
  process.env.NODE_ENV !== "production"
    ? {
        baseURL: "http://localhost:4000",
        withCredentials: true
      }
    : {
        baseURL: "https://api.popitalk.com",
        withCredentials: true
      };

const ax = axios.create(axiosConfig);
// SESSION

export const register = registerInfo => {
  return ax.post("/users", registerInfo);
};

export const login = loginInfo => {
  return ax.post("/sessions/login", loginInfo);
};

export const validateSession = () => {
  return ax.get("/sessions/validate");
};

export const refreshSession = () => {
  const refreshData = ax.get("/sessions/refresh");
  console.log({ refreshData });
  return refreshData;
};

export const logout = () => {
  return ax.post("/sessions/logout");
};

// SELF AND RELATIONSHIPS

export const updateUser = updateInfo => {
  return ax.put("/users", updateInfo);
};

export const deleteAccount = () => {
  return ax.delete("/users/");
};

export const blockUser = blockedId => {
  return ax.post("/users/blocks", { blockedId });
};

export const unblockUser = blockedId => {
  return ax.delete(`/users/blocks/${blockedId}`);
};

export const sendFriendRequest = requesteeId => {
  return ax.post("/users/friendRequests", { requesteeId });
};

export const cancelFriendRequest = requesteeId => {
  return ax.delete(`/users/friendRequests/${requesteeId}/cancel`);
};

export const rejectFriendRequest = requesterId => {
  return ax.delete(`/users/friendRequests/${requesterId}/reject`);
};

export const acceptFriendRequest = requesterId => {
  return ax.post("/users/friends", { requesterId });
};

export const unfriendUser = friendId => {
  return ax.delete(`/users/friends/${friendId}`);
};

// USERS

export const getUser = userId => {
  return ax.get(`/users/${userId}`);
};

export const searchUsers = (username, page) => {
  return ax.get(`/users?username=${username}${page ? `&page=${page}` : ""}`);
};

// CHANNELS

export const updateChannel = (channelId, updateInfo) => {
  return ax.put(`/channels/${channelId}`, updateInfo);
};

export const getChannel = ({ channelId, leave }) => {
  if (leave) {
    return ax.get(`/channels/channel?channelId=${channelId}&leave=${leave}`);
  } else {
    return ax.get(`/channels/channel?channelId=${channelId}`);
  }
};

export const visitAndLeaveChannel = ({ visit, leave }) => {
  if (visit && !leave) {
    return ax.post("/channels/visitAndLeave", {
      visit
    });
  } else if (!visit && leave) {
    return ax.post("/channels/visitAndLeave", {
      leave
    });
  } else if (visit && leave) {
    return ax.post("/channels/visitAndLeave", {
      visit,
      leave
    });
  }
};

export const createChannel = channelInfo => {
  return ax.post("/channels", channelInfo);
};

export const deleteChannel = channelId => {
  return ax.delete(`/channels/${channelId}`);
};

export const createRoom = userIds => {
  return ax.post("/channels/rooms", { userIds });
};

export const updateRoom = (roomId, updateInfo) => {
  return ax.put(`/channels/rooms/${roomId}`, updateInfo);
};

export const leaveRoom = roomId => {
  return ax.delete(`/channels/rooms/${roomId}`);
};

export const setPlaying = (channelId, videoObj) => {
  return ax.put(`/channels/${channelId}/play`, videoObj);
};

export const setPaused = (channelId, videoObj) => {
  return ax.put(`/channels/${channelId}/pause`, videoObj);
};

export const skipPlayer = (channelId, videoObj) => {
  return ax.put(`/channels/${channelId}/skip`, videoObj);
};

// MEMBERS

export const updateMember = updateInfo => {
  return ax.put("/members/", updateInfo);
};

export const addRoomMembers = (channelId, userIds) => {
  return ax.post(`/members/${channelId}/room`, { userIds });
};

export const makeAdmin = (channelId, userId) => {
  return ax.post(`/members/${channelId}/admins`, { adminId: userId });
};

export const deleteAdmin = (channelId, userId) => {
  return ax.delete(`/members/${channelId}/admins/${userId}`);
};

export const addBan = (channelId, bannedId) => {
  return ax.post(`/members/${channelId}/bans`, { bannedId });
};

export const deleteBan = (channelId, bannedId) => {
  return ax.delete(`/members/${channelId}/bans/${bannedId}`);
};

export const followChannel = channelId => {
  return ax.post(`/members/${channelId}`);
};

export const unfollowChannel = channelId => {
  return ax.delete(`/members/${channelId}`);
};

// VIDEOS

export const searchVideos = (source, terms, page) => {
  return ax.get(
    `/videos/search?source=${source}${
      terms ? `&terms=${encodeURI(terms)}` : ""
    }${page ? `&page=${page}` : ""}`
  );
};

export const addVideo = (channelId, videoInfo) => {
  return ax.post(`/videos/${channelId}`, { ...videoInfo });
};

export const deleteVideo = (channelVideoId, channelId) => {
  return ax.delete(`/videos/${channelVideoId}`, { data: { channelId } });
};

export const swapVideos = (channelId, swapInfo) => {
  return ax.put(`/videos/${channelId}`, swapInfo);
};

export const getQueue = channelId => {
  return ax.get(`/videos/queue/${channelId}`);
};

// MESSAGES

export const addMessage = messageInfo => {
  return ax.post("/messages", messageInfo);
};

export const getMessages = ({ channelId, afterMessageId, beforeMessageId }) => {
  if (!afterMessageId && !beforeMessageId) {
    return ax.get(`/messages/${channelId}`);
  }
  if (afterMessageId && !beforeMessageId) {
    return ax.get(`/messages/${channelId}?afterMessageId=${afterMessageId}`);
  }
  if (!afterMessageId && beforeMessageId) {
    return ax.get(`/messages/${channelId}?beforeMessageId=${beforeMessageId}`);
  }
  return ax.get(
    `/messages/${channelId}?afterMessageId=${afterMessageId}&beforeMessageId=${beforeMessageId}`
  );
};

export const deleteMessage = messageId => {
  return ax.delete(`/messages/${messageId}`);
};

// Notifications

export const deleteNotification = channelId => {
  return ax.delete(`/notifications/${channelId}`);
};

// POSTS

export const addPost = postInfo => {
  return ax.post("/posts", postInfo);
};

export const getPosts = ({ channelId, afterPostId, beforePostId }) => {
  if (!afterPostId && !beforePostId) {
    return ax.get(`/posts/${channelId}`);
  }
  if (afterPostId && !beforePostId) {
    return ax.get(`/posts/${channelId}?afterPostId=${afterPostId}`);
  }
  if (!afterPostId && beforePostId) {
    return ax.get(`/posts/${channelId}?beforePostId=${beforePostId}`);
  }
  return ax.get(
    `/posts/${channelId}?afterPostId=${afterPostId}&beforePostId=${beforePostId}`
  );
};

export const deletePost = postId => {
  return ax.delete(`/posts/${postId}`);
};

// COMMENTS

export const addComment = commentInfo => {
  return ax.post("/comments", commentInfo);
};

export const deleteComment = commentId => {
  return ax.delete(`/comments/${commentId}`);
};

export const getComments = ({ postId, afterCommentId, beforeCommentId }) => {
  if (!afterCommentId && !beforeCommentId) {
    return ax.get(`/comments/${postId}`);
  }
  if (afterCommentId && !beforeCommentId) {
    return ax.get(`/comments/${postId}?afterCommentId=${afterCommentId}`);
  }
  if (!afterCommentId && beforeCommentId) {
    return ax.get(`/comments/${postId}?beforeCommentId=${beforeCommentId}`);
  }
  return ax.get(
    `/comments/${postId}?afterCommentId=${afterCommentId}&beforeCommentId=${beforeCommentId}`
  );
};

// LIKES

export const addLike = ({ postId, commentId }) => {
  if (postId) {
    return ax.post(`/posts/${postId}/likes`, { postId });
  } else if (commentId) {
    return ax.post(`/comments/${commentId}/likes`, { commentId });
  }
};

export const deleteLike = ({ postId, commentId }) => {
  if (postId) {
    return ax.delete(`/posts/${postId}/likes`);
  } else if (commentId) {
    return ax.delete(`/comments/${commentId}/likes`);
  }
};

// GIFS

export const getTrendingGifs = offset => {
  return ax.get(`/gifs/trending/${offset}`);
};

export const getSearchGifs = ({ term, offset }) => {
  return ax.get(`/gifs/search?searchTerm=${term}&offset=${offset}`);
};

// Mainpage (Trending, Discover, Following, Channel Search)

export const getTrendingChannels = () => {
  return ax.get("/channels/trending");
};

export const getDiscoverChannels = () => {
  return ax.get("/channels/discover");
};

export const getFollowingChannels = () => {
  return ax.get("/channels/following");
};

export const searchChannels = ({ channelName, page }) => {
  if (!page) {
    return ax.get(`/channels/search?channelName=${channelName}`);
  } else {
    return ax.get(`/channels/search?channelName=${channelName}&page=${page}`);
  }
};
