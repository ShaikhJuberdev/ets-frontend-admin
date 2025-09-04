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



const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT_8082 = process.env.REACT_APP_API_PORT_8082;

 const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;


const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



 
  const auth = btoa(`${username}:${password}`);

  useEffect(() => {
    fetchAlerts(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchAlerts = async (pageNumber, pageSize) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_HOST}:${API_PORT_8082}/v1/messages/getalertlist?page=${pageNumber}&size=${pageSize}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${auth}`,
        },
      });



      const data = await response.json();
      setAlerts(data || []);
      setTotalElements(data.page?.totalElements || 0);

    
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  console.log(alerts)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
    <>
      <div className="page-content">
        {/* {error && <Alert severity="error">{error}</Alert>} */}

        <Paper>
          <TableContainer className="alert_table_container">
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>Alert ID</TableCell> */}
                  <TableCell>Location</TableCell>
                  <TableCell>Lat and Lan</TableCell>
                  <TableCell>Alert Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Alert At On</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" style={{ height: "200px" }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : alerts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No Alerts Found
                    </TableCell>
                  </TableRow>
                ) : (
                  alerts.map((alert) => (
                    <TableRow key={alert.alertId} className="alert_table_row">
                      {/* <TableCell >{alert.alertId}</TableCell> */}
                      <TableCell>{alert.location}</TableCell>
                      <TableCell>{alert.lat} / {alert.lon}</TableCell>

                      <TableCell>{alert.alerttype}</TableCell>
                      <TableCell>{alert.description}</TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
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

          {alerts.length > 0 && (
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

  );
};

export default AlertList;
