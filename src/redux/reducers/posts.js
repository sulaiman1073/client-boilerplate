import { createReducer } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  logout,
  deleteAccount,
  getChannel,
  addChannel,
  addChannelWs,
  addPost,
  addPostWs,
  likePost,
  likePostWs,
  unlikePost,
  unlikePostWs,
  deletePost,
  deletePostWs,
  addComment,
  addCommentWs,
  deleteComment,
  deleteCommentWs,
  flushPosts,
  getPosts,
  getComments
} from "../actions";

const initialState = {};

const R_postsInit = (state, { payload }) => {
  if (payload.type === "channel") {
    return {
      ...state,
      ...payload.posts
    };
  }
};

const R_addPost = (state, { payload }) => {
  const { post } = payload;

  state[post.id] = post;
  // if (!state[payload.channelId]) {
  //   state[payload.channelId] = [payload];
  // } else {
  //   state[payload.channelId] = [payload, ...state[payload.channelId]];

  //   // if (state[payload.channelId].length === 7) {
  //   //   state[payload.channelId] = state[payload.channelId].slice(-7);
  //   // }
  // }
};
const R_addPosts = (state, { payload }) => {
  if (!state[payload.channelId]) {
    state[payload.channelId] = payload.posts;
  } else {
    state[payload.channelId].push(...payload.posts);
  }
};

const R_deletePost = (state, { payload }) => {
  delete state[payload.postId];
};
const R_flushPosts = (state, { payload }) => {
  if (state[payload.channelId]) {
    state[payload.channelId] = state[payload.channelId].slice(0, 7);
  }
};

const R_likePost = (state, { payload }) => {
  if (state[payload.postId]) {
    state[payload.postId].likeCount++;

    if (payload.userId === payload.ownId) {
      state[payload.postId].liked = true;
    }
  }
};
const R_unlikePost = (state, { payload }) => {
  if (state[payload.postId]) {
    state[payload.postId].likeCount--;

    if (payload.userId === payload.ownId) {
      state[payload.postId].liked = false;
    }
  }
};

const R_addedCommentUpdate = (state, { payload }) => {
  const { postId, comment, ownId } = payload;

  if (state[postId]) {
    state[postId].comments.push(comment.id);

    if (!state[postId].firstCommentId) {
      state[postId].firstCommentId = comment.id;
    }
    state[postId].lastCommentId = comment.id;
    state[postId].commentCount++;

    if (ownId === comment.userId) {
      state[postId].selfCommentCount++;
    } else if (state[postId].comments.length >= 3) {
      state[postId].comments = state[postId].comments.slice(
        state[postId].comments.length % 3
      );
    }
  }
};

const R_addComments = (state, { payload }) => {
  const { postId, afterCommentId, beforeCommentId, comments } = payload;

  if (state[postId]) {
    if (!afterCommentId && !beforeCommentId) {
      state[postId].comments.push(...Object.keys(comments));
    } else if (afterCommentId && !beforeCommentId) {
      state[postId].comments.push(...Object.keys(comments));
    } else if (!afterCommentId && beforeCommentId) {
      state[postId].comments = [
        ...Object.keys(comments),
        ...state[postId].comments
      ];
    } else if (afterCommentId && beforeCommentId) {
      console.log(":(");
    }
  }
};

const R_deletedCommentUpdate = (state, { payload }) => {
  const {
    commentId,
    postId,
    userId,
    ownId,
    firstCommentId,
    lastCommentId
  } = payload;
  if (state[postId]) {
    state[postId].firstCommentId = firstCommentId;
    state[postId].lastCommentId = lastCommentId;
    state[postId].commentCount--;

    if (ownId === userId) {
      state[postId].selfCommentCount--;
    }

    state[postId].comments = state[postId].comments.filter(
      cmntId => cmntId !== commentId
    );
  }
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [getChannel.fulfilled]: R_postsInit,
  [addChannel.fulfilled]: R_postsInit,
  [addChannelWs]: R_postsInit,
  [addPost.fulfilled]: R_addPost,
  [addPostWs]: R_addPost,
  [deletePost.fulfilled]: R_deletePost,
  [deletePostWs]: R_deletePost,
  [getPosts.fulfilled]: R_addPosts,
  [flushPosts]: R_flushPosts,
  [likePost.fulfilled]: R_likePost,
  [likePostWs]: R_likePost,
  [unlikePost.fulfilled]: R_unlikePost,
  [unlikePostWs]: R_unlikePost,
  [addComment.fulfilled]: R_addedCommentUpdate,
  [addCommentWs]: R_addedCommentUpdate,
  [getComments.fulfilled]: R_addComments,
  [deleteComment.fulfilled]: R_deletedCommentUpdate,
  [deleteCommentWs]: R_deletedCommentUpdate,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
