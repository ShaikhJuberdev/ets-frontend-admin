
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serviceKeys = {
  mbankuser: "MBank",
  admbankuser: "AdMBank",
  mwalletuser: "MWallet",
  admwalletuser: "AdMWallet",
};

const serviceTypeMap = {
  mbankuser: 7,
  admbankuser: 8,
  mwalletuser: 9,
  admwalletuser: 10,
};

const SendMessage = () => {
  const [selectedService, setSelectedService] = useState("");
  const [availableServices, setAvailableServices] = useState([]);
  const [description, setDescription] = useState("");
  const [customerType, setCustomerType] = useState("HN");
  const [messageType, setMessageType] = useState("Transactional");
  const [customerNumber, setCustomerNumber] = useState("");
  const [message, setMessage] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const username = "+918322222222";
  const password = "KBDnaSTjc0ClkInxlYNPJrhu";

  const API_HOST = process.env.REACT_APP_API_HOST;
  const API_PORT_8085 = process.env.REACT_APP_API_PORT_8085;
  const API_PORT_8082 = process.env.REACT_APP_API_PORT_8082;

  useEffect(() => {
    const services = [];
    Object.keys(serviceKeys).forEach((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          const parsed = JSON.parse(item);
          if (parsed?.username && parsed?.password) {
            services.push({ key, label: serviceKeys[key] });
          }
        } catch (e) {
          console.warn(`Invalid localStorage for ${key}`);
        }
      }
    });

    setAvailableServices(services);
    if (services.length === 1) {
      setSelectedService(services[0].key);
    }
  }, []);

  useEffect(() => {
    if (selectedService) {
      const userData = JSON.parse(localStorage.getItem(selectedService) || "{}");
      setDescription(userData.description || "");

      const fetchUsers = async () => {
        try {
          const auth = btoa(`${username}:${password}`);
          const response = await fetch(`${API_HOST}:${API_PORT_8085}/v1/accounts/listofstaff`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Basic ${auth}`,
            },
          });

          const data = await response.json();
          const filtered = (data || []).filter(user => user.email);
          setUserList(filtered);
        } catch (err) {
          console.error("Failed to fetch users", err);
        }
      };

      fetchUsers();
    } else {
      setDescription("");
      setUserList([]);
    }
  }, [selectedService]);

  const handleUserSelect = (number) => {
    setSelectedUsers((prev) => {
      if (prev.includes(number)) {
        return prev.filter((u) => u !== number);
      } else {
        if (prev.length >= 5) {
          toast.error("You can only select up to 5 users at a time.");
          return prev;
        }
        return [...prev, number];
      }
    });
  };

  const filteredUserList = userList.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = async (e) => {
    e.preventDefault();

    if (!selectedService) {
      toast.warning("Please select a service.");
      return;
    }

    const hasMessage = message.trim() !== "";
    const hasFile = !!attachment;

    if (!hasMessage && !hasFile) {
      toast.warning("Please enter a message or attach a file.");
      return;
    }

    const recipients = [...selectedUsers];
    if (recipients.length === 0 && customerNumber.trim() !== "") {
      recipients.push(customerNumber.trim());
    }

    if (recipients.length === 0) {
      toast.warning("Please select user(s) or enter a customer number.");
      return;
    }

    const authData = JSON.parse(localStorage.getItem(selectedService));
    if (!authData) {
      toast.error("Authentication info missing.");
      return;
    }

    const encodedCredentials = btoa(`${authData.username}:${authData.password}`);
    const type = serviceTypeMap[selectedService] || 7;

    const filterTypeMap = {
      debit: 1,
      credit: 2,
      kyc: 3,
      card: 4,
    };

    try {
      setLoading(true);



      for (let i = 0; i < recipients.length; i++) {
        const number = recipients[i];

        const normalizedMessageType = messageType?.trim().toLowerCase();


        if (normalizedMessageType === "promotional") {
          if (hasFile) {
            const formData = new FormData();
            formData.append("file", attachment);
            formData.append(
              "request",
              JSON.stringify({
                senderId: number,
                senderText: hasMessage ? message : "",
                type,
              })
            );

            await fetch(`${API_HOST}:${API_PORT_8082}/v1/messages/fileupload`, {
              method: "POST",
              headers: {
                Authorization: `Basic ${encodedCredentials}`,
              },
              body: formData,
            });
          } else if (hasMessage) {

            const payload = {
              number,
              title: "Test",
              body: message,
              type,
            };

            await fetch(`${API_HOST}:${API_PORT_8085}/v1/messages/sendmessage`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${encodedCredentials}`,
              },
              body: JSON.stringify(payload),
            });
          }
        } else {

          if (hasMessage) {
            const payload = {
              number,
              title: "Test",
              body: message,
              type,
            };

            const filtertypeValue = filterTypeMap[normalizedMessageType];
            if (filtertypeValue !== undefined) {
              payload.filtertype = filtertypeValue;
            }

            await fetch(`${API_HOST}:${API_PORT_8085}/v1/messages/sendmessage`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${encodedCredentials}`,
              },
              body: JSON.stringify(payload),
            });
          }
        }
      }


      toast.success("Messages sent successfully!");
      setCustomerNumber("");
      setMessage("");
      setSelectedUsers([]);
      setAttachment(null);
      const fileInput = document.getElementById("attachment-input");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error("Send failed:", err);
      toast.error("Failed to send messages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="send-msg-wrapper">
      <div className="send-msg-box" style={{ position: "relative" }}>
        <h3>Send Message</h3>
        <form onSubmit={handleSend}>
          <select
            className="send-msg-dropdown"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="" disabled>Select service account</option>
            {availableServices.map((service) => (
              <option key={service.key} value={service.key}>
                {service.label}
              </option>
            ))}
          </select>

          <textarea
            className="send-msg-textarea"
            value={description}
            readOnly
            placeholder="Service Description"
          />

          <select
            className="send-msg-dropdown"
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
          >
            <option value="HN">HN Customers</option>
            <option value="Normal">Normal Customers</option>
            <option value="All">All Customers</option>
          </select>

          <div className="type-dropdown-group">
            <select
              className="type-dropdown"
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
            >
              <option value="" disabled>Type</option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
              <option value="KYC">KYC</option>
              <option value="Card">Card</option>
              <option value="Promotional">Promotional</option>
            </select>
          </div>

          <div className="user-list">
            <div className="user-list-header">
              <label>Select Users:</label>
              <input
                type="text"
                className="user-search-input"
                placeholder="Search number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="user-list-box">
              {filteredUserList.length > 0 ? (
                filteredUserList.map((user, i) => (
                  <div key={i} className="user-item">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.email)}
                      onChange={() => handleUserSelect(user.email)}
                    />
                    <span className="user-name">{user.email}</span>
                  </div>
                ))
              ) : (
                <p>No users found</p>
              )}
            </div>
          </div>

          <textarea
            className="send-msg-textarea"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />

          {messageType === "Promotional" && (
            <div className="attachment-input-group">
              <div className="attachment-input-wrapper">
                <input
                  type="text"
                  className="attachment-textbox"
                  placeholder="Add Attachment"
                  value={attachment ? attachment.name : ""}
                  readOnly
                />
                <label htmlFor="attachment-input" className="attachment-icon-button">
                  <i className="fas fa-paperclip"></i>
                </label>
                <input
                  type="file"
                  id="attachment-input"
                  className="attachment-file-hidden"
                  accept="image/*,video/*"
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
              </div>
            </div>
          )}

          <button type="submit" className="send-msg-button" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        {loading && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            borderRadius: "8px"
          }}>
            <div className="spinner-border text-primary" role="status" style={{ width: "2.5rem", height: "2.5rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default SendMessage;


