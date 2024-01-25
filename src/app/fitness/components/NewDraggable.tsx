"use client";
import { atom, useAtom } from "jotai";
import React from "react";
import { draggablesAtom } from "./FitnessDraggables";
import colorMap from "../util/fitnessColor";
const tmpData: Exersize[] = [
  { name: "burpee", type: "leg", duration: 5 },
  { name: "push up", type: "chest", duration: 5 },
  { name: "curls", type: "arm", duration: 5 },
  { name: "plank", type: "ab", duration: 5 },
  { name: "high knees", type: "cardio", duration: 5 },
  { name: "crunches", type: "ab", duration: 5 },
  { name: "reverse crunches", type: "ab", duration: 5 },
  {
    name: "mountain climbers",
    type: "cardio",
    duration: 5,
  },
  { name: "superman", type: "back", duration: 5 },
  { name: "tricep dips", type: "arm", duration: 5 },
  { name: "leg lifts", type: "leg", duration: 5 },
  { name: "jumping jacks", type: "cardio", duration: 5 },
];
interface Modal {
  showModal: () => void;
  close: () => void;
}
const NewDraggable = () => {
  const [draggables, setDraggables] = useAtom(draggablesAtom);
  const modal = () =>
    document.getElementById("my_modal_1") as any as Modal | undefined;
  return (
    <div>
      <button className="btn" onClick={() => modal()?.showModal()}>
        Add new exersize
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box grid-cols-4 grid">
          {tmpData.map((exersize) => (
            <button
              className={
                "btn m-2 p-2 hover:border-lime-500 h-auto " +
                colorMap.get(exersize.type)
              }
              onClick={() => {
                setDraggables([...draggables, exersize]);
                modal()?.close();
              }}
            >
              <h4>{exersize.name}</h4>
              <span>{exersize.type}</span>
            </button>
          ))}
        </div>
      </dialog>
    </div>
  );
};

export default NewDraggable;
