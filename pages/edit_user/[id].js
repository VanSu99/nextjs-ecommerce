import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../store/GlobalState';
import { useRouter } from 'next/router';
import { userApis } from '../../services';
import { updateItem } from '../../store/actions';

const EditUser = () => {
  const router = useRouter();
  const idParam = router.query.id;

  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  const [editUser, setEditUser] = useState([]);
  const [checkAdmin, setCheckAdmin] = useState(false);

  const handleCheck = () => {
    setCheckAdmin(!checkAdmin);
  };

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === idParam) {
        setEditUser(user);
        setCheckAdmin(user.role === 'admin' ? true : false);
      }
    });
  }, [idParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let role = checkAdmin ? 'admin' : 'user';
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    await userApis.updateRole(idParam, { role }, auth.token).then((res) => {
      if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } });

      dispatch(updateItem(users, editUser._id, {...editUser, role}, 'ADD_USERS'))

      return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
    });
  };

  return (
    <div className="my-5">
      <Head>
        <title>Edit User</title>
      </Head>

      <div className="edit_user">
        <h2 className="text-uppercase text-secondary">Edit User</h2>

        <div className="mt-3">
          <div className="form-group">
            <label htmlFor="name">Họ tên: </label>
            <input type="text" id="name" defaultValue={editUser.name} className="form-control" disabled />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" defaultValue={editUser.email} className="form-control" disabled />
          </div>
          <div className="form-group">
            <input type="checkbox" id="isAdmin" checked={checkAdmin} onChange={handleCheck} />
            <label htmlFor="isAdmin" style={{ marginLeft: '8px' }}>
              isAdmin
            </label>
          </div>

          <button className="btn btn-dark" onClick={() => router.back()}>
            <i className="fa fa-long-arrow-left" /> Trở về
          </button>
          <button className="btn btn-primary ml-3" onClick={handleSubmit}>
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
