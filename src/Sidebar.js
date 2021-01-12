import React from "react";
import { Avatar } from "@material-ui/core";
import "./Sidebar.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
function Sidebar() {
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar_hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?cs=srgb&dl=pexels-pixabay-207962.jpg&fm=jpg"
          alt=""
        />
        <Avatar src={user.photoUrl} className="sidebar__avatar">
          {user.email[0]}
        </Avatar>{" "}
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>who viwed you </p>
          <p className="sidebar__statNumber">2,455</p>
        </div>
        <div className="sidebar__stat">
          <p>who viwed post </p>
          <p className="sidebar__statNumber">2,455</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>recent</p>
        {recentItem("react")}
        {recentItem("programming")}
        {recentItem("softwareengineering")}
        {recentItem("degine")}
        {recentItem("developer")}
      </div>
    </div>
  );
}

export default Sidebar;
