import { createReducer } from "@reduxjs/toolkit";
import {
  searchUsers,
  clearUserSearch,
  logout,
  deleteAccount
} from "../actions";

const initialState = [];

export default createReducer(initialState, {
  [searchUsers.fulfilled]: (state, { payload }) => {
    return payload.users;
  },
  [clearUserSearch]: state => {
    state = initialState;
  },
  [logout.fulfilled]: () => initialState,
  [deleteAccount.fulfilled]: () => initialState
});
