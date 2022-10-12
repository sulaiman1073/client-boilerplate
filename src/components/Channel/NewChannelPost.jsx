import React, { useState, useRef, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Button from "../Controls/Button";
import strings from "../../helpers/localization";

export default function NewChannelPost({
  handleUploadImg,
  className,
  draft,
  saveDraft,
  savePost
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("");
  const textareaRef = useRef();

  // Hanldes emoji's in chat
  useEffect(() => {
    textareaRef.current.value += chosenEmoji;
    setChosenEmoji("");
  }, [chosenEmoji]);

  // Sets post input value equal to draft if one exists
  // Saves a draft when user navigates away
  useEffect(() => {
    textareaRef.current.value = draft || "";
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      saveDraft(textareaRef.current.value?.trim());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    savePost(textareaRef.current.value?.trim());
    textareaRef.current.value = "";
    saveDraft("");
    textareaRef.current.style.height = "39px";
  };
  const handleEmot = e => {
    setPickerOpen(!pickerOpen);
  };
  const handleChange = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    e.target.style.height = "38px";
    e.target.style.height = `${Math.min(e.target.scrollHeight + 2, 168)}px`;
  };

  return (
    <div className="relative flex w-full justify-center items-center">
      <div className="flex flex-around justify-center bg-secondaryBackground content-center py-2 sm:w-102 md:w-102 lg:w-104 max-w-xla">
        {/* EMOJI BUTTON */}
        <Button
          hoverable
          styleNone
          icon={["far", "smile"]}
          styleNoneIconClassName="mb-2 text-2xl text-highlightText"
          onClick={handleEmot}
          className="w-10 h-10 p-2 mx-2 rounded-lg bg-secondaryBackground hover:bg-highlightBackground"
          analyticsString="Emoji Button: NewChannelPost"
        />
        {/* INPUT */}
        <textarea
          type="text"
          placeholder={strings.postInput}
          className="flex w-full h-10 py-2 px-3 text-start overflow-hidden rounded-lg resize-none bg-primaryBackground shadow-sm hover:shadow-md focus:outline-none text-primaryText text-sm transition transform ease-in-out hover:scale-102 duration-100"
          rows={1}
          maxLength={2000}
          onKeyDown={handleChange}
          ref={textareaRef}
        />
        {/* GIF BUTTON */}
        {/* <Button
          hoverable
          styleNone
          styleNoneContent="GIF"
          styleNoneContentClassName="text-highlightText font-bold"
          className="w-10 h-10 p-2 mx-2 rounded-lg bg-secondaryBackground select-none hover:bg-highlightBackground"
          analyticsString="GIF Button: NewChannelPost"
        /> */}
        {/* SEND BUTTON */}
        <Button
          hoverable
          styleNone
          icon="paper-plane"
          styleNoneIconClassName="text-lg"
          onClick={handleSubmit}
          className="w-10 h-10 font-bold text-highlightText pr-2 text-md"
          analyticsString="Post Button: NewChannelPost"
        />
      </div>
      {pickerOpen && (
        <div
          className="absolute top-0 left-0 ml-8 mt-12 mr-8 z-50"
          // onBlur={() => {
          //   setTimeout(() => {
          //     setPickerOpen(false);
          //   }, 250);
          // }}
        >
          <Picker
            perLine={8}
            style={{ position: "flex", bottom: "0", right: "-5rem" }}
            emojiTooltip={true}
            // If both disabled, then no footer is shown
            showSkinTones={false}
            showPreview={false}
            autoFocus
            // Bellow options can be used to adjust what is shown in the footer by default.
            // emoji="eyes"
            // title="  Popitalk"
            // Uses the native set of emojis, so nothing needs to be downloaded. To make all our
            // wanted emojis available on any device we should provide our own sheet, or use the one
            // provided by emoji mart.
            // But then they have to be downloaded.
            native={true}
            onClick={e => {
              setChosenEmoji(e.native);
            }}
            exclude={["flags"]}
          />
        </div>
      )}
    </div>
  );
}
