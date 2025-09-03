
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import { DrawControl } from "./DrawControl";
import { ControlButtons } from "./ControlButtons";
import { toast } from "react-toastify";
import { UserMarker } from "./UserMarker";

import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import StreetviewIcon from '@mui/icons-material/Streetview';

// Add custom CSS for tooltip
const tooltipStyle = `
  .no-users-tooltip {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .no-users-tooltip::before {
    border-top-color: #dc3545;
  }
`;


const styleSheet = document.createElement("style");
styleSheet.innerText = tooltipStyle;
document.head.appendChild(styleSheet);


const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT_8085 = process.env.REACT_APP_API_PORT_8085;
const API_PORT_8082 = process.env.REACT_APP_API_PORT_8082;

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/9204/9204416.png",
  iconSize: [32, 32],
});

export default function MapComponent() {
  const [generatedPoints, setGeneratedPoints] = useState([]);
  const [enableDraw, setEnableDraw] = useState(false);
  const [enableDrag, setEnableDrag] = useState(true);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [showBroadcastBox, setShowBroadcastBox] = useState(false);
  const [mapType, setMapType] = useState("street");
  const [searchTerm, setSearchTerm] = useState("");
  const username = "pts@pts.com";
  const password = "EY128Ak4vx6vPfmbU4uO6QM6";
  const auth = btoa(`${username}:${password}`);

 

  const handleCheckboxChange = (num) => {
    setSelectedNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const handleSelectAll = () => {
    const filteredUsers = generatedPoints?.filter(user => 
      (user.phone || user.mobile || user.msisdn || user.username || user.email)
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase())
    ) || [];
    
    const allNumbers = filteredUsers.map(user => 
      user.phone || user.mobile || user.msisdn || user.username || user.email
    );
    
    if (selectedNumbers.length === allNumbers.length) {
      setSelectedNumbers([]);
    } else {
      setSelectedNumbers(allNumbers);
    }
  };

 

  const handleCircleDrawn = async (center, radius) => {
    // generateRandomPoints(center, radius);
    // setShowBroadcastBox(true);



    try {
      // Construct API URL with query params
      const url = `${API_HOST}:${API_PORT_8082}/v1/messages/getusersfromlocation?lat=${center.lat}&lon=${center.lng}&distance=${radius}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${auth}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
      }

      const data = await response.json();

      
      setGeneratedPoints(data || []);
      setShowBroadcastBox(true);
      console.log("Users fetched:", data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users in circle");
    }
  };

  const handleBroadcast = async () => {
    if (!broadcastMsg.trim()) {
      toast.warning("Please enter a message to broadcast");
      return;
    }

    if (selectedNumbers.length === 0) {
      toast.warning("Please select at least one user to send");
      return;
    }

    if (generatedPoints.length === 0) {
      toast.warning("No users in circle to broadcast");
      return;
    }

    // Prepare payload for broadcasting to multiple users
    const payload = {
      usernames: selectedNumbers
        .map(x => (x || "").toString().trim())
        .filter(x => x && x !== "null" && x !== "undefined"),
      title: "alert",
      body: broadcastMsg,
      type: 7,
      filtertype: "",
    };

    try {
      const response = await fetch(`${API_HOST}:${API_PORT_8085}/v1/messages/sendmessagesmany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
    setBroadcastMsg("");
    setSelectedNumbers([]);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 120px)",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 100,
        position: "relative",
        borderRadius: "16px",
        zIndex: 0,
      }}
    >
      {/* Broadcast Box */}
      {showBroadcastBox && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 70,
            zIndex: 1000,
            background: "#f8f9fa",
            padding: "10px",
            borderRadius: "8px",
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",


          }}
        >
          <h1 className="send_brodcast_heading">Send Broadcast Message</h1>
          <textarea
            rows={2}
            cols={30}
            className="send_brodcast_textarea"
            placeholder="Enter broadcast message..."
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            style={{ fontSize: "14px", marginBottom: "5px" }}
          />
          <br />

          <div style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <b>
                <span>Select Users:</span>
              </b>
              {generatedPoints && generatedPoints.length > 0 && (
                <button 
                  onClick={handleSelectAll}
                  style={{
                    fontSize: "11px",
                    padding: "2px 6px",
                    backgroundColor: "#5897fc",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer"
                  }}
                >
                  {selectedNumbers.length === (generatedPoints?.filter(user => 
                    (user.phone || user.mobile || user.msisdn || user.username || user.email)
                      ?.toLowerCase()
                      .includes(searchTerm?.toLowerCase())
                  )?.length) ? "Deselect All" : "Select All"}
                </button>
              )}
            </div>
            
            <input
              type="text"
              placeholder="Search numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                fontSize: "11px",
                padding: "4px 6px",
                marginBottom: "8px",
                border: "1px solid #ccc",
                borderRadius: "3px"
              }}
            />
            
            <div style={{ 
              maxHeight: "120px", 
              overflowY: "auto",
              border: "1px solid #eee",
              borderRadius: "4px",
              padding: "4px"
            }}>
              {(!generatedPoints || generatedPoints.length === 0) ? (
                <div style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#6c757d",
                  fontSize: "12px"
                }}>
                  No users found in this area
                </div>
              ) : (
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1fr 1fr", 
                  gap: "2px",
                  fontSize: "10px"
                }}>
                  {generatedPoints
                    ?.filter(user => 
                      (user.phone || user.mobile || user.msisdn || user.username || user.email)
                        ?.toLowerCase()
                        .includes(searchTerm?.toLowerCase())
                    )
                    ?.map((user, idx) => (
                      <label 
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "2px 4px",
                          fontSize: "10px",
                          cursor: "pointer",
                          border: "1px solid #f0f0f0",
                          borderRadius: "2px",
                          backgroundColor: selectedNumbers.includes(
                            user.phone || user.mobile || user.msisdn || user.username || user.email
                          ) ? "#e3f2fd" : "transparent"
                        }}
                      >
                        <input
                          type="checkbox"
                          value={user.phone || user.mobile || user.msisdn || user.username || user.email}
                          checked={selectedNumbers.includes(
                            user.phone || user.mobile || user.msisdn || user.username || user.email
                          )}
                          onChange={() =>
                            handleCheckboxChange(
                              user.phone || user.mobile || user.msisdn || user.username || user.email
                            )
                          }
                          style={{ marginRight: "4px", transform: "scale(0.8)" }}
                        />
                        <span style={{ fontSize: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {user.phone || user.mobile || user.msisdn || user.username || user.email}
                        </span>
                      </label>
                    ))}
                </div>
              )}
            </div>

          </div>

          <button
            onClick={handleBroadcast}
            className="send_broadcast_btn btn btn-success"
          >
            Send Broadcast
          </button>
        </div>
      )}



      <div
        style={{
          position: "absolute",
          top: 20,
          right: 10,
          zIndex: 1000,
          backgroundColor: "rgb(255, 255, 255)",
          // border: "1px solid #dee2e6",
          borderRadius: "50px",
          padding: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <button
            onClick={() => setMapType("street")}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              background: mapType === "street" ? "#5897fc" : "#fff",
              color: mapType === "street" ? "#fff" : "#000",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              fontSize: "10px",
              fontWeight: "bold",
            }}
            title="Street Map"
          >
            < StreetviewIcon fontSize="small" />
          </button>

          <button
            onClick={() => setMapType("satellite")}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              background: mapType === "satellite" ? "#5897fc" : "#fff",
              color: mapType === "satellite" ? "#fff" : "#000",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              fontSize: "10px",
              fontWeight: "bold",
            }}
            title="Satellite View"
          >
            <SatelliteAltIcon fontSize="small" />
          </button>
        </div>
      </div>


      {/* Map */}
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={13}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "12px",
          // border: "1px solid grey",
        }}
        dragging={enableDrag}
      >
        {/* Street Map */}
        {mapType === "street" && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {/* Satellite + Labels */}
        {mapType === "satellite" && (
          <>
            <TileLayer
              attribution="Tiles © Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            <TileLayer
              attribution="Labels © Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            />
          </>
        )}

        {/* Controls */}
        <ControlButtons
          onToggleCircle={() => setEnableDraw(!enableDraw)}
          onToggleDrag={() => setEnableDrag(!enableDrag)}
          enableDraw={enableDraw}
          enableDrag={enableDrag}
        />

        <DrawControl
          onCircleDrawn={handleCircleDrawn}
          enableDraw={enableDraw}
          onCleared={() => {
            setGeneratedPoints([]);
            setShowBroadcastBox(false);
          }}
          hasUsers={generatedPoints && generatedPoints.length > 0}
        />

        {generatedPoints.map((p) => (
          <UserMarker key={p.id} p={p} handleBroadcast={handleBroadcast} />
        ))}
      </MapContainer>





    </div>
  );
}
