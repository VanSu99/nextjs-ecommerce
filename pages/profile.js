import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { valid, ImageUpload } from "../utils";
import styles from "../styles/profile.module.css";
import { DataContext } from "../store/GlobalState";
import { userApis } from "../services";

export default function Profile() {
  const initialState = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialState);
  const { avatar, name, password, cf_password } = data;
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  if (!auth.user)
    return (
      <h2 className="text-center mt-4">Bạn chưa đăng nhập vào hệ thống.</h2>
    );

  useEffect(() => {
    setData({
      ...data,
      name: auth?.user?.name,
    });
  }, [auth?.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth?.user?.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }

    if (name !== auth?.user?.name || avatar) {
      updateInfo();
    }
  };

  const updatePassword = async () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const result = await userApis.resetPassword({ password }, auth?.token);
    console.log(result);
    if (result.status !== 200) {
      return dispatch({ type: "NOTIFY", payload: { error: result.data.msg } });
    } else {
      return dispatch({
        type: "NOTIFY",
        payload: { success: result.data.msg },
      });
    }
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Ảnh không tồn tại. Vui lòng chọn lại." },
      });
    }
    if (file.size > 1024 * 1024) {
      // size 1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Size của ảnh quá lớn. Vui lòng chọn lại." },
      });
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      // size 1mb
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Định dạng của ảnh không đúng. Vui lòng chọn lại." },
      });
    }

    setData({
      ...data,
      avatar: file,
    });
  };

  const updateInfo = async () => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (avatar) media = await ImageUpload([avatar]);
    const result = await userApis.uploadInfo(
      { name, avatar: avatar ? media[0].url : auth?.user?.avatar },
      auth?.token
    );

    if (result.status !== 200) {
      dispatch({ type: "NOTIFY", payload: { error: result.data?.err } });
    } else {
      dispatch({
        type: "AUTH",
        payload: {
          token: auth?.token,
          user: result?.data?.user,
        },
      });
      dispatch({ type: "NOTIFY", payload: { success: result.data?.msg } });
    }
  };

  return (
    <div className={styles.profile}>
      <Head>
        <title>Profile Page</title>
      </Head>

      <section className="container">
        <div className="row">
          <div className="col-md-4">
            <div className={styles.profile__info}>
              <div className={styles.profile__avatar}>
                <img
                  src={
                    avatar ? URL.createObjectURL(avatar) : auth?.user?.avatar
                  }
                  alt="avatar"
                />
                <span>
                  <i className="fa fa-camera" aria-hidden="true"></i>
                  <input
                    type="file"
                    name="file"
                    className={styles.file_up}
                    accept="image/*"
                    onChange={changeAvatar}
                  />
                </span>
              </div>
              <div className={styles.profile__infoDetail}>
                <div className="form-group">
                  <label htmlFor="name">Họ tên:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control form-control-sm"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control form-control-sm"
                    value={auth?.user?.email}
                    disabled={true}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">New password:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-sm"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cf_password">Confirm password:</label>
                  <input
                    type="password"
                    name="cf_password"
                    id="cf_password"
                    className="form-control form-control-sm"
                    value={cf_password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleUpdateProfile}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8 table-responsive">
            <h3 className="text-uppercase">Giỏ hàng của bạn</h3>
            <div className="my-3">
              <table
                className="table-bordered table-hover w-100"
                style={{ minWidth: "600px", cursor: "pointer" }}
              >
                <thead className="bg-light font-weight-bold">
                  <tr>
                    <td className="p-2">ID</td>
                    <td className="p-2">Tên sản phẩm</td>
                    <td className="p-2">Date</td>
                    <td className="p-2">Total</td>
                    <td className="p-2">Delivered</td>
                    <td className="p-2">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((item) => (
                    <tr key={item._id}>
                      <td className="p-2">{item._id}</td>
                      <td className="p-2">{item.cart[0].title}</td>
                      <td className="p-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2">${item.total}</td>
                      <td className="p-2">
                        {item.delivered ? "Đã giao hàng" : "Đang vận chuyển"}
                      </td>
                      <td className="p-2">
                        <Link href={`/order/${item._id}`}>
                          <a>Xem chi tiết</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
