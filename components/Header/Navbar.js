import React, { useState, useContext } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import { DataContext } from "../../store/GlobalState";
import Cookie from "js-cookie";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } });
  };

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {auth.user.name}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link href="/profile">
            <a className="dropdown-item">Thông tin</a>
          </Link>
          {auth?.user?.role === "admin" && adminRouter()}
          <div className="dropdown-divider"></div>
          <button onClick={handleLogout} className="dropdown-item">
            Đăng xuất <i className="fa fa-sign-out" aria-hidden="true"></i>
          </button>
        </div>
      </li>
    );
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/users">
          <a className="dropdown-item">Users</a>
        </Link>
        <Link href="/create">
          <a className="dropdown-item">Products</a>
        </Link>
        <Link href="/categories">
          <a className="dropdown-item">Categories</a>
        </Link>
      </>
    );
  };

  return (
    <header className={styles.banner__top}>
      <nav className={styles.navbar}>
        <Link href="/">
          <a className={styles.navbar__brand}>
            <img src="/logo.png" alt="logo" />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul className={styles.menu__right}>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          {auth?.user ? (
            loggedRouter()
          ) : (
            <li className="nav-item">
              <Link href="/login">
                <a className={`nav-link ${styles.nav__btn_login}`}>Đăng nhập</a>
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link href="/cart">
              <a className={styles.nav__link_cart}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span className={styles.cart__count}>{cart.length}</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
