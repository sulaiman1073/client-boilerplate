import React from "react";
import ChatMessage from "../Chat/ChatMessage";
import Button from "../Controls/Button";
import strings from "../../helpers/localization";

export default function DeleteMessageModal({
  message,
  ownId,
  defaultAvatar,
  handleCancel,
  handleDelete
}) {
  return (
    <div className="px-8 py-4">
      <p className="text-lg font-bold text-primaryText">
        {strings.deleteMessageTitle}
      </p>
      <p className="text-sm text-secondaryText mt-1 mb-4">
        {strings.deleteMessageSubtitle}
      </p>
      <div className="pointer-events-none select-none rounded-xl pb-4 mb-4 border">
        <ChatMessage
          message={message}
          ownId={ownId}
          defaultAvatar={defaultAvatar}
          incrementLoadedMessages={() => undefined}
        />
      </div>
      <div className="flex justify-end items-center space-x-6">
        <Button
          styleNone
          styleNoneContent={strings.cancelButton}
          styleNoneContentClassName="text-secondaryText text-sm select-none"
          onClick={handleCancel}
        />
        <Button
          actionButton
          background="cancel"
          size="sm"
          onClick={handleDelete}
          analyticsString="Delete Message Button: DeleteMessageModal"
        >
          {strings.deleteButton}
        </Button>
      </div>
    </div>
  );
}
