import React, { useState, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { toast } from "react-toastify";

const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT_8080 = process.env.REACT_APP_API_PORT_8080;


 const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;

// Reuse same icon
const userIcon = new L.Icon({
  iconUrl: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

export const UserMarker = ({ p }) => {
  const popupRef = useRef();
  const [msg, setMsg] = useState("");

  const handleSendMessage = async () => {
    if (!msg.trim()) {
      toast.warning("Please enter a message");
      return;
    }

    // credentials (same as MapComponent)
    const encodedCredentials = btoa(
      `${username}:${password}`
    );

    const payload = {
      number: p.username,
      title: "Test",
      body: msg,
      type: 7,
    };

    try {
      const response = await fetch(
        `${API_HOST}:${API_PORT_8080}/v1/messages/sendmessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedCredentials}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed: ${response.status}`);
      }

      await response.json();
      toast.success(`Message sent to ${p.username}`);
      setMsg("");
      if (popupRef.current) popupRef.current.close();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <Marker position={[p.lat, p.lon]} icon={userIcon}>
      <Popup ref={popupRef} closeButton={true}>
        <div style={{ width: "100%" }}>
          <b>
            Contact: <span className="fw-bold">{p.username}</span>
          </b>
          <br />
          <span className="mb-2">
            Lat: <span className="fw-bold">{p.lat.toFixed(6)}</span>
            <br />
          </span>
          <span className="mb-2">
            Lng: <span className="fw-bold">{p.lon.toFixed(6)}</span>
            <br />
          </span>

          <textarea
            rows={2}
            placeholder="Enter message here.."
            className="single_message_input"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            style={{
              width: "100%",
              fontSize: "12px",
              marginTop: "5px",
              marginBottom: "6px",
              
              // boxSizing: "border-box",
              border: "none",
              // borderRadius: "6px",
            }}
          />

          <button
            onClick={handleSendMessage}
            className="send_broadcast_btn btn btn-success"
            style={{ width: "100%" }}
          >
            Send Message
          </button>
        </div>
      </Popup>
    </Marker>
  );
};
