import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import { useDispatch } from "react-redux";

import HeaderOption from "./HeaderOption";
import { logout } from "./features/userSlice";
import { auth } from "./Firebase";

import HeaderOptionLogged from "./HeaderOptionLogged";
function Header() {
  const dispatch = useDispatch();
  const logoutApp = () => {
    dispatch(logout());

    auth.signOut();
  };

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="http://t0.gstatic.com/images?q=tbn:ANd9GcRMCA3j2A8hfLl9p5UAU5nd9lvqLlNZvqoU4xOsZ192uH4IYS6X"
          alt="linkedin-logo"
        />
        <div className="header__search">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption Icon={HomeIcon} title="Home" tolink="/" />
        <HeaderOption
          Icon={SupervisorAccount}
          tolink="network"
          title="My Network"
        />
        <HeaderOption Icon={BusinessCenterIcon} tolink="jobs" title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messaging" tolink="messaging" />
        <HeaderOption
          Icon={NotificationsIcon}
          title="Notifications"
          tolink="notifications"
        />
        <HeaderOptionLogged
          avatar={true}
          title={"Sign Out"}
          onClick={logoutApp}
        />
      </div>
    </div>
  );
}

export default Header;
