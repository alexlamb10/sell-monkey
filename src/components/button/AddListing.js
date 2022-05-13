import React from "react";
import "./addListing.scss";

function AddListing(props) {
  return (
    <button className="modal-btn" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default AddListing;
