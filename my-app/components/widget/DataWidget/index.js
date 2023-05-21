import React from "react";

const DataWidget = ({ heading, description, value, maxValue, unit, bar }) => {
  const valueStyle =
    value > maxValue * 0.66
      ? { color: "red" }
      : value > maxValue * 0.33
      ? { color: "orange" }
      : { color: "green" };
  let styleForGuage = {
    "--value": Math.round(value),
    "--maxValue": Math.round(maxValue),
  };

  return (
    <article className="cardMain">
      <div className="data-widget m-ring-2 card">
        <div className="temporary_text">
          <center>
            {heading}:
            <div style={valueStyle}>
              {value} {unit}
            </div>{" "}
          </center>
        </div>
        <div className="card_content">
          <span className="card_title"></span>
          <span className="card_subtitle">{description} </span>
        </div>
      </div>
      <center>
        <div
          className="p bg-primary text-primary-content border-4 border-primary"
          id="<%= key %>guage"
          style={styleForGuage}
        ></div>
      </center>
    </article>
  );
};

export default DataWidget;
