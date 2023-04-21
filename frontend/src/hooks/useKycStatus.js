import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const useKycStatus = () => {
  const history = useHistory();

  useEffect(() => {
    const kycStatus = localStorage.getItem("kycStatus");

    if (kycStatus !== "true") {
      history.push("/login");
    }
  }, [history]);

  return null;
};

export default useKycStatus;
