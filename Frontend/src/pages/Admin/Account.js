import React, { useState, useContext, useEffect, Fragment } from 'react';
import Table from '../../components/Admin/Table';
import { AuthContext } from '../../shared/context/auth-context';

import LoadingSpinner from '../../shared/components/LoadingSpinner';
import axios from 'axios';
import './Account.css';
function Account() {
  const auth = useContext(AuthContext);
  const [account, setAccount] = useState([]);

  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const customerTableHead = ['STT', 'UserName', 'email', 'Quyền', 'Phân quyền'];
  useEffect(() => {
    const fetchData = async () => {
      axios({
        method: 'get',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: '/v1/auth/user',
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((res) => {
          setAccount(res.data.users);
          setFlag(true);
        })
        .catch((err) => setError(err.message));
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const renderBody = (item, index) => (
    <tr key={item._id}>
      <td>{index + 1}</td>
      <td>{item.firstname + ' ' + item.lastname}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>

      {item.role === 'admin' ? (
        <td>
          <span
            className='delete-ticket'
            onClick={() => handleUpdate(item, 'user')}
          >
            Xóa Admin
          </span>
        </td>
      ) : (
        <td>
          <span className='update' onClick={() => handleUpdate(item, 'admin')}>
            Thêm Admin
          </span>
        </td>
      )}
    </tr>
  );
  // function
  function triggerLoading() {
    axios({
      method: 'get',
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: '/v1/auth/user',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        setAccount(res.data.users);
        setIsLoading(false);
        setFlag(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }
  const handleUpdate = (e, quyen) => {
    const confirmBox = window.confirm(
      'Bạn có chắc muốn thay đổi quyền của tài khoản này'
    );
    if (confirmBox) {
      setIsLoading(true);
      setFlag(false);
      axios({
        method: 'put',
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: `/v1/auth/user/${e._id}/role`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: {
          role: quyen,
        },
      })
        .then((res) => {
          triggerLoading();
          window.alert('Thay đổi thành công');
        })
        .catch((err) => setError(err.message));
    }
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}

      <div>
        {account.length > 0 && flag ? (
          <Table
            limit='8'
            headData={customerTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            renderBody={(item, index) => renderBody(item, index)}
            bodyData={account}
          />
        ) : null}
      </div>
    </Fragment>
  );
}

export default Account;
