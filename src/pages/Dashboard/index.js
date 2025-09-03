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
import { Link, useNavigate } from "react-router-dom";

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





const Dashboard = props => {
  const [menu, setMenu] = useState(false);
  // const [showAddMailForm, setShowAddMailForm] = useState(false);
  const [users, setUsers] = useState([]);


  const username = "+919370813281";
  const password = "uPi5/27LMFe0qDgrPbR6Z3dV";
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
  

  document.title = "Dashboard";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        



          <Row>
            <Col xl={5}>
              <card classname='quick-task-carts'>
                <CardBody>
                  <div className="quick-task-card">
                    <div className="quicktask-logo-div">
                      {/* <img
                        src={quicktaskimage}
                        alt="quicktasklogo"
                        className="rm-tracker-icon quicktask-logo"
                      /> */}
                      <PhoneAndroidIcon />
                      <h4 className="quick-task-title m-0 px-2">Devices</h4>
                    </div>

                    <div className="quick-task-buttons">
                      <PieChart />

                    </div>
                  </div>

                </CardBody>
              </card>
            </Col>

            <Col xl={7}>
              <Card className='activity-card'>
                <CardBody>
                  <div className="activity-logo-div ">

                    < GroupIcon />

                    <h4 className="Activities-title m-0 px-2">Users List </h4>
                  </div>

                  <div className="table-responsive">
{

}
                    <table className="table">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Phone No</th>
                          <th>Device Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.id}</td>
                            <td>{user.type || "not found"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
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
