import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/login.module.css";
import { userApis } from "../services";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  const handleChangeData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await userApis.login(userData);

    if (res.data.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.data.err } });

    dispatch({ type: "NOTIFY", payload: { success: res.data.msg } });

    dispatch({
      type: "AUTH",
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    Cookie.set("refreshtoken", res.data.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <div className={styles.signup}>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <form className={styles.signup_form} onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="email" className={styles.form_label}>
            Tên tài khoản
          </label>
          <input
            type="text"
            className={styles.form_input}
            id="email"
            name="email"
            value={email}
            onChange={handleChangeData}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="password" className={styles.form_label}>
            Mật khẩu
          </label>
          <input
            type="password"
            className={styles.form_input}
            id="password"
            name="password"
            value={password}
            onChange={handleChangeData}
          />
        </div>
        <button type="submit" className={styles.form_submit}>
          Đăng nhập
        </button>
      </form>
      <p className={styles.signup_already}>
        Bạn chưa có tài khoản ?{" "}
        <Link href="/register">
          <a className={styles.signup_already_link}>Đăng ký</a>
        </Link>
      </p>
    </div>
  );
}
