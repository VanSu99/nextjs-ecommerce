import axiosClient from './axiosClient';

const userApis = {
  getMe: () => {
    return axiosClient.post('/api/auth/accessToken');
  },
  login: (user) => {
    return axiosClient.post('/api/auth/login', user);
  },
  register: (user) => {
    return axiosClient.post('/api/auth/register', user);
  },
  resetPassword: ({ password }, token) => {
    return axiosClient.patch(
      '/api/user/resetPassword',
      { password },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },
  uploadInfo: ({ name, avatar }, token) => {
    return axiosClient.patch(
      '/api/user',
      { name, avatar },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },
  getUsers: (token) => {
    return axiosClient.get('/api/user', {
      headers: {
        Authorization: token,
      },
    });
  },
  updateRole: (userId, { role }, token) => {
    return axiosClient.patch(
      `/api/user/${userId}`,
      { role },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },
};

export default userApis;
