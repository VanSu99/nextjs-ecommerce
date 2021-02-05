import Head from 'next/head';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import Link from 'next/link';

const Users = () => {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth } = state;
  //console.log(state);

  return (
    <div className="table-responsive">
      <Head>
        <title>Users</title>
      </Head>

      <table className="table w-100">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id} style={{ cursor: 'pointer' }}>
              <th>{index + 1}</th>
              <th>{user._id}</th>
              <th>
                <img
                  src={user.avatar}
                  alt="avatar"
                  style={{
                    width: '30px',
                    height: '30px',
                    objectFit: 'cover',
                    overflow: 'hidden',
                  }}
                />
              </th>
              <th>{user.name}</th>
              <th>{user.email}</th>
              <th>
                {user.role === 'admin' ? (
                  user.root ? (
                    <i className="fa fa-check text-success">Root</i>
                  ) : (
                    <i className="fa fa-check text-success"></i>
                  )
                ) : (
                  <i className="fa fa-times text-danger"></i>
                )}
              </th>
              <th>
                <Link href={auth.user.root && auth.user.email !== user.email ? `/edit_user/${user._id}` : '#!'}>
                  <a>
                    <i className="fa fa-edit text-info mr-2" title="Edit"></i>
                  </a>
                </Link>

                {auth.user.root && auth.user.email !== user.email ? (
                  <i
                    className="fa fa-trash text-danger ml-2"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    title="Remove"
                  />
                ) : (
                  <i className="fa fa-trash-alt text-danger ml-2" title="Remove" />
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
