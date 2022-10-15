import React, { useRef, useState, useEffect } from "react";
import { Picker } from "emoji-mart";
import { useSelector, useDispatch } from "react-redux";
import {
  setChatDraft,
  addMessage,
  setLastMessageSeen
} from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import GifSelection from "./GifSelection";
import Button from "../Controls/Button";
import strings from "../../helpers/localization";

function ChatActions(props) {
  const channelId = props.match.params.roomId || props.match.params.channelId;
  const dispatch = useDispatch();
  const [emojiIsOpen, setEmojiIsOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("");
  const textareaRef = useRef();
  const draft = useSelector(state => state.chatDrafts[channelId]);
  const currentUserUsername = useSelector(state => state.self.username);
  const userId = useSelector(state => state.self.id);
  const avatar = useSelector(state => state.self.avatar);

  const handleSend = () => {
    const text = textareaRef.current.value.trim();
    if (text.length > 0) {
      dispatch(
        addMessage({
          id: uuidv4(),
          userId,
          channelId,
          content: text,
          upload: null,
          createdAt: new Date().toString(),
          author: {
            id: "",
            username: currentUserUsername,
            avatar: avatar
          }
        })
      );
    }

    textareaRef.current.value = "";
    textareaRef.current.style.height = "38px";
  };

  const handleChange = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
    e.target.style.height = "38px";
    e.target.style.height = `${Math.min(e.target.scrollHeight + 2, 168)}px`;
  };

  // Hanldes emoji's in chat
  useEffect(() => {
    textareaRef.current.value += chosenEmoji;
    setChosenEmoji("");
  }, [channelId, chosenEmoji, dispatch, draft]);

  const onEmojiClick = (emojiObject, event) => {
    setChosenEmoji(emojiObject.native);
    // setEmojiIsOpen(false);
    textareaRef.current.focus();
  };
  // Manages chat drafts
  useEffect(() => {
    textareaRef.current.value = draft || "";
    textareaRef.current.style.height = "38px";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight + 2,
      168
    )}px`;

    return () => {
      dispatch(
        setChatDraft({
          channelId,
          // eslint-disable-next-line react-hooks/exhaustive-deps
          draft: textareaRef.current.value
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return (
    <>
      <div className="flex items-center p-2 bg-primaryBackground space-x-1 md:space-x-2">
        {/* EMOJI BUTTON */}
        <Button
          hoverable
          styleNone
          icon={["far", "smile"]}
          styleNoneIconClassName={`text-xl ${
            emojiIsOpen ? "text-tertiaryText" : "text-highlightText"
          }`}
          onClick={() => setEmojiIsOpen(!emojiIsOpen)}
          className={`${
            emojiIsOpen
              ? "bg-highlightText"
              : "bg-secondaryBackground hover:bg-highlightBackground"
          } w-10 h-10 p-2 text-center rounded-lg`}
          analyticsString="GIF Button: ChatActions"
        />
        {emojiIsOpen ? (
          <div className="absolute bottom-0 mb-16">
            <Picker
              perLine={8}
              style={{ position: "absolute", bottom: "0", right: "-19rem" }}
              emojiTooltip={true}
              // If both disabled, then no footer is shown
              showSkinTones={false}
              showPreview={false}
              // Bellow options can be used to adjust what is shown in the footer by default.
              // emoji="eyes"
              // title="Something"
              // Uses the native set of emojis, so nothing needs to be downloaded. To make all our
              // wanted emojis available on any device we should provide our own sheet, or use the one
              // provided by emoji mart.
              // But then they have to be downloaded.
              native={true}
              onClick={onEmojiClick}
              exclude={["flags"]}
            />
          </div>
        ) : null}
        <textarea
          className="w-full h-10 py-2 px-3 text-start overflow-hidden rounded-lg resize-none bg-secondaryBackground focus:outline-none text-primaryText text-sm transition transform ease-in-out hover:scale-105 duration-100"
          placeholder={strings.chatInput}
          maxLength="240"
          ref={textareaRef}
          onKeyDown={handleChange}
          // On text area focus, sets message as seen
          onFocus={() => dispatch(setLastMessageSeen({ channelId }))}
        />
        {/* GIF BUTTON */}
        <GifSelection
          updateGifsOpen={props.updateGifsOpen}
          isGifsOpen={props.isGifsOpen}
        />
        {/* SEND BUTTON */}
        <Button
          hoverable
          styleNone
          icon="paper-plane"
          styleNoneIconClassName="text-lg text-highlightText"
          onClick={handleSend}
          className="flex items-center flex-shrink-0 justify-center w-8 h-10"
          analyticsString="Send Button: Chat Actions"
        />
      </div>
    </>
  );
}

export default withRouter(ChatActions);
