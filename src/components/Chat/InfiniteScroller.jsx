import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback
} from "react";
import { useInView } from "react-intersection-observer";
import { throttle } from "lodash";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setInitialScroll } from "../../redux/actions";

function InfiniteScroller(
  {
    className,
    threshold = 20,
    loader,
    loading = false,
    onBottomView,
    onTopView,
    hasMoreBottom,
    hasMoreTop = false,
    initialScroll = "top",
    children,
    reScroll,
    isGifsOpen,
    channelId
  },
  ref
) {
  const conRef = useRef(null);
  const containerRef = ref || conRef;
  let [loadingItems, setLoadingItems] = useState(null);
  let [initialLoad, setInitialLoad] = useState(true);
  // let [ready, setReady] = useState(false);
  let [oldScrollHeight, setOldScrollHeight] = useState(0);
  let [olderScrollHeight, setOlderScrollHeight] = useState(0);
  const params = useParams();
  const draft = useSelector(
    state => state.chatDrafts[params.channelId || params.roomId]
  );
  const messages = useSelector(
    state => state.messages[params.channelId || params.roomId]
  );
  let [bottomRef, bottomInView] = useInView({
    triggerOnce: false,
    rootMargin: `${threshold * 2}px 0px`
  });
  let [topRef, topInView] = useInView({
    triggerOnce: false,
    rootMargin: `${threshold}px 0px`
  });
  const dispatch = useDispatch();

  const handleBottomView = useCallback(
    throttle(
      () => {
        setLoadingItems("bottom");
        onBottomView();
      },
      50,
      { leading: true }
    ),
    [onBottomView]
  );

  const handleTopView = useCallback(
    throttle(
      () => {
        dispatch(setInitialScroll({ channelId, initialScroll: "top" }));
        setLoadingItems("top");
        onTopView();
      },
      50,
      { leading: true }
    ),
    [onTopView]
  );

  useLayoutEffect(() => {
    // if initialScroll is unset, it default to "bottom" and the messages div is scrolled to the latest message.
    function handleScroll() {
      if (initialScroll === "bottom") {
        if (containerRef.current.lastChild) {
          containerRef.current.lastChild.scrollIntoView();
        }
      } else if (initialScroll === "top") {
        // If user scrolls to top, stop messing with the scroll
        // and let user have control of it.
        // containerRef.current.scrollTo(0, 0);
      } else {
        let scrollVal;

        if (initialScroll <= threshold) {
          scrollVal = Math.floor(initialScroll) + threshold + 5;
        } else {
          scrollVal = Math.floor(initialScroll);
        }
        containerRef.current.scrollTop = scrollVal;
      }
      setInitialLoad(false);
    }
    handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, reScroll, threshold, draft, isGifsOpen, messages]);

  useEffect(() => {
    if (!loading) return;

    setOldScrollHeight(containerRef.current.scrollHeight);
  }, [containerRef, loading, threshold]);

  useEffect(() => {
    if (loading) return;

    if (initialScroll === 0) {
      containerRef.current.scrollTo(0, threshold + 5);
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth"
      });
      setOldScrollHeight(0);
      setOlderScrollHeight(0);
    } else {
      const loadingTop = loadingItems === "top";

      if (loadingTop && containerRef.current.scrollTop <= threshold) {
        let scrollVal;

        if (containerRef.current.scrollHeight < oldScrollHeight) {
          let val1 = oldScrollHeight - olderScrollHeight;
          let val2 = containerRef.current.scrollHeight - val1;
          scrollVal = Math.floor(containerRef.current.scrollHeight - val2);
        } else {
          scrollVal = Math.floor(
            containerRef.current.scrollHeight - oldScrollHeight
          );
        }
        containerRef.current.scrollTo(0, scrollVal);
        containerRef.current.focus();
      }
      setOlderScrollHeight(oldScrollHeight);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, threshold]);

  useEffect(() => {
    if (bottomInView && !loading && hasMoreBottom) {
      handleBottomView();
    }
  }, [bottomInView, loading, hasMoreBottom, handleBottomView]);

  useEffect(() => {
    if (topInView && !loading && !initialLoad) {
      handleTopView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topInView]);

  const Loader = loader;

  let classes = "";

  if (className) {
    classes = `${classes} ${className}`;
  }

  const showTopRef = onTopView && hasMoreTop;
  const showBottomRef = onBottomView && hasMoreBottom;

  const showTopLoading = loading && loadingItems === "top";
  const showBottomLoading = loading && loadingItems === "bottom";

  return (
    <div
      className={classes}
      ref={containerRef}
      // tabIndex="-1"
    >
      {showTopRef && <div ref={topRef} className="" />}
      {showTopLoading && <Loader />}
      {children}
      {showBottomLoading && <Loader />}
      {showBottomRef && <div ref={bottomRef} className="" />}
    </div>
  );
}

const forwardedInfiniteScroller = React.forwardRef(InfiniteScroller);

export default forwardedInfiniteScroller;
