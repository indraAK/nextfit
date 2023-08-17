import React from "react";

type CarouselProps<T> = {
  items: T[];
  renderItem(item: T): React.ReactNode;
};

export default function Carousel<T>(props: CarouselProps<T>) {
  return (
    <div className="snap-x snap-mandatory flex gap-4 overflow-x-scroll">
      {props.items.map((item, index) => (
        <div key={index} className="snap-start flex-shrink-0 w-[85%]">
          {props.renderItem(item)}
        </div>
      ))}
    </div>
  );
}
