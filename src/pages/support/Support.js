import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/picture/add.svg";
import clipIcon from "../../assets/images/picture/file_upload.svg";

const Support = () => {
    const [formData, setFormData] = useState({
        category: '',
        subjectLine: '',
        description: '',
        priority: 'High',
        ccTo: []
    });
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailInput, setEmailInput] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setAttachedFiles(prev => [...prev, ...files]);
    };

    const handleAddCC = () => {
        setIsModalOpen(true);
    };

    const handleModalSubmit = () => {
        if (emailInput && emailInput.includes('@')) {
            setFormData(prev => ({
                ...prev,
                ccTo: [...prev.ccTo, emailInput]
            }));
            setEmailInput('');
            setIsModalOpen(false);
        } else {
            toast.warning("Please enter a valid email address");
        }
    };

    const handleModalCancel = () => {
        setEmailInput('');
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.category || !formData.subjectLine || !formData.description) {
            toast.warning("Please fill in all required fields");
            return;
        }
        toast.success("Support request submitted successfully!");
        console.log('Form submitted:', formData, attachedFiles);
    };

    const handleCancel = () => {
        setFormData({
            category: '',
            subjectLine: '',
            description: '',
            priority: 'High',
            ccTo: []
        });
        setAttachedFiles([]);
    };

    return (
        <>
            <div className="support-page-container">
                <div className="support-main-content">
                    <h3 className="support-section-title">What problem are you facing?</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="support-form-group">
                            <label className="support-form-label">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="support-category-select"
                            >
                                <option value="">Select Category</option>
                                <option value="technical">Technical Issue</option>
                                <option value="billing">Billing</option>
                                <option value="feature">Feature Request</option>
                                <option value="bug">Bug Report</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="support-form-group">
                            <label className="support-form-label">Subject Line</label>
                            <input
                                type="text"
                                name="subjectLine"
                                value={formData.subjectLine}
                                onChange={handleInputChange}
                                className="support-subject-input"
                                placeholder="Enter subject line"
                            />
                        </div>

                        <div className="support-form-group">
                            <label className="support-form-label">Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="support-description-input"
                                placeholder="write here..."
                                rows="6"
                            />
                        </div>

                        <div className="support-form-group">
                            <label className="support-form-label">Attached File</label>
                            <div className="support-file-upload-area">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileUpload}
                                    className="support-file-input"
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" className="support-file-label">
                                    <span className="support-file-icon">
                                        <img src={clipIcon} alt="clip icon" style={{ width: "20px", height: "20px" }} />
                                    </span>
                                    <span className="support-file-text">Click to upload files or drag and drop</span>
                                </label>
                                {attachedFiles.length > 0 && (
                                    <div className="support-file-list">
                                        {attachedFiles.map((file, index) => (
                                            <div key={index} className="support-file-item">
                                                <span className="support-file-name">{file.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== index))}
                                                    className="support-file-remove"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="support-form-row">
                            <div className="support-form-group support-cc-group">
                                <label className="support-form-label">CC to</label>
                                <div className="support-cc-container">
                                    <button
                                        type="button"
                                        onClick={handleAddCC}
                                        className="support-cc-add-btn"
                                    >
                                        <span className="support-cc-plus">
                                            <img
                                                src={logo}
                                                alt="logo"
                                                style={{ width: "20px", height: "20px" }}
                                            />
                                        </span>
                                    </button>
                                    {formData.ccTo.length > 0 && (
                                        <div className="support-cc-list">
                                            {formData.ccTo.map((email, index) => (
                                                <div key={index} className="support-cc-item">
                                                    <span className="support-cc-email">{email}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({
                                                            ...prev,
                                                            ccTo: prev.ccTo.filter((_, i) => i !== index)
                                                        }))}
                                                        className="support-cc-remove"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="support-form-group support-priority-group">
                                <label className="support-form-label">Priority</label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleInputChange}
                                    className="support-priority-select"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>
                        </div>

                        <div className="support-form-actions">
                            <button type="button" className="support-cancel-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="support-submit-btn">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

         {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3 className="modal-title">Add CC Email</h3>
      <input
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        className="modal-input"
        placeholder="Enter email address"
      />
      <div className="modal-buttons">
        <button
          type="button"
          onClick={handleModalCancel}
          className="modal-cancel-btn"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleModalSubmit}
          className="modal-add-btn"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default Support;