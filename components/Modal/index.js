import React, { useCallback, useContext, useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { DataContext } from "../../store/GlobalState";
import { deleteProduct } from "../../store/actions";

export default function Modal({ isOpen, setIsOpen }) {
  const { state, dispatch } = useContext(DataContext);
  const { modal } = state;
  const modalRef = useRef();

  const handleSubmit = () => {
    dispatch(deleteProduct(modal?.data, modal?._id, "ADD_CART"));
    dispatch({ type: "ADD_MODAL", payload: {} });
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setIsOpen(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [setIsOpen, isOpen]
  );

  const __renderContent = () => {
    return (
      <div className={styles.mu__modal_contentData}>
        <div className={styles.mu__modal_contentDataTitle}>
          <h3>{modal?.title}</h3>
        </div>
        <div className={styles.mu__modal__contentDataDesc}>
          <p>Bạn có chắc xóa item này?</p>
        </div>
        <div className={styles.mu__modal__contentDataBtn}>
          <button className={styles.mu__modal__cancelBtn} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles.mu__modal__removeBtn}
            onClick={handleSubmit}
          >
            Xóa
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    if (isOpen) {
      document.querySelector("body").classList.add(styles.mu__modal_open);
    } else {
      document.querySelector("body").classList.remove(styles.mu__modal_open);
    }
  }, [isOpen]);

  useEffect(() => {
    const showModalKm = () => {
      setIsOpen(true);
    };

    showModalKm();
  }, []);

  return (
    <>
      {isOpen ? (
        <div
          className={`${styles.mu__modal} ${styles.show}`}
          ref={modalRef}
          onClick={closeModal}
        >
          <div className={styles.mu__modal_overlay}></div>
          <div className={styles.mu__modal_container}>
            {modal?._id ? (
              __renderContent()
            ) : (
              <div className={styles.mu__modal_content}>
                <img
                  src="https://cf.shopee.vn/file/add9e97d6ccf9213f7f8d75eb3a80039_xxhdpi"
                  alt=""
                />
                <div className={styles.mu__modal_closeBtn}>
                  <button onClick={() => setIsOpen((prev) => !prev)}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : undefined}
    </>
  );
}
