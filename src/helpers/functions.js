import classnames from "classnames";
import * as Yup from "yup";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest
} from "../redux/actions";
import React, { useEffect, useState } from "react";
import strings from "./localization";

export function getTextClass(size) {
  return classnames({
    "text-sm": size === "sm",
    "text-md": size === "md",
    "text-lg": size === "lg"
  });
}

export function getInputClasses(shape, error) {
  return classnames(
    "outline-none border focus:border-highlightText disabled:cursor-not-allowed disabled:bg-disabledBackground w-full",
    {
      "border-primaryBorder": !error,
      "rounded-lg": shape === "regular"
    }
  );
}

export function getUserInformationSchema() {
  let thirteenYearsAgo = new Date();
  thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);

  return {
    firstName: Yup.string()
      .min(2, strings.inputTextTooShort)
      .max(32, strings.inputTextTooLong)
      .required(strings.inputTextRequired),
    lastName: Yup.string()
      .min(1, strings.inputTextTooShort)
      .max(32, strings.inputTextTooLong)
      .required(strings.inputTextRequired),
    dateOfBirth: Yup.date()
      .max(thirteenYearsAgo, strings.ageLimitText)
      .required(),
    email: Yup.string()
      .email(strings.invalidEmail)
      .required(strings.inputTextRequired)
  };
}

export function getSetPasswordSchema(checkOldPassword) {
  let password = Yup.string()
    .min(6, strings.passwordTooShort)
    .matches(/[a-z]/, strings.lowerCaseRequired)
    .matches(/[A-Z]/, strings.upperCaseRequired)
    .matches(/\d+/, strings.numberRequired)
    .required(strings.inputTextRequired);

  if (checkOldPassword) {
    password = password.notOneOf(
      [Yup.ref("oldPassword"), null],
      strings.newPasswordRequirement
    );
  }

  return {
    password: password
  };
}

export function getDatePickerValues() {
  const days = new Array(31).fill(0).map((_, index) => {
    return { value: index + 1, label: index + 1 };
  });

  const months = [
    strings.jan,
    strings.feb,
    strings.mar,
    strings.apr,
    strings.may,
    strings.jun,
    strings.jul,
    strings.aug,
    strings.sep,
    strings.oct,
    strings.nov,
    strings.dec
  ].map((month, index) => {
    return { value: index + 1, label: month };
  });

  const currentYear = new Date().getFullYear();
  const years = new Array(100).fill(0).map((_, index) => {
    const year = currentYear - index;
    return { value: index + 1, label: year };
  });

  return {
    days: days,
    months: months,
    years: years
  };
}

export function getInitialDatePickerValues(date) {
  const datePickerValues = getDatePickerValues();

  const day = datePickerValues.days.find(d => d.value === date.getDate());
  const month = datePickerValues.months.find(m => m.value === date.getMonth());
  const year = datePickerValues.years.find(y => y.label === date.getFullYear());

  return {
    day: day.value,
    month: month.value,
    year: year.value
  };
}

export const filterSearch = (list, field, setVisible, searchTerm) => {
  const filteredItems = list.filter(i =>
    i[field].toLowerCase().includes(searchTerm.toLowerCase())
  );

  setVisible(filteredItems);
};

export const onCheck = (selected, setSelected, id, name) => {
  const index = selected.findIndex(i => i.id === id);
  if (index >= 0) {
    setSelected(selected.filter(i => i.id !== id));
  } else {
    setSelected([...selected, { id: id, name: name }]);
  }
};

export const handleEnter = (selected, setSelected, visible, nameField) => {
  setSelected([
    ...selected,
    ...visible
      .filter(v => !selected.find(s => s.id === v.id))
      .map(i => {
        return { id: i.id, name: i[nameField] };
      })
  ]);
};

export const handleCancel = (selected, setSelected, id) => {
  setSelected(selected.filter(i => i.id !== id));
};

export const mapIdsToUsers = (userIds, users, defaultAvatar) => {
  return userIds.map(userId => ({
    id: userId,
    ...users[userId],
    avatar: users[userId]?.avatar || defaultAvatar
  }));
};

export const setRelationshipHandlers = (
  u,
  relationships,
  dispatch,
  defaultAvatar,
  myId
) => {
  let acceptHandler = () => dispatch(sendFriendRequest(u.id));
  let rejectHandler = () => dispatch(rejectFriendRequest(u.id));
  let variant = "stranger";

  if (relationships.friends.includes(u.id)) {
    variant = "friend";
  } else if (relationships.sentFriendRequests.includes(u.id)) {
    variant = "sentRequest";
    rejectHandler = () => dispatch(cancelFriendRequest(u.id));
  } else if (relationships.receivedFriendRequests.includes(u.id)) {
    variant = "receivedRequest";
    acceptHandler = () => dispatch(acceptFriendRequest(u.id));
  } else if (
    relationships.blocked.includes(u.id) ||
    relationships.blockers.includes(u.id)
  ) {
    variant = "blocked";
  } else if (myId === u.id) {
    variant = "self";
  }

  return {
    ...u,
    variant: variant,
    handleAccept: acceptHandler,
    handleReject: rejectHandler,
    avatar: u.avatar || defaultAvatar
  };
};

export const useOnClickOutside = (ref, handler) => {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
};

export const utilizeFocus = () => {
  const ref = React.createRef();
  const setFocus = () => {
    ref.current && ref.current.focus();
  };

  return { setFocus, ref };
};

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export function imageLoader(src, cb) {
  const image = new Image();

  image.src = src;
  image.onload = cb;
}
