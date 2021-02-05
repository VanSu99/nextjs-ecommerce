import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { valid } from "../utils";
import { userApis } from "../services";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cf_password: "",
  });

  const { name, email, password, cf_password } = userData;
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();
  const { auth } = state;

  const handleChangeData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await userApis.register(userData);
    if (res.err) {
      return dispatch({ type: "NOTIFY", payload: { error: res.data.err } });
    } else {
      return dispatch({ type: "NOTIFY", payload: { success: res.data.msg } });
    }
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  return (
    <div className="register mt-4">
      <div className="container">
        <Head>
          <title>Trang Đăng ký</title>
        </Head>

        <form className="mx-auto" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              value={name}
              name="name"
              onChange={handleChangeData}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              placeholder="Enter email"
              name="email"
              onChange={handleChangeData}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              name="password"
              placeholder="Password"
              onChange={handleChangeData}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              value={cf_password}
              name="cf_password"
              placeholder="Password"
              onChange={handleChangeData}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Đăng ký
          </button>
          <p className="mt-3">
            Bạn đã có tài khoản?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
