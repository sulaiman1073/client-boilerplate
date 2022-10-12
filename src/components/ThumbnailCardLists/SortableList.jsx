import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import ScrollableCardList from "../ThumbnailCardLists/ScrollableCardList";

// Handler Change Params ({oldIndex, newIndex)}
export default function SortableList({
  items,
  itemRenderer,
  children,
  handlerChange,
  axis,
  height = "100%"
}) {
  const SortableItem = SortableElement(({ value }) => itemRenderer(value));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ScrollableCardList axis={axis} displayControls>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.id}`}
            index={index}
            value={value}
            distance={1}
          />
        ))}
        {children}
      </ScrollableCardList>
    );
  });

  return (
    <SortableList
      items={items}
      onSortEnd={handlerChange}
      axis={axis}
      distance={1}
    />
  );
}
