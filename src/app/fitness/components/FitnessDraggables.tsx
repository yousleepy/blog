"use client";

import React from "react";
import { FitnessDraggable } from "./FitnessDraggable";
import { atom, useAtom } from "jotai";
export const draggablesAtom = atom<Exersize[]>([]);
const FitnessDraggables = () => {
  const [draggables] = useAtom(draggablesAtom);
  return (
    <>
      {draggables.map((exersize, index) => (
        <FitnessDraggable
          exersize={exersize}
          index={index}
          key={index}
          free={true}
        ></FitnessDraggable>
      ))}
    </>
  );
};

export default FitnessDraggables;
