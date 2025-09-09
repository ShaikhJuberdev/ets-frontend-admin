
import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export const DrawControl = ({ onCircleDrawn, enableDraw, onCleared, hasUsers }) => {
  const map = useMap();
  const drawnItems = useRef(new L.FeatureGroup());
  const drawControl = useRef(null);
  const currentCircle = useRef(null);

  useEffect(() => {
    if (!map) return;

    map.addLayer(drawnItems.current);

    const addInitialCircle = (lat, lng) => {
      const defaultLatLng = { lat, lng };
      const circle = L.circle(defaultLatLng, {
        radius: 20000, 
        color: "red",
        weight: 2,
        fillColor: "red",
        fillOpacity: 0.1,
      });

      drawnItems.current.addLayer(circle);
      currentCircle.current = circle;

      
      map.fitBounds(circle.getBounds());

     
      onCircleDrawn(defaultLatLng, 15000);

      
      const handleCircleUpdate = () => {
        const newCenter = circle.getLatLng();
        const newRadius = circle.getRadius();
        onCircleDrawn(newCenter, newRadius);
        console.log("Circle updated:", newCenter, newRadius);
      };

      circle.on("edit", handleCircleUpdate);
      circle.on("drag", handleCircleUpdate);
      circle.on("resize", handleCircleUpdate);

      // Enable edit handles
      const editToolbar = new L.EditToolbar.Edit(map, {
        featureGroup: drawnItems.current,
      });
      editToolbar.enable();
    };

    // ✅ Add initial circle at user location
    if (!currentCircle.current && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          addInitialCircle(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.warn("Geolocation denied or unavailable:", err.message);
          // No fallback circle → user can draw manually
        }
      );
    }

    // ✅ Add drawing tools
    if (enableDraw) {
      drawControl.current = new L.Control.Draw({
        draw: {
          polygon: false,
          polyline: false,
          rectangle: false,
          marker: false,
          circlemarker: false,
          circle: {
            shapeOptions: {
              color: "red",
              weight: 2,
              fillColor: "red",
              fillOpacity: 0.1,
            },
          },
        },
        edit: {
          featureGroup: drawnItems.current,
          edit: true,
          remove: true,
        },
      });
      map.addControl(drawControl.current);
    }

    // Handle circle creation
    const onCreated = (e) => {
      drawnItems.current.clearLayers();
      const layer = e.layer;
      drawnItems.current.addLayer(layer);

      if (e.layerType === "circle") {
        const circle = layer;
        const center = circle.getLatLng();
        const radius = circle.getRadius();

        const handleCircleUpdate = () => {
          const newCenter = circle.getLatLng();
          const newRadius = circle.getRadius();
          onCircleDrawn(newCenter, newRadius);
          console.log("Circle updated - center:", newCenter, "radius:", newRadius);
        };

        circle.on("edit", handleCircleUpdate);
        circle.on("drag", handleCircleUpdate);
        circle.on("resize", handleCircleUpdate);

        currentCircle.current = circle;
        onCircleDrawn(center, radius);
      }
    };

    // Handle editing
    const onEdited = (e) => {
      e.layers.eachLayer((layer) => {
        if (layer instanceof L.Circle) {
          const center = layer.getLatLng();
          const radius = layer.getRadius();

          layer.off("edit");
          layer.on("edit", () => {
            const newCenter = layer.getLatLng();
            const newRadius = layer.getRadius();
            onCircleDrawn(newCenter, newRadius);
          });

          currentCircle.current = layer;
          onCircleDrawn(center, radius);
        }
      });
    };

    // // Handle deletion
   

    const onDeleted = (e) => {
  e.layers.eachLayer((layer) => {
    drawnItems.current.removeLayer(layer); // ✅ actually remove from map
  });

  if (onCleared) {
    onCleared();
  }

  currentCircle.current = null; // reset so new circle can be drawn
};

    

    // Attach listeners
    map.on(L.Draw.Event.CREATED, onCreated);
    map.on(L.Draw.Event.EDITED, onEdited);
    map.on(L.Draw.Event.DELETED, onDeleted);

    return () => {
      map.off(L.Draw.Event.CREATED, onCreated);
      map.off(L.Draw.Event.EDITED, onEdited);
      map.off(L.Draw.Event.DELETED, onDeleted);

      if (drawControl.current) {
        map.removeControl(drawControl.current);
      }
      map.removeLayer(drawnItems.current);
    };
  }, [map, onCircleDrawn, onCleared, enableDraw]);

  // ✅ Tooltip on hasUsers change
  useEffect(() => {
    if (currentCircle.current) {
      if (hasUsers === false) {
        currentCircle.current
          .bindTooltip("No users found in this area", {
            permanent: true,
            direction: "center",
            className: "no-users-tooltip",
            offset: [0, 0],
          })
          .openTooltip();
      } else {
        currentCircle.current.closeTooltip();
        currentCircle.current.unbindTooltip();
      }
    }
  }, [hasUsers]);

  return null;
};
