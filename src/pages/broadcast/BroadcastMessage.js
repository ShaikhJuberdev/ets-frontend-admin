
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



const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT_8080 = process.env.REACT_APP_API_PORT_8080;
const sendUsername = process.env.REACT_APP_USERNAME;
const sendPassword = process.env.REACT_APP_PASSWORD;

const BroadcastMessage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [broadcastMessage, setBroadcastMessage] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
        if (!broadcastMessage.trim()) {
            toast.warning("Please enter a broadcast message.");
            return;
        }

        const payload = {
            usernames: selectedUsers,
            title: "alert",
            body: broadcastMessage,
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
            setBroadcastMessage("");
            setSelectedUsers([]);
        } catch (error) {
            console.error("Error sending broadcast:", error);
            toast.error("Failed to send broadcast");
        }
    };

    return (
        <>
            <div className="page-content">
                <Paper>

                    <div className="d-flex align-items-end justify-content-end broadcast_header_box">
                        <input
                            placeholder="Enter a Broadcast message..."
                            className="broadcast_page_input"
                            value={broadcastMessage}
                            onChange={(e) => setBroadcastMessage(e.target.value)}
                        />
                        <button
                            className="broadcast_page_sendbtn"
                            onClick={handleSendBroadcast}
                        >
                            Send Broadcast
                        </button>
                    </div>


                    <TableContainer className="alert_table_container">
                        <Table>
                            <TableHead>
                                <TableRow>

                                    <TableCell>
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span>Select All</span>
                                            <input
                                                type="checkbox"
                                                checked={isAllSelected}
                                                onChange={handleSelectAll}
                                                style={{ width: "20px", height: "20px" }}
                                                ref={(el) => {
                                                    if (el) {
                                                        el.indeterminate =
                                                            selectedUsers.length > 0 && selectedUsers.length < users.length;
                                                    }
                                                }}
                                            />
                                        </div>
                                    </TableCell>

                                    <TableCell>Phone No.</TableCell>
                                    <TableCell>Device Type</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Last Seen</TableCell>


                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={9}
                                            align="center"
                                            style={{ height: "200px" }}
                                        >
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            No Alerts Found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.id} className="alert_table_row">
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(user.id)}
                                                    onChange={() => handleSelectUser(user.id)}
                                                />
                                            </TableCell>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.type}</TableCell>
                                            <TableCell>{user.created}</TableCell>
                                            <TableCell>{user.lastseen}</TableCell>

                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>


                    {users.length > 0 && (
                        <TablePagination
                            component="div"
                            count={totalElements}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[]}
                            labelRowsPerPage=""
                            className="alert_table_pegination"
                        />
                    )}
                </Paper>
            </div>


            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default BroadcastMessage;


