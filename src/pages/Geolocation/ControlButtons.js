import React, { useEffect, useRef } from "react";
import {
  useMap,
} from "react-leaflet";

export const ControlButtons = ({
  onToggleCircle,
  onToggleDrag, 
  enableDraw,
  enableDrag, 
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const CustomControl = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create("div", "leaflet-bar");

        // Circle button
        const circleBtn = L.DomUtil.create("a", "", container);
        circleBtn.innerHTML = enableDraw ? "✕" : "⭕";
        circleBtn.href = "#";
        circleBtn.title = enableDraw ? "Disable Circle Draw" : "Enable Circle Draw";

        // Drag button
        const dragBtn = L.DomUtil.create("a", "", container);
        dragBtn.innerHTML = enableDrag ? "⇕" : "✖";
        dragBtn.href = "#";
        dragBtn.title = enableDrag ? "Disable Drag" : "Enable Drag";





        // Prevent map click when pressing buttons
        L.DomEvent.disableClickPropagation(container);

        // Handlers
        L.DomEvent.on(circleBtn, "click", (e) => {
          L.DomEvent.preventDefault(e);
          onToggleCircle();
        });
        L.DomEvent.on(dragBtn, "click", (e) => {
          L.DomEvent.preventDefault(e);
          onToggleDrag();
        });

        return container;
      },
    });

    const control = new CustomControl({ position: "topleft" });
    map.addControl(control);

    return () => {
      map.removeControl(control);
    };
  }, [map, enableDraw, enableDrag, onToggleCircle, onToggleDrag]);

  return null;
};




