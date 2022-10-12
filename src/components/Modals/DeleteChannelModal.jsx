import React from "react";
import Button from "../Controls/Button";
import strings from "../../helpers/localization";

export default function DeleteChannelModal({ handleCancel, handleDelete }) {
  const deleteClicked = () => {
    handleDelete();
    handleCancel();
  };
  return (
    <div className="px-8 py-4">
      <p className="text-lg font-bold text-primaryText">
        {strings.deleteChannel}
      </p>
      <p className="text-sm text-secondaryText my-8">
        {strings.deleteChannelSubtitle}
      </p>
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
          size="md"
          onClick={deleteClicked}
          analyticsString="Delete Message Button: DeleteMessageModal"
        >
          {strings.deleteButton}
        </Button>
      </div>
    </div>
  );
}
