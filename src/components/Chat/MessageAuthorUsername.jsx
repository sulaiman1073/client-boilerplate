import React from "react";
import { openProfileModal } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function MessageAuthorUsername({ userId, username }) {
  const dispatch = useDispatch();
  return (
    <span
      role="button"
      className="font-bold"
      onClick={() => dispatch(openProfileModal(userId))}
    >
      {username}
    </span>
  );
}
