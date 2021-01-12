import React from "react";
import "./HeaderOption.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { Link } from "react-router-dom";
function HeaderOption({ avatar, Icon, title, onClick, tolink }) {
  const user = useSelector(selectUser);
  return (
    <Link to={tolink} className="to__link">
      <div onClick={onClick} className="headerOption">
        {Icon && <Icon className="headerOption__icon" />}
        {avatar && (
          <Avatar className="headerOption__icon" src={user?.photoUrl}>
            {user?.email[0]}
          </Avatar>
        )}

        <h3 className="headerOption__title">{title}</h3>
      </div>
    </Link>
  );
}

export default HeaderOption;
