import React from "react";

export default function Toast({ msg, handleShow, bgColor }) {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", zIndex: 9, minWidth: "280px" }}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className="mr-auto text-light">{msg.title}</strong>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          onClick={handleShow}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">{msg.msg}</div>
    </div>
  );
}
