import React from "react";
import ModalContainer from "../../components/Modals/ModalContainer";
import SocialShareModal from "../../components/Modals/SocialShareModal";

export default function SocialShareContainer({ handleModalClose }) {
  return (
    <ModalContainer
      isOpen={true}
      width="md"
      handleModalClose={handleModalClose}
    >
      <SocialShareModal />
    </ModalContainer>
  );
}
