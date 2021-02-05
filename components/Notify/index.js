import React, { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import Toast from "../Toast";
import Loading from "../Loading";

export default function Notify() {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "Error" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-danger"
        />
      )}
      {notify.success && (
        <Toast
          msg={{ msg: notify.success, title: "Success" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-success"
        />
      )}
    </>
  );
}
