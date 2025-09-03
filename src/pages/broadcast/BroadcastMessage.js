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
    Alert,
} from "@mui/material";



const BroadcastMessage = () => {



    const [users, setUsers] = useState([]);

    const API_HOST = process.env.REACT_APP_API_HOST;
    const API_PORT_8082 = process.env.REACT_APP_API_PORT_8082;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const username = "+919370813281";
    // const password = "uPi5/27LMFe0qDgrPbR6Z3dV";
    const password = "KokVc8aV9a/qvv3HMd8Lzzba"
    const auth = btoa(`${username}:${password}`);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://192.168.2.179:8080/v1/accounts/listofuser",
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Basic ${auth}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.status}`);
                }

                const data = await response.json();
                // console.log('data', data)
                setUsers(data)
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers()
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <>
            <div className="page-content">
                {/* {error && <Alert severity="error">{error}</Alert>} */}

                <Paper>

                    <div className="d-flex align-items-end justify-content-end broadcast_header_box">
                        <input placeholder="Enter a Broadcast message..." className="broadcast_page_input"/>
                        {/* <button className="broadcast_page_selectall">
                            Select All
                        </button> */}
                        <button className="broadcast_page_sendbtn">
                            Send Broadcast
                        </button>
                    </div>
                    <TableContainer className="alert_table_container">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Select All</TableCell>
                                    <TableCell>Phone No.</TableCell>
                                    <TableCell>Device Type</TableCell>
                                    <TableCell>Created At</TableCell>
                                    {/* <TableCell>Alert Type</TableCell> */}
                                    <TableCell>Action</TableCell>
                                    {/* <TableCell>Timestamp</TableCell> */}
                                    {/* <TableCell>Camera ID</TableCell> */}
                                    {/* <TableCell>Subtype</TableCell> */}
                                    {/* <TableCell>Picture</TableCell> */}
                                    {/* <TableCell>Filename</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center" style={{ height: "200px" }}>
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
                                            <TableCell ><input type="checkbox"/></TableCell>
                                            <TableCell >{user.id}</TableCell>
                                            <TableCell>{user.type}</TableCell>
                                            <TableCell>{user.created}</TableCell>
                                            {/* <TableCell>{user.lat} / {user.lon}</TableCell>

                                            <TableCell>{alert.alerttype}</TableCell>
                                            <TableCell>{alert.description}</TableCell>
                                            <TableCell>{alert.timestamp}</TableCell> */}
                                            {/* <TableCell>{alert.camerdid}</TableCell> */}
                                            {/* <TableCell>{alert.subtype}</TableCell> */}
                                            {/* <TableCell>{alert.base64image === null && "Not Found!"}</TableCell>
                      <TableCell>{alert.filename}</TableCell> */}
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
        </>
    )
}

export default BroadcastMessage
