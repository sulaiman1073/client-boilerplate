import React from "react";
import InviteForm from "../Forms/InviteForm";

export default function SocialShareModal({ link }) {
  return (
    <div className="flex flex-col w-full h-64 px-8 p-4">
      <h1 className="font-bold text-lg w-full">
        Invite Friends to this channel
      </h1>
      <InviteForm link={link} />
    </div>
  );
}
