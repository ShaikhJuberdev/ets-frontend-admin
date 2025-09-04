import PropTypes from 'prop-types';
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import NonAuthLayout from "./components/NonAuthLayout";

// Import scssnpm  
import "./assets/scss/theme.scss";
import "./assets/scss/custom.css"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route>
          {authRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <NonAuthLayout>
                  {route.component}
                </NonAuthLayout>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Route>

        <Route>
          {userRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  {route.component}
                </Authmiddleware>}
              key={idx}
              exact={true}
            />
          ))}
        </Route>
      </Routes>
       <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 999999 }}/>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
