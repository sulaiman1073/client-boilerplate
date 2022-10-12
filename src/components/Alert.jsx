import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAlert } from "../redux/actions";

const Alert = ({ duration, children }) => {
  duration = duration || 3000;

  const dispatch = useDispatch();

  useEffect(() => {
    const close = () => {
      dispatch(setAlert(""));
    };

    setTimeout(close, duration);
  }, [dispatch, duration]);

  return (
    <div
      className="bg-gradient-br-cancel opacity-95 hover:opacity-100 text-tertiaryText text-sm items-center
        justify-center py-4 px-8 rounded-b-lg rounded-t-sm shadow-lg duration-100"
    >
      {children}
    </div>
  );
};

export default Alert;
