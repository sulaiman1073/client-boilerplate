import React from "react";
import VideoPanelCard from "../ThumbnailCards/VideoPanelCard";
import SortableList from "./SortableList";

export default function QueueSection({
  queueList,
  handlerChange,
  handleSkip,
  handleDeleteVideo,
  handleFindMore
}) {
  const itemRenderer = value => (
    <VideoPanelCard
      {...value}
      handleSkip={handleSkip}
      handleDeleteVideo={() => handleDeleteVideo(value.id)}
      size="sm"
      className="mr-2"
    />
  );

  return (
    <SortableList
      axis={"x"}
      items={queueList}
      itemRenderer={itemRenderer}
      handlerChange={handlerChange}
      height={"100%"}
      distance={1}
    >
      <VideoPanelCard handleFindMore={handleFindMore} />
    </SortableList>
  );
}
