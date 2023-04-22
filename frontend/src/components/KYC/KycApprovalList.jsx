import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const url = process.env.URL; url = url.replace(/\/undefined$/, "");

const KycApprovalList = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // fetch the list of registered users from a server
    // and update the state with the list of users
    const fetchUsers = async () => {
      await axios
        .get(`${url}/api/login/users/kyc`)
        .then((res) => {
          setUsers(res.data?.result);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };
    fetchUsers();
  }, []);

  const handleUserClick = (email) => {
    history.push({
      pathname: "/kycApproval",
      state: { email: email },
    });
  };

  return (
    <div>
      <h1>KYC Approval List</h1>
      <ul>
        {users.map((user) => (
          <button style={{ fontSize: "medium" }} key={user.email} onClick={() => handleUserClick(user.email)}>
            Name Of User: {user.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default KycApprovalList;
