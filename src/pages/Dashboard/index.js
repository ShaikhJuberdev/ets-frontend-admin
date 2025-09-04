import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,

} from "reactstrap";
import { Link, useNavigate } from "react-router-dom"; import servicesIcon1 from "../../assets/images/SVG/Call_to_be_reschduled.svg";
import servicesIcon2 from "../../assets/images/SVG/Total_customer.svg";
import servicesIcon3 from "../../assets/images/SVG/HN_customer.svg";
import servicesIcon4 from "../../assets/images/SVG/Call_to_be_reschduled.svg";
import reportIcon from '../../assets/images/report.svg'
import userListIcon from "../../assets/images/user_list.svg"
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AlertIcon from "../../assets/images/alert.svg"
import BroadcastIconA from "../../assets/images/Broadcast Management.svg"
import MessageValuemIcon from "../../assets/images/message_volume.svg"
import userManage from "../../assets/images/User_mangement.svg"
import notFountImg from "../../assets/images/Not Found.gif"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import RMLineChart from 'pages/AllCharts/chartjs/RMLineChart';


//i18n
import { toast } from 'react-toastify';




const API_HOST = process.env.REACT_APP_API_HOST;
const API_PORT_8082 = process.env.REACT_APP_API_PORT_8082;


const API_PORT_8080 = process.env.REACT_APP_API_PORT_8080;

const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;


const Dashboard = props => {
  const [menu, setMenu] = useState(false);
  // const [showAddMailForm, setShowAddMailForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;


  // const username = "pts@pts.com";
  // const password = "7Py9jIxCBYkRLVdiwRbMmRH+"
  const auth = btoa(`${username}:${password}`);

  // const usernameforusers = "pts@pts.com";
  // const passwordforusers = "EY128Ak4vx6vPfmbU4uO6QM6";
  // const authforusers = btoa(`${usernameforusers}:${passwordforusers}`);

  const [alerts, setAlerts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);






  useEffect(() => {
    fetchAlerts(page, rowsPerPage);
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchAlerts = async (pageNumber, pageSize) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_HOST}:${API_PORT_8082}/v1/messages/getalertlist?page=${pageNumber}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${auth}`,
        },
      });


    const data = await response.json();
      // const data = await response.json();
      // console.log('data', data)
      // setAlerts(data || []);
      // setTotalElements(data.page?.totalElements || 0);
      if (Array.isArray(data) && data.length > 0) {
        const lastObj = data[data.length - 1];

        if (lastObj.total) {
          // total is in the last object
          setTotalElements(parseInt(lastObj.total, 10) || 0);
          setAlerts(data.slice(0, -1));
        } else {
          setAlerts(data);
          setTotalElements(0);
        }
      } else {
        setAlerts([]);
        setTotalElements(0);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };




  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${API_HOST}:${API_PORT_8080}/v1/accounts/listofuser`,
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

      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const totalUsers = users.length || 0

  const handleDeleteUser = async (number) => {
    try {
      const deleteuser = await fetch(`${API_HOST}:${API_PORT_8080}/v1/accounts/deleteaccount/${number}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Basic ${auth}`,
          },
        }
      );

      if (deleteuser.ok) {
        toast.success("User Deleted Successfully!");
        setUsers(prev => prev.filter(user => user.id !== number));
      } else {
        toast.error("Failed to delete user");
      }

    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Something went wrong!");
    }
  }



  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  // console.log(' alerts, totalElements',  alerts, totalElements)
  document.title = "Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>


          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat dashboard-card  ">
                <CardBody>
                  <div className="d-flex flex-row">
                    <div className="d-flex gap-2 flex-row align-items-center ">
                      <div className='dashboard_card_image_box'><img src={AlertIcon} alt="" className='dashboard_card_image' /></div>

                      <h5 className="card-text dashboard-card-heading-text  ">
                        Alerts
                      </h5>
                    </div>
                  </div>

                  <div style={{ cursor: 'pointer' }}>

                    <h3 className='mt-2'>
                      <Link to={""}
                        className="card-no">
                        {totalElements || 0}
                      </Link>
                    </h3>
                    <div className='card-text1  '>
                      Alerts of all categories
                    </div>
                  </div>

                  <div className='d-flex align-item-center justify-content-between mt-2'>
                    <Link to={"/alertlist"}>
                      <button className='dashboard-card-view-btn'>
                        View</button></Link>
                    <button className='dashboard-card-view-btn2 mx-2'>Create Alert</button>
                  </div>

                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat dashboard-card  ">
                <CardBody>
                  <div className=" d-flex flex-row">
                    <div className="d-flex gap-2 flex-row align-items-center">
                      <div className='dashboard_card_image_box'>  <img src={userManage} alt="" className='dashboard_card_image' /></div>

                      <h5 className="card-text dashboard-card-heading-text  ">
                        All Users
                      </h5>
                    </div>
                  </div>
                  <div></div>

                  <div>
                    <h3 className='mt-2'>
                      <Link to={""}
                        className="card-no mt-2">
                        {totalUsers}
                      </Link>
                    </h3>


                    <div className='card-text1'>
                      Total Active Users Count
                    </div>

                  </div>


                  <div className='d-flex align-item-center justify-content-between mt-2'>
                    <button className='dashboard-card-view-btn'>View</button>
                    <button className='dashboard-card-view-btn2 mx-2'>Delete User</button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat dashboard-card ">
                <CardBody>
                  <div className="d-flex flex-row">
                    <div className="d-flex gap-2 flex-row align-items-center">
                      <div className='dashboard_card_image_box'> <img src={BroadcastIconA} alt="" className='dashboard_card_image' /></div>


                      <h5 className="card-text dashboard-card-heading-text  ">
                        Broadcast
                      </h5>
                    </div>
                  </div>
                  <div>
                    <h3 className='mt-2'>
                      <Link to={""}
                        className="card-no">
                        5
                      </Link>
                    </h3>

                    <div className='card-text1'>
                      Total Broadcast Message
                    </div>
                  </div>

                  <div className='d-flex align-item-center justify-content-between mt-2'>
                    <Link to={"/broadcast"}>
                      <button className='dashboard-card-view-btn'>View</button></Link>
                    <button className='dashboard-card-view-btn2 mx-2'>Create Broadcast</button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat dashboard-card ">
                <CardBody>
                  <div className="d-flex flex-row">

                    <div className="d-flex gap-2 flex-row align-items-center">
                      <div className='dashboard_card_image_box'>
                        <img src={servicesIcon4} alt="" className='dashboard_card_image' />
                      </div>

                      <h5 className="card-text dashboard-card-heading-text  ">
                        Subscribed
                      </h5>
                    </div>
                  </div>

                  <div>
                    <h3 className='mt-2'>
                      <Link to={"/"}
                        className="card-no">
                        0
                      </Link>
                    </h3>

                    <div className='card-text1'>
                      Subscribe to the alert
                    </div>
                  </div>
                  <div className='d-flex align-item-center justify-content-between mt-2'>
                    <button className='dashboard-card-view-btn'>View</button>
                    <button className='dashboard-card-view-btn2 mx-2'>Create Broadcast</button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>

            {/* <Col xl={9}>
              <Card className='activity-card'>
                <CardBody>
                  <div className="activity-logo-div ">
                    <div className='dashboard_card_image_box'>
                      <img src={userListIcon} className='dashboard_card_image_seconds' />
                    </div>

                    <h4 className="dashboard-card-heading-text m-0 px-2">Users List </h4>
                  </div>

                  <div className="table-responsive">

                    <table className="table dashboard_table_user">
                      <thead>
                        <tr>
                          <th>Phone No</th>
                          <th>Device Type</th>
                          <th>Created At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>

                        {users.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <div className="d-flex flex-column align-items-center justify-content-center py-4">
                                <img src={notFountImg} alt="No Data" style={{ maxWidth: "150px" }} />
                                <h4 className="mt-3 no-data-found-text">No Users Found!</h4>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          users.map((user, index) => (
                            <tr key={index}>
                              <td>{user.id}</td>
                              <td>{user.type || "not found"}</td>
                              <td>{user.created}</td>
                              <td>
                                <button
                                  className="delete-btn"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col> */}

            <Col xl={9}>
              <Card className="activity-card">
                <CardBody>
                  <div className="activity-logo-div ">
                    <div className="dashboard_card_image_box">
                      <img
                        src={userListIcon}
                        className="dashboard_card_image_seconds"
                        alt="users"
                      />
                    </div>
                    <h4 className="dashboard-card-heading-text m-0 px-2">
                      Users List
                    </h4>
                  </div>

                  <div className="table-responsive">
                    <table className="table dashboard_table_user">
                      <thead>
                        <tr>
                          <th>Phone No</th>
                          <th>Device Type</th>
                          <th>Created At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <div className="d-flex flex-column align-items-center justify-content-center py-4">
                                <img
                                  src="/images/noData.png"
                                  alt="No Data"
                                  style={{ maxWidth: "150px" }}
                                />
                                <h4 className="mt-3 no-data-found-text">
                                  No Users Found!
                                </h4>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          currentUsers.map((user, index) => (
                            <tr key={index}>
                              <td>{user.id}</td>
                              <td>{user.type || "not found"}</td>
                              <td>{user.created}</td>
                              <td>
                                <button
                                  className="delete-btn"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    {users.length > usersPerPage && (
                      <div className="d-flex justify-content-end align-items-center px-2 mt-2">
                        <span
                          className=""
                          style={{
                            paddingRight: '14px', cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            opacity: currentPage === 1 ? 0.4 : 1,
                          }}
                          onClick={() => goToPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ArrowBackIosIcon />

                        </span>

                        <div>
                          <strong>{currentPage}</strong> of {totalPages}
                        </div>

                        <span
                          className=""
                          onClick={() => goToPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          style={{
                            paddingLeft: '14px', cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                            opacity: currentPage === totalPages ? 0.4 : 1,
                          }}
                        >
                          <ArrowForwardIosIcon />

                        </span>
                      </div>
                    )}
                  </div>


                </CardBody>
              </Card>
            </Col>
            <Col xl={3} className='dashboard_progress_container'>
              <div className="progress-card">
                <div className="progress-card-header">
                  <div className='dashboard_card_image_box'>
                    <img src={userListIcon} className='dashboard_card_image_seconds' />
                  </div>
                  <h4 className='dashboard-card-heading-text m-0 px-2'>Application Download Status</h4>
                </div>

                <div className="progress-container">
                  <div className="progress-row">
                    <div className="progress-bar ios" style={{ width: "60%" }}>

                    </div>
                    <span className="progress-ext">60%</span>
                  </div>

                  <div className="progress-row">
                    <div className="progress-bar android" style={{ width: "80%" }}>

                    </div>
                    <span className="progress-ext">80%</span>
                  </div>
                </div>

                <div className="legend">
                  <div className="legend-item">
                    <span className="legend-color ios"></span> ios
                  </div>
                  <div className="legend-item">
                    <span className="legend-color android"></span> Android
                  </div>
                </div>
              </div>





              <Card className="feedback-card dashboard-card mt-4">
                <CardBody>
                  <div className="feedback-headericon">
                    <div className='dashboard_card_image_box'>
                      <img
                        src={reportIcon}
                        alt="Feedback Icon"
                        className="dashboard_card_image_seconds"
                      />
                    </div>
                    <h5 className="dashboard-card-heading-text m-0 px-2">Reports</h5>
                  </div>

                  <div className="feedback-item">
                    <span>Total Users </span>
                    <span className='no-feedback'>85</span>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div className="feedback-item">
                    <span >Current Users</span>
                    <span className='no-feedback'>63</span>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: '63%' }}></div>
                    </div>
                  </div>

                  <div className="feedback-item">
                    <span>Broadcast Messages</span>
                    <span className='no-feedback'>78</span>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  <div className="feedback-item">
                    <span >Deleted Users</span>
                    <span className='no-feedback'>94</span>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: '94%' }}></div>
                    </div>
                  </div>

                  <div className="download-report-wrapper">
                    <button className="feedback-download-btn"><SaveAltIcon style={{ marginRight: '4px' }} /> <span>Download Report</span> </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12}>
              <div className='dashboard-card rmchart-container '>
                <div className='d-flex align-items-center mb-3 '>
                  <div className='dashboard_card_image_box'>
                    <img src={MessageValuemIcon} alt="messagevalume" className='dashboard_card_image_second3' />
                  </div>

                  <h1 className='dashboard-card-heading-text  px-2 m-0'>Message Valume Trends</h1>
                </div>

                <RMLineChart />
              </div>

            </Col>
          </Row>

        </Container>
      </div>


    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any
};

// export default withTranslation()(Dashboard);
export default Dashboard;
