"use client";

import { atom, useAtom } from "jotai";
import React from "react";
import Draggable from "react-draggable";
import { timelineAtom } from "./DraggableTimeline";
import { draggablesAtom } from "./FitnessDraggables";
import colorMap from "../util/fitnessColor";
export const draggingAtom = atom(false);
export const FitnessDraggable = ({
  exersize,
  index,
  free,
}: {
  exersize: Exersize;
  index: number;
  free?: boolean;
}) => {
  const nodeRef = React.useRef(null);
  const [timeline, setTimeline] = useAtom(timelineAtom);
  const [draggables, setDraggables] = useAtom(draggablesAtom);
  const [dragging, setDragging] = useAtom(draggingAtom);
  const [isFree, setIsFree] = React.useState<boolean>(Boolean(free));
  return (
    <Draggable
      data-index={index}
      nodeRef={nodeRef}
      axis="both"
      handle=".handle"
      defaultPosition={{ x: isFree ? 100 : 0, y: 0 }}
      position={!isFree ? { x: 0, y: 0 } : undefined}
      grid={[50, 50]}
      onStop={(e, data) => {
        let droppedIndex = Number.parseInt(
          (e?.target as HTMLDivElement)?.attributes.getNamedItem("data-index")
            ?.value ?? ""
        );
        if (Number.isNaN(droppedIndex)) {
          droppedIndex = Number.parseInt(
            (
              e?.target as HTMLDivElement
            )?.parentElement?.attributes.getNamedItem("data-index")?.value ?? ""
          );
        }
        if (Number.isInteger(droppedIndex)) {
          console.log(droppedIndex);
          if (droppedIndex === -1) {
            setTimeline([exersize, ...timeline]);
          } else if (droppedIndex >= timeline.length) {
            setTimeline([...timeline, exersize]);
          } else {
            const tmp = timeline[index];
            timeline[index] = timeline[droppedIndex];
            timeline[droppedIndex] = tmp;

            setTimeline(timeline);
          }
          setDraggables([...draggables.filter((d) => d !== exersize)]);
        }
        setDragging(false);
        setIsFree(false);
      }}
      onStart={(e, data) => {
        setDragging(true);
        setIsFree(true);
        e.preventDefault();
      }}
      defaultClassNameDragging={dragging ? "ml-20" : ""}
    >
      <div
        data-index={index}
        ref={nodeRef}
        className={
          isFree
            ? "badge handle cursor-pointer h-14 px-5 " +
              colorMap.get(exersize.type)
            : "handle cursor-pointer"
        }
      >
        <div data-index={index}>
          <h4>{exersize.name}</h4>
          <span>{exersize.type}</span>
        </div>
      </div>
    </Draggable>
  );
};
