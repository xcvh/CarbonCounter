import React from "react";

const Stat = ({ tons, percentage }) => {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">
          CO<subscript>2</subscript> emissions
        </div>
        <div className="stat-value">{tons} tons</div>

        <div className="stat-desc">
          {Math.abs(percentage)}% {percentage < 0 ? "less" : "more"} than
          average
        </div>
      </div>
    </div>
  );
};

export default Stat;
