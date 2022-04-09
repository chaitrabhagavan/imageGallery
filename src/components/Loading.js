import React from "react";

function Loading(props) {
  return (
    <div className="loading">
      {props.loading ? <h2>Loading photos...</h2> : <span></span>}
    </div>
  );
}

export default Loading;
