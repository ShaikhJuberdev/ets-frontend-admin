import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Support = () => {
    const [formData, setFormData] = useState({
        category: '',
        subjectLine: '',
        description: '',
        priority: 'High',
        ccTo: []
    });
    const [attachedFiles, setAttachedFiles] = useState([]);

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
        const email = prompt('Enter email address:');
        if (email && email.includes('@')) {
            setFormData(prev => ({
                ...prev,
                ccTo: [...prev.ccTo, email]
            }));
        }
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
                {/* <h2 className="support-title">New Request</h2> */}
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
                                    <span className="support-file-icon">📎</span>
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
                                        <span className="support-cc-plus">+</span>
                                        <span className="support-cc-text">Add</span>
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

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default Support;