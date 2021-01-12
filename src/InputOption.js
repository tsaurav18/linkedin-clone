import React from "react";
import "./InputOption.css";
function InputOption({ id, Icon, title, color, onclick }) {
  return (
    <div onClick={onclick} className="inputOption">
     {/* <span className="likes__count">{likesCount}</span>&nbsp; */}
      <Icon id={id} style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
}

export default InputOption;
