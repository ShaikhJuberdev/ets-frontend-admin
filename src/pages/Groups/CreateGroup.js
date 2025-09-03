
import React, { useEffect, useState } from 'react';
import {
    Row, Col, Card, CardBody, Container,
    Modal, ModalHeader, ModalBody, ModalFooter, Input, Label
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import feedback from "../../assets/images/SVG/creategroup.svg.svg";
import MessageIcon from '@mui/icons-material/Message';
import groupListIcon from "../../assets/images/SVG/group.svg";
import trashIcon from "../../assets/images/SVG/dustbin.svg";
import editIcon from "../../assets/images/SVG/edit.svg";
import deleteIcon from "../../assets/images/SVG/dustbin.svg";
import sendIcon from "../../assets/images/SVG/send.svg";

import {
    fetchGroups,
    fetchUsers,
    createGroup,
    sendGroupMessage
} from '../../store/group/actions';

const CreateGroup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        groups: groupDetails = [],
        totalPages = 0,
        loading = false,
        users: userList = [],
        loadingUsers = false
    } = useSelector(state => state.group);

    const [currentPage, setCurrentPage] = useState(0);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [isGroupMessageMode, setIsGroupMessageMode] = useState(false);
    const [selectedGroupForMessage, setSelectedGroupForMessage] = useState('');
    const [messageText, setMessageText] = useState('');
    const [currentGroup, setCurrentGroup] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [modalStep, setModalStep] = useState(1);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [isSendMessageEnabled, setIsSendMessageEnabled] = useState(false);
    const [attachmentFile, setAttachmentFile] = useState(null);

    useEffect(() => {
        dispatch(fetchGroups(currentPage));
    }, [dispatch, currentPage]);

    const handleSendMessage = (group) => {
        setIsGroupMessageMode(false);
        setCurrentGroup(group);
        setMessageText('');
        setMessageModalOpen(true);
    };

    const handleModalSend = () => {
        const groupToUse = isGroupMessageMode
            ? groupDetails.find(g => g.groupId === selectedGroupForMessage)
            : currentGroup;

        if (!groupToUse) return toast.error("Please select a group.");
        if (!messageText.trim() && !attachmentFile) {
            return toast.warn('Please enter a message or select a file.');
        }

        dispatch(sendGroupMessage({
            group: groupToUse,
            messageText,
            file: attachmentFile,
            onSuccess: () => {
                toast.success("Message sent successfully!");
                setMessageModalOpen(false);
                setAttachmentFile(null);
            },
            onError: () => toast.error("Failed to send message.")
        }));
    };

    const openCreateModal = () => {
        setCreateModalOpen(true);
        setModalStep(1);
        setSelectedUsers([]);
        setGroupName('');
        setIsSendMessageEnabled(false);
        dispatch(fetchUsers());
    };

    const handleCreateGroup = () => {
        if (!groupName.trim()) return toast.error("Group name is required.");
        if (selectedUsers.length === 0) return toast.error("Select at least one user.");

        const uniqueUsers = ["admin@mbank.com", ...selectedUsers.filter(user => user !== "admin@mbank.com")];

        dispatch(createGroup({
            numbers: uniqueUsers,
            groupName,
            readonly: isSendMessageEnabled,
            onSuccess: () => {
                toast.success("Group created successfully!");
                setCreateModalOpen(false);
                dispatch(fetchGroups(currentPage));
            },
            onError: () => toast.error("Failed to create group.")
        }));
    };

    const toggleSelectAll = () => {
        if (selectedGroups.length === groupDetails.length) {
            setSelectedGroups([]);
        } else {
            setSelectedGroups(groupDetails.map((_, i) => i));
        }
    };

    const toggleSelectGroup = (index) => {
        setSelectedGroups(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const handleComposeMessage = () => {
        setIsGroupMessageMode(true);
        setSelectedGroupForMessage('');
        setMessageText('');
        setMessageModalOpen(true);
    };

    const deleteSelectedGroups = () => {
        const updated = groupDetails.filter((_, idx) => !selectedGroups.includes(idx));
        toast.info("Deleted selected groups from view (not actual API delete)");
        setSelectedGroups([]);
    };

    return (
        <div className="page-content bg-light" style={{ paddingTop: '90px', minHeight: '100vh' }}>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="shadow-sm rounded border-0">
                            <CardBody>
                                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                                    <h4 className="fw-bold text-dark d-flex align-items-center mb-0">
                                        <img src={groupListIcon} alt="Group List Icon" className="me-2" style={{ width: '30px', height: '40px' }} />
                                        Group List
                                    </h4>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-info d-flex align-items-center" onClick={handleComposeMessage}>
                                            <MessageIcon className="me-2" />
                                            Compose a Group Message
                                        </button>
                                        <button className="btn d-flex align-items-center" style={{ backgroundColor: '#1e7a6d', color: 'white' }} onClick={openCreateModal}>
                                            <img src={feedback} alt="Create Group" className="me-2" style={{ width: '20px' }} />
                                            Create a Group
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                        <span className="group-name">Select All</span>
                                        <input
                                            type="checkbox"
                                            checked={selectedGroups.length === groupDetails.length && groupDetails.length > 0}
                                            onChange={toggleSelectAll}
                                            className="form-check-input group-checkbox"
                                        />
                                        <button className="btn btn-sm ms-3" onClick={deleteSelectedGroups} disabled={selectedGroups.length === 0}>
                                            <img src={trashIcon} alt="Delete Selected" style={{ width: '16px', height: '16px' }} />
                                        </button>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Search groups..." className="form-control" style={{ width: '250px' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : groupDetails.length > 0 ? (
                                    groupDetails.map((group, index) => (
                                        <div key={index} className={`p-3 border rounded mb-3 d-flex align-items-center ${selectedGroups.includes(index) ? 'bg-light' : ''}`}>
                                            <input type="checkbox" className="form-check-input me-3 group-checkbox" checked={selectedGroups.includes(index)} onChange={() => toggleSelectGroup(index)} />
                                            <div className="me-3">
                                                <div className="rounded-circle bg-secondary" style={{ width: 40, height: 40 }}></div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="group-name">{group.groupName}</div>
                                                <small className="text-muted">{group.memberCount ?? 0} members | ID: {group.groupId}</small>
                                            </div>
                                            <div className="d-flex gap-1">
                                                <button className="btn btn-sm p-1" onClick={() => navigate('/edit-group', { state: { group, index } })}>
                                                    <img src={editIcon} alt="Edit" style={{ width: '16px', height: '16px' }} />
                                                </button>
                                                <button className="btn btn-sm p-1">
                                                    <img src={deleteIcon} alt="Delete" style={{ width: '16px', height: '16px' }} />
                                                </button>
                                                <button className="btn btn-sm p-1" onClick={() => handleSendMessage(group)}>
                                                    <img src={sendIcon} alt="Send" style={{ width: '16px', height: '16px' }} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted text-center">No groups created yet.</p>
                                )}

                                <div className="d-flex justify-content-center mt-3">
                                    <nav>
                                        <ul className="pagination mb-0 custom-pagination">
                                            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}>
                                                    Previous
                                                </button>
                                            </li>
                                            {[...Array(totalPages)].map((_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
                                                    <button className="page-link" onClick={() => setCurrentPage(i)}>
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                                                <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}>
                                                    Next
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Create Group Modal - Step 1 */}
            <Modal isOpen={createModalOpen && modalStep === 1} toggle={() => setCreateModalOpen(false)} centered size="md">
                <ModalHeader toggle={() => setCreateModalOpen(false)}>Create New Group</ModalHeader>
                <ModalBody style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <Label className=" mb-2" style={{ color: '#1e7a6d' }}>Add Members</Label>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                                style={{ border: '0.3px solid black' }}
                                checked={selectedUsers.length === (userList?.length || 0) && (userList?.length || 0) > 0}

                                onChange={(e) => {
                                    setSelectedUsers(e.target.checked ? [...userList] : []);
                                }}
                                id="selectAll"
                            />
                            <Label htmlFor="selectAll" className="form-check-label">
                                Select All
                            </Label>
                        </div>
                        <Input
                            type="text"
                            placeholder="Search email"
                            bsSize="sm"
                            style={{ width: '150px', border: '0.5px solid #ccc' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {loadingUsers ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading users...</span>
                            </div>
                        </div>
                    ) : (
                        (userList || []).filter(email =>
                            email.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((email, idx) => (
                            <div key={idx} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    id={`user-${idx}`}
                                    style={{ border: '0.3px solid black' }}
                                    checked={selectedUsers.includes(email)}
                                    onChange={() =>
                                        setSelectedUsers(prev =>
                                            prev.includes(email)
                                                ? prev.filter(e => e !== email)
                                                : [...prev, email]
                                        )
                                    }
                                />
                                <Label htmlFor={`user-${idx}`} className="form-check-label">
                                    {email}
                                </Label>
                            </div>
                        ))
                    )}
                </ModalBody>

                <ModalFooter>
                    <button className="btn btn-secondary" onClick={() => setCreateModalOpen(false)}>Close</button>
                    <button className="btn ms-2" style={{ backgroundColor: "#1e7a6d", color: "white" }} onClick={() => setModalStep(2)}>Next</button>
                </ModalFooter>
            </Modal>

            {/* Create Group Modal - Step 2 */}
            <Modal isOpen={createModalOpen && modalStep === 2} toggle={() => setCreateModalOpen(false)} centered>
                <ModalHeader toggle={() => setCreateModalOpen(false)}>Create New Group</ModalHeader>
                <ModalBody>
                    <Input
                        className="mb-4"
                        placeholder="Enter Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <div className="mb-3">
                        <h6 className="fw-bold" style={{ color: '#1e7a6d' }}>Group Permission</h6>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span>Readonly </span>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="sendMessage"
                                    checked={isSendMessageEnabled}
                                    onChange={(e) => setIsSendMessageEnabled(e.target.checked)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap gap-3 justify-content-start">
                        {selectedUsers.map((user, index) => (
                            <div key={index} className="d-flex flex-column align-items-center" style={{ width: '70px' }}>
                                <div className="rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
                                <small className="text-center mt-1">{user.split('@')[0]}</small>
                            </div>
                        ))}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-secondary" onClick={() => setModalStep(1)}>Back</button>
                    <button className="btn" style={{ backgroundColor: '#1e7a6d', color: 'white' }} onClick={handleCreateGroup}>Create</button>
                </ModalFooter>
            </Modal>

            {/* Send Message Modal */}
            <Modal isOpen={messageModalOpen} toggle={() => { setMessageModalOpen(false); setAttachmentFile(null); }} centered>
                <ModalHeader toggle={() => { setMessageModalOpen(false); setAttachmentFile(null); }}>New Message</ModalHeader>
                <ModalBody>
                    <Label>To:</Label>
                    {isGroupMessageMode ? (
                        <Input
                            type="select"
                            value={selectedGroupForMessage}
                            onChange={(e) => setSelectedGroupForMessage(e.target.value)}
                        >
                            <option value="">Select Group</option>
                            {groupDetails.map((g, i) => (
                                <option key={i} value={g.groupId}>{g.groupName}</option>
                            ))}
                        </Input>
                    ) : (
                        <Input type="text" value={currentGroup?.groupName || ''} disabled />
                    )}
                    <Label className="mt-3">Message:</Label>
                    <Input
                        type="textarea"
                        rows="4"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                    />
                    <Label className="mt-3">Attachment</Label>
                    <Input
                        type="file"
                        onChange={(e) => setAttachmentFile(e.target.files[0])}
                    />
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-secondary" onClick={() => { setMessageModalOpen(false); setAttachmentFile(null); }}>
                        Close
                    </button>
                    <button className="btn" style={{ backgroundColor: '#1e7a6d', color: 'white' }} onClick={handleModalSend}>
                        Send
                    </button>
                </ModalFooter>
            </Modal>

            <ToastContainer position="top-right" autoClose={1000} />
        </div>
    );
};

export default CreateGroup;































