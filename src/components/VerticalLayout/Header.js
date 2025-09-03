


import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes, { func } from "prop-types";
import { connect } from "react-redux";
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";

import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logosmImg from "../../assets/images/SVG/ETS_logo.png";
import logosmimg from "../../assets/images/SVG/symbol.svg";
import LogoutIcon from '@mui/icons-material/Logout';
import { withTranslation } from "react-i18next";

const Header = props => {
  const location = useLocation();
  const navigate = useNavigate()
  const [pageTitle, setPageTitle] = useState("Admin Dashboard");

    useEffect(() => {
    // You can expand this logic for more routes
    if (location.pathname.includes("/alertlist")) {
      setPageTitle("Alert List");
    } else if (location.pathname.includes("/creategroup")) {
      setPageTitle("Group Management");
    } else if (location.pathname.includes("/group-management")) {
      setPageTitle("Group Management");
    } else if (location.pathname.includes("/addmailform")) {
      setPageTitle("Service Account");
    } else if (location.pathname.includes("/sendmessage")) {
      setPageTitle("Trigger Message From Service Account");
    } else if (location.pathname.includes("/groupmessage")) {
      setPageTitle("Group Management");
    } else if (location.pathname.includes("/rmmanagement")) {
      setPageTitle("RM Management");
    } else if (location.pathname.includes("/totalcustomer")) {
      setPageTitle("Customer Management");
    } else if (location.pathname.includes("/hncustomer")) {
      setPageTitle("Customer Management");
    } else if (location.pathname.includes("/geolocation")) {
      setPageTitle("Geolocation Identifier");
    } else if (location.pathname === "/") {
      setPageTitle("Admin Dashboard");
    } else {
      setPageTitle("Admin Dashboard");
    }

  }, [location.pathname]);

  function tToggle() {
    const body = document.body;
    if (window.innerWidth <= 992) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  const handleLogout = () => {
     navigate('/login');
    sessionStorage.clear()
  }
  return (
    <React.Fragment>
      <header id="page-topbar" className="">
        <div className="navbar-header primary-header">
          <div className="d-flex">
            <div className="navbar-brand-box primary-black">
              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logosmimg} alt="" height="20" />
                </span>
                <span className="logo-lg">
                  <img src={logosmImg} alt="" height="40" />
                </span>
              </Link>
            </div>
           
            {/* <h1 className="header-name">{pageTitle}</h1> */}
            <div className="d-flex align-items-center">
   <h1 className="header-name">ETS Management System</h1>
            </div>
          

          </div>

          <div className="d-flex">
            {/* <LanguageDropdown /> */}
            <NotificationDropdown />
            <ProfileMenu />



            <div
              // onClick={() => {
              //   props.showRightSidebarAction(!props.showRightSidebar);
              // }}
              className="dropdown d-inline-block"
            >

            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" style={{widows:'35px', height:"35px", borderRadius:'50px', marginRight:'12px'}}/>
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                < LogoutIcon className="mdi mdi-cog-outline" style={{color:"#fff"
                }} onClick={handleLogout}/>
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
