import { css } from "@emotion/css";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { FitnessDraggable } from "./components/FitnessDraggable";
import DraggableTimeline from "./components/DraggableTimeline";
import FitnessDraggables from "./components/FitnessDraggables";
import NewDraggable from "./components/NewDraggable";

function page() {
  return (
    <div>
      <h1>Fitness tracker</h1>
      <div className="grid grid-cols-3">
        <div>
          <DraggableTimeline />
        </div>
        <div>
          <FitnessDraggables />
        </div>
        <div>
          <NewDraggable />
        </div>
      </div>
    </div>
  );
}

export default page;
