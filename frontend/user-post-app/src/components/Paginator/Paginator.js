import React from "react";

import "./Paginator.css";

const paginator = (props) => (
  <div className="paginator">
    {props.children}
    <div className="paginator_controls">
      {props.currentPage > 1 && (
        <button className="paginator_control" onClick={props.onPrevious}>
          Previous
        </button>
      )}
      {props.currentPage < props.lastPage && (
        <button className="paginator_control" onClick={props.onNext}>
          Next
        </button>
      )}
    </div>
  </div>
);

export default paginator;
