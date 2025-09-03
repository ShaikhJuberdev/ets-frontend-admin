
import React, { useEffect, useState } from 'react';
import {
    Container, Row, Col, Card, CardBody, Table, Button,
    Modal, ModalHeader, ModalBody, ModalFooter, Input, Label
} from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import logo from "../../assets/images/SVG/group.svg";
import cameraIcon from "../../assets/images/SVG/camera.svg";

import {
    fetchGroupDetails,
    fetchUsers,
    editGroupName,
    addMember,
    removeMember,
    makeAdmin
} from '../../store/group/actions';

const EditGroup = () => {
    const location = useLocation();
    const { group } = location.state || {};
    const groupName = group?.groupName || "Selected Group";
    const groupId = group?.groupId;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        groupDetails = null,
        groupDetailsLoading = false,
        users = [],
        userLoading = false,
        groupUpdating = false,
        error = null
    } = useSelector(state => state.group);

    const defaultAdmin = "admin@mbank.com";
    const [selectedToAdd, setSelectedToAdd] = useState([]);
    const [modal, setModal] = useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [newGroupName, setNewGroupName] = useState(groupName);
    const [editGroupNameModal, setEditGroupNameModal] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [nameMap, setNameMap] = useState({});

    const generateRandomName = (email) => {
        const firstNames = ['Aarav', 'Isha', 'Karan', 'Meera', 'Rohit', 'Anaya', 'Tara', 'Nikhil', 'Riya', 'Kabir'];
        const lastNames = ['Sharma', 'Patel', 'Kapoor', 'Singh', 'Mehta', 'Desai', 'Joshi', 'Verma', 'Reddy', 'Mishra'];
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${first} ${last}`;
    };

    const toggleModal = () => setModal(!modal);

    const openConfirmationModal = (type, email) => {
        setConfirmAction({ type, email });
        setConfirmationModalOpen(true);
    };

    const openEditGroupNameModal = () => {
        setNewGroupName(groupDetails?.groupName || groupName);
        setEditGroupNameModal(true);
    };

    const handleConfirmAction = () => {
        if (confirmAction) {
            const { type, email } = confirmAction;
            if (type === 'remove') handleRemove(email);
            else if (type === 'makeAdmin') handleMakeAdmin(email);
            setConfirmationModalOpen(false);
            setConfirmAction(null);
        }
    };

    useEffect(() => {
        if (groupId) {
            dispatch(fetchGroupDetails(groupId));
        }
    }, [dispatch, groupId]);

    useEffect(() => {
        if (modal) {
            dispatch(fetchUsers());
        }
    }, [modal, dispatch]);

    useEffect(() => {
        if (users.length > 0 && groupDetails?.memberList) {
            const currentMembers = groupDetails.memberList || [];
            const filtered = users.filter(email => !currentMembers.includes(email));
            setFilteredUsers(filtered);
        }
    }, [users, groupDetails]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleUserSelect = (email) => {
        setSelectedToAdd(prev =>
            prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
        );
    };

    const handleAddCustomer = () => {
        if (selectedToAdd.length === 0) {
            toast.error("Select at least one user to add.");
            return;
        }

        const existingMembers = groupDetails?.memberList || [];
        const updatedMembers = [...new Set([...existingMembers, ...selectedToAdd])];
        const uniqueAdmins = [...new Set([defaultAdmin, ...(groupDetails?.adminList || [])])];

        dispatch(addMember({
            numbers: updatedMembers,
            groupName: groupDetails?.groupName || groupName,
            type: "add",
            groupId,
            adminlist: uniqueAdmins,
            adminType: "add",
            ...(groupDetails?.groupMode === "READONLY" ? { readonly: true } : {}),
            onSuccess: () => {
                toast.success("Member added successfully.");
                setSelectedToAdd([]);
                toggleModal();
                dispatch(fetchGroupDetails(groupId));
            },
            onError: () => toast.error("Failed to add member.")
        }));
    };

    const handleMakeAdmin = (email) => {
        const allMemberEmails = groupDetails?.memberList || [];
        const newAdminList = [...new Set([defaultAdmin, ...(groupDetails?.adminList || []), email])];

        dispatch(makeAdmin({
            numbers: allMemberEmails,
            groupName: groupDetails?.groupName || groupName,
            type: "add",
            groupId,
            adminlist: newAdminList,
            adminType: "add",
            ...(groupDetails?.groupMode === "READONLY" ? { readonly: true } : {}),
            onSuccess: () => {
                toast.success(`${email} promoted to admin.`);
                setConfirmationModalOpen(false);
                dispatch(fetchGroupDetails(groupId));
            },
            onError: () => toast.error("Failed to make admin.")
        }));
    };

    const handleRemove = (emailToRemove) => {
        const existingMembers = groupDetails?.memberList || [];
        const updatedMembers = existingMembers.filter(email => email !== emailToRemove);
        const uniqueAdmins = [...new Set([defaultAdmin, ...(groupDetails?.adminList || [])])];

        dispatch(removeMember({
            numbers: updatedMembers,
            removedMembers: emailToRemove,
            groupName: groupDetails?.groupName || groupName,
            type: "remove",
            groupId,
            adminlist: uniqueAdmins,
            adminType: "add",
            ...(groupDetails?.groupMode === "READONLY" ? { readonly: true } : {}),
            onSuccess: () => {
                toast.success(`${emailToRemove} removed from the group.`);
                setConfirmationModalOpen(false);
                dispatch(fetchGroupDetails(groupId));
            },
            onError: () => toast.error("Failed to remove the user.")
        }));
    };

    const handleSaveGroupName = () => {
        if (!newGroupName.trim()) {
            toast.warn("Enter group name");
            return;
        }

        dispatch(editGroupName({
            numbers: groupDetails?.memberList || [],
            groupName: newGroupName,
            type: "add",
            groupId,
            adminlist: groupDetails?.adminList || [defaultAdmin],
            adminType: "add",
            ...(groupDetails?.groupMode === "READONLY" ? { readonly: true } : {}),
            onSuccess: () => {
                toast.success("Group name updated");
                setEditGroupNameModal(false);
                dispatch(fetchGroupDetails(groupId));
            },
            onError: () => toast.error("Failed to update group name.")
        }));
    };

    const handleSearch = (e) => {
        const keyword = e.target.value.toLowerCase();
        const currentMembers = groupDetails?.memberList || [];
        const result = users.filter(email => 
            email.toLowerCase().includes(keyword) && !currentMembers.includes(email)
        );
        setFilteredUsers(result);
    };

    return (
        <div className="page-content bg-light" style={{ paddingTop: '90px', minHeight: '100vh' }}>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col lg={11}>
                        <Card className="shadow-sm rounded border-0">
                            <CardBody>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <img src={logo} alt="logo" width="30" />
                                        <h5 className="fw-bold mb-0 d-flex align-items-center">
                                            Group Name - {groupDetails?.groupName || groupName}
                                            <span
                                                onClick={openEditGroupNameModal}
                                                style={{
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    padding: '4px 6px',
                                                    marginLeft: '8px',
                                                    cursor: 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#f8f9fa',
                                                    transition: '0.2s',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e2e6ea'}
                                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </span>
                                        </h5>
                                    </div>
                                    <Button 
                                        onClick={toggleModal} 
                                        style={{ backgroundColor: '#105f63', borderColor: '#105f63', color: 'white' }}
                                        disabled={groupDetailsLoading || groupUpdating}
                                    >
                                        + Add Member
                                    </Button>
                                </div>

                                <div>
                                    <Table responsive bordered hover className="text-center mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th style={{ width: '10%' }}>Sr No.</th>
                                                <th>Name</th>
                                                <th>Email ID</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groupDetails?.memberList?.length > 0 ? (
                                                groupDetails.memberList.map((email, i) => {
                                                    const isAdmin = groupDetails?.adminList?.includes(email);
                                                    return (
                                                        <tr key={i}>
                                                            <td style={{ textAlign: 'left' }}>{i + 1}</td>
                                                            <td style={{ textAlign: 'left' }}>
                                                                {(() => {
                                                                    const name = email === defaultAdmin ? "Deepak Narwal" : (nameMap[email] || generateRandomName(email));
                                                                    if (!nameMap[email] && email !== defaultAdmin) {
                                                                        setNameMap(prev => ({ ...prev, [email]: name }));
                                                                    }
                                                                    return name;
                                                                })()}
                                                            </td>
                                                            <td style={{ textAlign: 'left' }}>
                                                                <a href={`mailto:${email}`}>{email}</a>
                                                            </td>
                                                            <td className="text-nowrap d-flex justify-content-center align-items-center gap-2">
                                                                {isAdmin ? (
                                                                    <span style={{
                                                                        backgroundColor: '#105f63',
                                                                        color: 'white',
                                                                        padding: '5px 12px',
                                                                        fontSize: '13px',
                                                                        borderRadius: '5px',
                                                                        display: 'inline-flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        minWidth: '60px',
                                                                        height: '30px',
                                                                    }}>
                                                                        Admin
                                                                    </span>
                                                                ) : (
                                                                    <Button
                                                                        size="sm"
                                                                        color="info"
                                                                        style={{ minWidth: '60px', height: '30px' }}
                                                                        onClick={() => openConfirmationModal('makeAdmin', email)}
                                                                        disabled={groupUpdating}
                                                                    >
                                                                        Make Admin
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    size="sm"
                                                                    color="danger"
                                                                    style={{ minWidth: '60px', height: '30px' }}
                                                                    onClick={() => openConfirmationModal('remove', email)}
                                                                    disabled={groupUpdating}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-muted">No members found in this group.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>

                                    <div className="mt-3" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <Button
                                            onClick={() => navigate('/creategroup')}
                                            style={{ backgroundColor: '#6c757d', borderColor: '#6c757d', color: 'white', borderRadius: '5px' }}
                                        >
                                            ← Back
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modal} toggle={toggleModal} centered>
                <ModalHeader toggle={toggleModal}>Add Member</ModalHeader>
                <ModalBody>
                    <Input 
                        type="text" 
                        placeholder="Search email..." 
                        className="mb-3" 
                        onChange={handleSearch} 
                        style={{ borderColor: '#ced4da', boxShadow: '0 0 0 0.1rem rgba(16, 95, 99, 0.25)' }} 
                    />
                    {userLoading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : filteredUsers.length > 0 ? (
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {filteredUsers.map((email, idx) => (
                                <div key={idx} className="d-flex align-items-center mb-2">
                                    <Input 
                                        type="checkbox" 
                                        id={`user-${idx}`} 
                                        checked={selectedToAdd.includes(email)} 
                                        onChange={() => handleUserSelect(email)} 
                                    />
                                    <Label for={`user-${idx}`} className="ms-2">{email}</Label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">No users available to add.</p>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button 
                        onClick={handleAddCustomer} 
                        style={{ backgroundColor: '#105f63', borderColor: '#105f63', color: 'white' }} 
                        disabled={groupUpdating || userLoading}
                    >
                        Add
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={confirmationModalOpen} toggle={() => setConfirmationModalOpen(false)} centered>
                <ModalHeader toggle={() => setConfirmationModalOpen(false)}>
                    {confirmAction?.type === 'remove' ? 'Remove Member' : 'Assign Admin'}
                </ModalHeader>
                <ModalBody>
                    {confirmAction?.type === 'remove' ? (
                        <>
                            Are you sure you want to remove <strong>{nameMap[confirmAction?.email] || confirmAction?.email}</strong> from group <strong>{groupDetails?.groupName || groupName}</strong>?
                        </>
                    ) : (
                        <>
                            <p className="text-muted mt-2 mb-0" style={{ fontSize: '14px' }}>
                                <strong>{nameMap[confirmAction?.email] || confirmAction?.email}</strong> will be able to edit this group and its members.
                            </p>
                        </>
                    )}
                </ModalBody>
                <ModalFooter className="d-flex justify-content-end gap-2">
                    <Button
                        color="secondary"
                        style={{ minWidth: '110px' }}
                        onClick={() => setConfirmationModalOpen(false)}
                    >
                        {confirmAction?.type === 'remove' ? 'No' : 'Cancel'}
                    </Button>
                    <Button
                        color="info"
                        style={{ minWidth: '110px', color: 'white' }}
                        onClick={handleConfirmAction}
                        disabled={groupUpdating}
                    >
                        {confirmAction?.type === 'remove' ? 'Yes' : 'Make Admin'}
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={editGroupNameModal}
                toggle={() => setEditGroupNameModal(false)}
                centered
                className="custom-edit-group-modal"
            >
                <ModalBody className="text-center">
                    <div className="d-flex justify-content-center mb-3">
                        <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                            <img
                                src={logo}
                                alt="Group Logo"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    border: '2px solid #ccc',
                                    padding: '5px',
                                    backgroundColor: 'white',
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                    width: '22px',
                                    height: '22px',
                                    backgroundColor: 'white',
                                    borderRadius: '50%',
                                    border: '1px solid #ccc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={cameraIcon}
                                    alt="Camera Icon"
                                    style={{
                                        width: '12px',
                                        height: '14px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <Input
                        type="text"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="Enter new group name"
                        style={{
                            fontSize: '14px',
                            padding: '6px 10px',
                            height: '36px',
                            width: '60%',
                            margin: '0 auto 24px auto',
                            border: '1px solid black',
                        }}
                    />
                    <div className="d-flex justify-content-center gap-2">
                        <Button
                            color="primary"
                            onClick={handleSaveGroupName}
                            disabled={!newGroupName.trim() || groupUpdating}
                            style={{
                                fontSize: '14px',
                                padding: '6px 16px',
                                minWidth: '80px'
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => setEditGroupNameModal(false)}
                            style={{
                                fontSize: '14px',
                                padding: '6px 16px',
                                minWidth: '80px'
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

            <ToastContainer position="top-right" autoClose={1000} />

            {(groupDetailsLoading || groupUpdating || userLoading) && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditGroup;