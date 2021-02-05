import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={`position-fixed w-100 h-100 text-center ${styles.loading}`} style={{background:'#0008', top: 0, left: 0, zIndex: 9}}>
      <img src="/loading.gif" alt="loading"/>
    </div>
  );
}
