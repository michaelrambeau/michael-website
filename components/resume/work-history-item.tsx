import React from "react";
import { BsCalendar3, BsGlobe } from "react-icons/bs";
import cn from "classnames";

type Item = {
  title: string;
  resp?: string;
  points?: string[];
  location: string;
  from: "string";
  to?: "string";
  duration?: "string";
};

type Props = {
  item: Item;
  breakAfter?: boolean;
};
export const WorkHistoryItem = ({ item, breakAfter }: Props) => (
  <div
    className={cn("xs:border-l-2 xs:border-yellow-400 xs:pl-4 sm:py-2", {
      "break-after": breakAfter,
    })}
  >
    <header className="flex flex-col xs:flex-row xs:items-center justify-between text-yellow-600">
      <div className="flex items-center">
        <BsCalendar3 />
        <div className="ml-1">{getDate(item)}</div>
      </div>
      <div className="flex items-center">
        <BsGlobe />
        <div className="ml-1">{item.location}</div>
      </div>
    </header>
    <h3
      className="text-2xl mb-2"
      dangerouslySetInnerHTML={{ __html: item.title }}
    />
    {item.resp && <p dangerouslySetInnerHTML={{ __html: item.resp }} />}
    {item.points && (
      <ul>
        {item.points.map((point, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
        ))}
      </ul>
    )}
  </div>
);

const getDate = (item: Item) => {
  const year = item.from === item.to ? item.from : `${item.from} ⇒ ${item.to}`;
  const duration = item.duration ? ` (${item.duration})` : "";
  return `${year}${duration}`;
};
