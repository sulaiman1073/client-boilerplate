import {
  validateSession,
  logout,
  deleteAccount,
  setChatDraft,
  addMessage,
  addPost,
  setPostDraft
} from "../actions";

const localStorageMiddleware = () => store => next => action => {
  if (validateSession.fulfilled.match(action)) {
    const { cacheVersion } = store.getState().general;
    const cachedCacheVersion = Number(localStorage.getItem("cacheVersion"));

    if (cacheVersion > cachedCacheVersion) {
      localStorage.clear();
    }

    localStorage.setItem("cacheVersion", cacheVersion);

    const cachedChatDrafts = JSON.parse(localStorage.getItem("chatDrafts"));
    const cachedPostDrafts = JSON.parse(localStorage.getItem("postDrafts"));

    if (cachedChatDrafts) {
      action.payload = {
        ...action.payload,
        chatDrafts: cachedChatDrafts
      };
    }
    if (cachedPostDrafts) {
      action.payload = {
        ...action.payload,
        postDrafts: cachedPostDrafts
      };
    }
  }

  next(action);

  if (validateSession.fulfilled.match(action)) {
    const selfState = store.getState().self;
    localStorage.setItem("selfState", JSON.stringify(selfState));
  } else if (validateSession.rejected.match(action)) {
    localStorage.removeItem("selfState");
  } else if (logout.fulfilled.match(action)) {
    localStorage.removeItem("selfState");
  } else if (deleteAccount.fulfilled.match(action)) {
    localStorage.removeItem("selfState");
  } else if (setChatDraft.match(action)) {
    const drafts = store.getState().chatDrafts;
    localStorage.setItem("chatDrafts", JSON.stringify(drafts));
  } else if (addMessage.fulfilled.match(action)) {
    const drafts = store.getState().chatDrafts;
    localStorage.setItem("chatDrafts", JSON.stringify(drafts));
  } else if (setPostDraft.match(action)) {
    const drafts = store.getState().postDrafts;
    localStorage.setItem("postDrafts", JSON.stringify(drafts));
  } else if (addPost.fulfilled.match(action)) {
    const drafts = store.getState().postDrafts;
    localStorage.setItem("postDrafts", JSON.stringify(drafts));
  }
};

export default localStorageMiddleware;
