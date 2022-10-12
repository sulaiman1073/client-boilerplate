import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useUserScrolledToTop(
  channelId,
  messageLoading,
  messages,
  userHasScrolled,
  y
) {
  const [scrolledToTop, setScrolledToTop] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (y < 20 && messageLoading === "success" && userHasScrolled) {
      setScrolledToTop(true);
    }
    if (y > 20) {
      setScrolledToTop(false);
    }
  }, [channelId, dispatch, messageLoading, messages, userHasScrolled, y]);

  return scrolledToTop;
}
