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
// import { FaUser } from "react-icons/fa";




// Custom Scrollbar
import SimpleBar from "simplebar-react";


import GroupIcon from '@mui/icons-material/Group';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';






// import user2 from "../../assets/images/users/user-2.jpg";


// Charts

import RMLineChart from 'pages/AllCharts/chartjs/RMLineChart';


//i18n
import { withTranslation } from "react-i18next";
import PieChart from 'pages/AllCharts/chartjs/piechart';
import { toast } from 'react-toastify';





const Dashboard = props => {
  const [menu, setMenu] = useState(false);
  // const [showAddMailForm, setShowAddMailForm] = useState(false);
  const [users, setUsers] = useState([]);


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

    fetchUsers();
  }, []);




  const handleDeleteUser = async (number) => {
    try {
      const deleteuser = await fetch(`http://192.168.2.179:8080/v1/accounts/deleteaccount/${number}`,
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
                    <div className="d-flex gap-2 flex-row ">
                      <div className='dashboard_card_image_box'><img src={AlertIcon} alt="" className='dashboard_card_image' /></div>

                      <h5 className="card-text">
                        Alerts
                      </h5>
                    </div>
                  </div>

                  <div style={{ cursor: 'pointer' }}>

                    <h3 className='mt-2'>
                      <Link to={""}
                        className="card-no">
                        10
                      </Link>
                    </h3>
                    <div className='card-text1'>
                      Alerts of all categories
                    </div>
                  </div>

                  <div className='d-flex align-item-center justify-content-between mt-1'>
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
                    <div className="d-flex gap-2 flex-row">
                      <div className='dashboard_card_image_box'>  <img src={userListIcon} alt="" className='dashboard_card_image' /></div>

                      <h5 className="card-text">
                        All Users
                      </h5>
                    </div>
                  </div>
                  <div></div>

                  <div>
                    <h3 className='mt-2'>
                      <Link to={""}
                        className="card-no mt-2">
                        10
                      </Link>
                    </h3>


                    <div className='card-text1'>
                      Total Active Users Count
                    </div>

                  </div>


                  <div className='d-flex align-item-center justify-content-between mt-1'>
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
                    <div className="d-flex gap-2 flex-row">
                      <div className='dashboard_card_image_box'> <img src={BroadcastIconA} alt="" className='dashboard_card_image' /></div>


                      <h5 className="card-text">
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

                  <div className='d-flex align-item-center justify-content-between mt-1'>
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

                    <div className="d-flex gap-2 flex-row">
                      <div className='dashboard_card_image_box'>
                        <img src={servicesIcon4} alt="" className='dashboard_card_image' />
                      </div>

                      <h5 className="card-text">
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
                  <div className='d-flex align-item-center justify-content-between mt-1'>
                    <button className='dashboard-card-view-btn'>View</button>
                    <button className='dashboard-card-view-btn2 mx-2'>Create Broadcast</button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
          
            <Col xl={9}>
              <Card className='activity-card'>
                <CardBody>
                  <div className="activity-logo-div ">
                    <div className='dashboard_card_image_box'>
                      <img src={userListIcon} className='dashboard_card_image_seconds' />
                    </div>

                    <h4 className="dashboard-card-heading-text m-0 px-2">Users List </h4>
                  </div>

                  <div className="table-responsive">
                    {

                    }
                    <table className="table">
                      <thead>
                        <tr>

                          <th>Phone No</th>
                          <th>Device Type</th>
                          <th>Created At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index}>

                            <td>{user.id}</td>
                            <td>{user.type || "not found"}</td>
                            <td>{user.created}</td>
                            <td><button className='delete-btn' onClick={() => handleDeleteUser(user.id)}>Delete</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3}>
              <div className="progress-card">
                <div className="progress-card-header">
                  {/* <FaUser className="progress-card-icon" /> */}
                  <span className='dashboard-card-heading-text m-0 px-2'>Application Download Status</span>
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




              {/* <Col xl={4}> */}
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

            {/* </Col> */}
          </Row>
          <Row>
            <Col xl={12}>
              <div className='dashboard-card rmchart-container '>
                <h1 className='dashboard-card-heading-text mb-3 px-2'>Message Valume Trends</h1>
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
