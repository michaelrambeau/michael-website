import React from "react";
import { BsCalendar3, BsGlobe } from "react-icons/bs";
// import styled from "styled-components";

// import Icon from "../../svg/Icon";
// import marked from "marked";

const getDate = (item) => {
  const year = item.from === item.to ? item.from : `${item.from} ⇒ ${item.to}`;
  const duration = item.duration ? ` (${item.duration})` : "";
  return `${year}${duration}`;
};

export const WorkHistoryItem = ({ item }) => (
  <div className="sm:border-l-2 sm:border-yellow-400 sm:pl-4 sm:py-2">
    <header className="flex flex-col sm:flex-row sm:items-center justify-between text-yellow-600">
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
