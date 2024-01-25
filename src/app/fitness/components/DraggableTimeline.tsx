"use client";

import { atom, useAtom } from "jotai";
import React from "react";
import { FitnessDraggable, draggingAtom } from "./FitnessDraggable";
import colorMap from "../util/fitnessColor";
export const timelineAtom = atom<Exersize[]>([]);
const DraggableTimeline = () => {
  const [timeline] = useAtom(timelineAtom);
  const [dragging] = useAtom(draggingAtom);
  console.log(timeline);
  const timelineEl = (element: Exersize, index: number, hidden?: boolean) => (
    <li key={index} className={hidden ? "invisible" : ""}>
      {index !== 0 ? <hr /> : null}
      <div className="timeline-start">{index * 5}</div>
      <div
        className={`timeline-middle rounded-lg ${
          colorMap.get(element.type) ?? "bg-grey-700"
        } w-4 h-4`}
      ></div>
      <div
        data-index={index}
        className="timeline-end timeline-box hover:bg-blue-500"
      >
        <FitnessDraggable exersize={element} free={false} index={index} />
      </div>
      <hr />
    </li>
  );
  return (
    <ul className="timeline timeline-vertical">
      {timelineEl({ name: "+", type: "", duration: 5 }, -1, !dragging)}
      {timeline.map((element, index) => timelineEl(element, index))}
      {timelineEl(
        { name: "+", type: "", duration: 5 },
        timeline.length,
        !dragging
      )}
    </ul>
  );
};

export default DraggableTimeline;
