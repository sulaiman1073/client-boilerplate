import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NewChannelPost from "../components/Channel/NewChannelPost";
import { setPostDraft, addPost } from "../redux/actions";

export default function NewChannelPostContainer({ channelId }) {
  const draft = useSelector(state => state.postDrafts[channelId]);
  const dispatch = useDispatch();

  const handleSaveDraft = text => {
    dispatch(setPostDraft({ channelId, draft: text }));
  };

  const handleSavePost = text => {
    if (text && text.length > 0) {
      dispatch(addPost({ channelId, content: text }));
    }
  };

  return (
    <NewChannelPost
      draft={draft}
      saveDraft={handleSaveDraft}
      savePost={handleSavePost}
    />
  );
}
