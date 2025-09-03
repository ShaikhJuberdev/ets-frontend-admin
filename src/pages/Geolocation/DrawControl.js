

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


          if (circle.editing) {
          circle.editing.enable();
        }


        // Add comprehensive event listeners for all types of edits
        const handleCircleUpdate = () => {
          const newCenter = circle.getLatLng();
          const newRadius = circle.getRadius();
          onCircleDrawn(newCenter, newRadius);
          console.log('Circle updated - center:', newCenter, 'radius:', newRadius);
        };

        // Listen to multiple events to catch all possible edits
        circle.on('edit', handleCircleUpdate);
        circle.on('drag', handleCircleUpdate);
        circle.on('resize', handleCircleUpdate);
        
        // For Leaflet Draw specific events
        circle.on('editstart', () => console.log('Edit started'));
        circle.on('editstop', handleCircleUpdate);

        currentCircle.current = circle;
        onCircleDrawn(center, radius);
        console.log('Created - center:', center, 'radius:', radius);
      }
    };

    // Handle editing via draw control
    const onEdited = (e) => {
      console.log('Edit event triggered');
      e.layers.eachLayer((layer) => {
        if (layer instanceof L.Circle) {
          const center = layer.getLatLng();
          const radius = layer.getRadius();
          
          // Re-attach the edit listener after editing
          layer.off('edit'); // Remove old listener
          layer.on('edit', () => {
            const newCenter = layer.getLatLng();
            const newRadius = layer.getRadius();
            onCircleDrawn(newCenter, newRadius);
            console.log('Manual edit after draw edit - center:', newCenter, 'radius:', newRadius);
          });

          currentCircle.current = layer;
          onCircleDrawn(center, radius);
          console.log('Draw control edit - center:', center, 'radius:', radius);
        }
      });
    };

    // Handle deletion of drawn shapes
    const onDeleted = () => {
      if (onCleared) {
        onCleared();
      }
    };

    // Attach event listeners
    map.on(L.Draw.Event.CREATED, onCreated);
    map.on(L.Draw.Event.EDITED, onEdited);
    map.on(L.Draw.Event.DELETED, onDeleted);

    return () => {
      // Clean up event listeners
      map.off(L.Draw.Event.CREATED, onCreated);
      map.off(L.Draw.Event.EDITED, onEdited);
      map.off(L.Draw.Event.DELETED, onDeleted);
      
      if (drawControl.current) {
        map.removeControl(drawControl.current);
      }
      
      // Clean up drawn items
      map.removeLayer(drawnItems.current);
    };
  }, [map, onCircleDrawn, onCleared, enableDraw]);

  // Update tooltip when hasUsers changes
  useEffect(() => {
    if (currentCircle.current) {
      if (hasUsers === false) {
        // Add tooltip for no users found
        currentCircle.current.bindTooltip("No users found in this area", {
          permanent: true,
          direction: 'center',
          className: 'no-users-tooltip',
          offset: [0, 0]
        }).openTooltip();
      } else {
        // Remove tooltip if users are found
        currentCircle.current.closeTooltip();
        currentCircle.current.unbindTooltip();
      }
    }
  }, [hasUsers]);

  return null;
};