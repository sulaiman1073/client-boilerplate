import { createReducer } from "@reduxjs/toolkit";
import {
  logout,
  deleteAccount,
  getChannel,
  addComment,
  addCommentWs,
  deleteComment,
  deleteCommentWs,
  getComments,
  likeComment,
  likeCommentWs,
  unlikeComment,
  unlikeCommentWs,
  flushPosts
} from "../actions";

const initialState = {};

const R_commentsInit = (state, { payload }) => {
  return {
    ...state,
    ...payload.comments
  };
};

const R_addComment = (state, { payload }) => {
  const { comment } = payload;

  state[comment.id] = comment;
};

const R_addComments = (state, { payload }) => {
  return {
    ...state,
    ...payload.comments
  };
};

const R_deleteComment = (state, { payload }) => {
  delete state[payload.commentId];
};

const R_replaceComments = (state, { payload }) => {
  state[payload.postId] = payload.comments;
};

const R_likeComment = (state, { payload }) => {
  const { commentId, userId, ownId } = payload;

  if (state[commentId]) {
    state[commentId].likeCount++;

    if (userId === ownId) {
      state[commentId].liked = true;
    }
  }
};
const R_unlikeComment = (state, { payload }) => {
  const { commentId, userId, ownId } = payload;

  if (state[commentId]) {
    state[commentId].likeCount--;

    if (userId === ownId) {
      state[commentId].liked = false;
    }
  }
};

const R_flushComments = (state, { payload }) => {
  const allPostIds = Object.keys(state);

  allPostIds.forEach(postId => {
    state[postId] = state[postId].slice(-3);
  });
};

const R_resetState = () => initialState;

export default createReducer(initialState, {
  [getChannel.fulfilled]: R_commentsInit,
  [addComment.fulfilled]: R_addComment,
  [addCommentWs]: R_addComment,
  [deleteComment.fulfilled]: R_deleteComment,
  [deleteCommentWs]: R_deleteComment,
  [getComments.fulfilled]: R_addComments,
  [likeComment.fulfilled]: R_likeComment,
  [likeCommentWs]: R_likeComment,
  [unlikeComment.fulfilled]: R_unlikeComment,
  [unlikeCommentWs]: R_unlikeComment,
  [flushPosts]: R_flushComments,
  [logout.fulfilled]: R_resetState,
  [deleteAccount.fulfilled]: R_resetState
});
