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

const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT_8082 = process.env.REACT_APP_API_PORT_8082;
const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [loading, setLoading] = useState(false);

  const auth = btoa(`${username}:${password}`);

  useEffect(() => {
    fetchAlerts(page, rowsPerPage);
    
  }, [page, rowsPerPage]);

  const fetchAlerts = async (pageNumber, pageSize) => {
    setLoading(true);
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

      if (data && Array.isArray(data.content)) {
        // Case: API returns paginated object
        setAlerts(data.content);
        setTotalAlerts(data.totalElements || 0);
      } else if (Array.isArray(data)) {
        // Case: API returns plain array with alerts + last "total" object
        const filtered = data.filter(
          (item) => item.location && item.lat && item.lon
        );
        setAlerts(filtered);

        // Get total from last object if available, otherwise use filtered length
        const totalObj = data.find((item) => item.total);
        setTotalAlerts(totalObj ? Number(totalObj.total) : filtered.length);
      } else {
        setAlerts([]);
        setTotalAlerts(0);
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "-";

    // Case 1: If timestamp is a number (epoch in seconds)
    if (!isNaN(timestamp)) {
      const date = new Date(Number(timestamp) * 1000);
      return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }

    // Case 2: If timestamp is ISO string
    const date = new Date(timestamp);
    if (!isNaN(date)) {
      return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }

    return timestamp;
  };

  return (
    <div className="page-content">
      <Paper>
        <TableContainer className="alert_table_container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Lat</TableCell>
                <TableCell>Lon</TableCell>
                <TableCell>Alert Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Alert At On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    style={{ height: "200px" }}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : alerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Alerts Found
                  </TableCell>
                </TableRow>
              ) : (
                alerts.map((alert, idx) => (
                  <TableRow key={idx} className="alert_table_row">
                    <TableCell>{alert.location}</TableCell>
                    <TableCell>{alert.lat}</TableCell>
                    <TableCell>{alert.lon}</TableCell>
                    <TableCell>{alert.alerttype}</TableCell>
                    <TableCell>{alert.description}</TableCell>
                    <TableCell>{formatTimestamp(alert.timestamp)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalAlerts > 0 && (
          <TablePagination
            component="div"
            count={totalAlerts}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10]}
            labelRowsPerPage="Rows per page:"
            className="alert_table_pegination"
          />
        )}
      </Paper>
    </div>
  );
};

export default AlertList;
