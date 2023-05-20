import React from "react";

const DataWidget = ({ heading, description, value, maxValue, unit, bar }) => {
  console.log(value);
  return (
    <div className="data-widget">
      <h2>{heading}</h2>
      <p>{description}</p>
      {bar ? (
        <div className="bar-chart">
          <div
            className="bar"
            style={{
              width: `${(value / maxValue) * 100}%`,
            }}
          />
        </div>
      ) : (
        <div>
          Value: {value} / {maxValue} {unit}
        </div>
      )}
    </div>
  );
};

export default DataWidget;
