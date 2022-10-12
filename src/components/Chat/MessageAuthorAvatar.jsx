import React from "react";
import { openProfileModal } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function MessageAuthorAvatar({ message, defaultAvatar }) {
  const dispatch = useDispatch();
  return (
    <img
      className="w-8 h-8 rounded-full object-cover"
      src={message.avatar || defaultAvatar}
      alt={message.username}
      onClick={() => dispatch(openProfileModal(message.userId))}
    />
  );
}
