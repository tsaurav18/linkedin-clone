import React from "react";
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widets__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>linked in News</h2>
        <InfoIcon />
      </div>
      {newsArticle("this is me ", "Top news  900 readers")}
      {newsArticle("checkout corona cases ", "Top news  900 readers")}
      {newsArticle("seoul is not safe ", "Top news  900 readers")}
      {newsArticle("america gots new corona cases ", "Top news  900 readers")}
      {newsArticle("india is incridable", "Top news  900 readers")}
    </div>
  );
}

export default Widgets;
