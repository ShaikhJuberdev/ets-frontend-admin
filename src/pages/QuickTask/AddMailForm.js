
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  registerEmailRequest,
  clearEmailMessages,
} from "../../store/service/actions";
import "react-toastify/dist/ReactToastify.css";

const AddMailForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [profileName, setProfileName] = useState("");

  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.service
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !description || !profileName) {
      toast.warning("All fields are required.");
      return;
    }

    dispatch(
      registerEmailRequest({
        email,
        description,
        profileName,
      })
    );
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setEmail("");
      setDescription("");
      setProfileName("");

      setTimeout(() => {
        dispatch(clearEmailMessages());
      }, 500);
    }

    if (errorMessage) {
      toast.error(errorMessage);

      setTimeout(() => {
        dispatch(clearEmailMessages());
      }, 500);
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <>
      <div className="mail-form-container">
        <div className="mail-form-box" style={{ position: "relative" }}>
          <h4>Add Service Account</h4>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              disabled={loading}
            />

            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows="3"
              disabled={loading}
            ></textarea>

            <input
              type="text"
              placeholder="Enter profile name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              required
              className="form-input"
              disabled={loading}
            />

            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          {loading && (
            <div
              style={{
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
                borderRadius: "8px",
              }}
            >
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
};

export default AddMailForm;
