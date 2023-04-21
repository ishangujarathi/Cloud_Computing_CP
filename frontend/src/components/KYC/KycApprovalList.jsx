import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const KycApprovalList = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // fetch the list of registered users from a server
    // and update the state with the list of users
    axios.defaults.withCredentials = true;
    const fetchUsers = async () => {
      await axios
        .get(`https://localhost:8080/api/login/users`)
        .then((res) => {
          setUsers(res?.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };
    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    history.push({
      pathname: "/kycApproval",
      state: { userId: userId },
    });
  };

  return (
    <div>
      <h1>KYC Approval List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => handleUserClick(user.id)}>
              Username: {user.username}
              UserId: {user.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KycApprovalList;
