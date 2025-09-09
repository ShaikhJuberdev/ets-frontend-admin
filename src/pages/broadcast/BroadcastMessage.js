

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "../../assets/images/picture/search.svg";


const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT_8080 = process.env.REACT_APP_API_PORT_8080;
const sendUsername = process.env.REACT_APP_USERNAME;
const sendPassword = process.env.REACT_APP_PASSWORD;

const BroadcastMessage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [broadcastName, setBroadcastName] = useState("");
    const [broadcastDescription, setBroadcastDescription] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);



    const sendAuth = btoa(`${sendUsername}:${sendPassword}`);


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${API_HOST}:${API_PORT_8080}/v1/accounts/listofuser`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Basic ${sendAuth}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data);
                setTotalElements(data.length);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [sendAuth]);


    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedUsers(users.map((u) => u.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (id) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
        );
    };

    const isAllSelected =
        users.length > 0 && selectedUsers.length === users.length;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSendBroadcast = async () => {
        if (selectedUsers.length === 0) {
            toast.warning("Please select at least one user.");
            return;
        }
        if (!broadcastName.trim()) {
            toast.warning("Please enter a broadcast name.");
            return;
        }
        if (!broadcastDescription.trim()) {
            toast.warning("Please enter a broadcast description.");
            return;
        }

        const payload = {
            usernames: selectedUsers,
            title: broadcastName,
            body: broadcastDescription,
            type: 7,
            filtertype: "",
        };

        try {
            const response = await fetch(
                `${API_HOST}:${API_PORT_8080}/v1/messages/sendmessagesmany`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${sendAuth}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to send broadcast: ${response.status}`);
            }

            const result = await response.json();
            console.log("Broadcast response:", result);
            toast.success("Broadcast sent successfully!");
            setBroadcastName("");
            setBroadcastDescription("");
            setSelectedUsers([]);
        } catch (error) {
            console.error("Error sending broadcast:", error);
            toast.error("Failed to send broadcast");
        }
    };

    const filteredUsers = users.filter(user => 
        user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.type.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
        <div className="page-content">
            <div className="broadcast-page-container">
                <h2 className="broadcast-title">New Broadcast</h2>
                <div className="broadcast-main-content">
                        
                        <div className="broadcast-message-section">
                            <h3 className="section-title">What message do you want to send?</h3>
                            
                            <div className="form-group">
                                <label className="form-label">Broadcast Name:</label>
                                <input
                                    type="text"
                                    className="broadcast-name-input"
                                    placeholder="Enter broadcast name"
                                    value={broadcastName}
                                    onChange={(e) => setBroadcastName(e.target.value)}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Broadcast Description</label>
                                <textarea
                                    className="broadcast-name-input"
                                    placeholder="Enter broadcast description"
                                    rows="4"
                                    value={broadcastDescription}
                                    onChange={(e) => setBroadcastDescription(e.target.value)}
                                />
                            </div>
                        </div>

                       
                        <div className="broadcast-contacts-section">
                            <h3 className="section-title">Who do you want to send it to?</h3>
                            
                            <div className="contacts-header">
                                <span className="contacts-prompt">Select Contact below </span>
                            </div>
                            
                            <div className="search-container">
                                <div className="search-input-wrapper">
                                    <input
                                        type="text"
                                        className="broadcast-name-input"
                                        placeholder="Search contacts..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <img src={SearchIcon} alt="Search" className="search-icon" />

                                </div>
                            </div>
                            
                            <div className="selected-contacts-info">
<span style={{fontWeight:600}}>Selected:</span>
                                <span className="selected-count"> {selectedUsers.length} contact{selectedUsers.length !== 1 ? 's' : ''}</span>
                            </div>
                            
                            <TableContainer className="contacts-table-container">
                                <Table sx={{ backgroundColor: '#e0e1e2', '& th, & td': { backgroundColor: '#e0e1e2' } }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <div className="select-all-container">
                                                    <input
                                                        type="checkbox"
                                                        checked={isAllSelected}
                                                        onChange={handleSelectAll}
                                                        className="select-all-checkbox"
                                                        ref={(el) => {
                                                            if (el) {
                                                                el.indeterminate =
                                                                    selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length;
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="table-header">Phone</TableCell>
                                            <TableCell className="table-header">Device Type</TableCell>
                                            <TableCell className="table-header">Created at</TableCell>
                                            <TableCell className="table-header">Last Seen</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center" className="loading-cell">
                                                    <CircularProgress />
                                                </TableCell>
                                            </TableRow>
                                        ) : filteredUsers.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center" className="no-data-cell">
                                                    No contacts found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredUsers
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((user) => (
                                                <TableRow key={user.id} className="contact-table-row">
                                                    <TableCell>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedUsers.includes(user.id)}
                                                            onChange={() => handleSelectUser(user.id)}
                                                            className="contact-checkbox"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="contact-phone">{user.id}</TableCell>
                                                    <TableCell className="contact-device">{user.type}</TableCell>
                                                    <TableCell className="contact-created">{user.created}</TableCell>
                                                    <TableCell className="contact-lastseen">{user.lastseen}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                            {filteredUsers.length > 0 && (
                                <TablePagination
                                    component="div"
                                    count={filteredUsers.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    labelRowsPerPage="Rows per page:"
                                    className="contacts-pagination"
                                />
                            )}
                        </div>

                        
                        <div className="broadcast-actions">
                            <button className="send-broadcast-btn" onClick={handleSendBroadcast}>
                                Send Broadcast
                            </button>
                        </div>
                    </div>
                </div>

            <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </>
    );
};

export default BroadcastMessage;
