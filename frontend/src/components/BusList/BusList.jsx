import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaAngleDoubleDown } from "react-icons/fa";
import "./busList.css";
import useKycStatus from "../../hooks/useKycStatus";

export default function BusList({ value: dataInp }) {
  useKycStatus();
  const [obj, setObj] = useState("");
  const [reset, Setreset] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [clas, SetClas] = useState(true);


  useEffect(() => {
    setObj(dataInp);

  }, [dataInp]);

  const handleSubmit = (bId) => {
    localStorage.setItem("selectedBusId", bId);
    SetClas(false);
    setArrowDown(true);
    toast.success("Bus Selected Successfully");
  };

  const handleReset = (e) => {
    if (clas === false) {
      Setreset(true);
      SetClas(true);
      setArrowDown(false);
    }
    localStorage.removeItem("selectedBusId");
    toast.success("Bus Selection Reset Successfully");
  };

  const renderFunction = () => {
    return dataInp.map((bus, idx) => {
      // let bId = bus._id
      return (
        <div key={idx} className="card mt-5 buslist">
          <div className="row ml-3" style={{ marginLeft: 0 }}>
            <div className="col-6 col-sm-3 mt-2 font-weight-bold ">Brand</div>
            <div className="col-6 col-sm-3 mt-2 font-weight-bold ">From</div>
            <div className="col-6 col-sm-3 mt-2 font-weight-bold ">To</div>
            <div className="col-6 col-sm-3 mt-2 font-weight-bold ">Price</div>

            <div className="w-100 d-none d-md-block"></div>

            {console.log(bus.seatArray)}
            <div className="col-6 col-sm-3 mb-4">{bus.companyName}</div>
            <div className="col-6 col-sm-3 mb-4">{bus.startCity}</div>
            <div className="col-6 col-sm-3 mb-4">{bus.destination}</div>
            <div className="col-6 col-sm-3 mb-4">{bus.pricePerSeat}</div>
            <div className="col-6 col-sm-4 mb-2 ml-0">
              <button
                className={
                  clas
                    ? "btn btn-primary btn-md"
                    : "btn btn-primary btn-md disabled"
                }
                onClick={(bId) => {
                  handleSubmit(bus._id);
                }}
              >
                Book Now
              </button>
            </div>
            <div className="col-6 col-sm-4 mb-2 ml-0">
              <span
                className={reset ? "badge badge-danger ml-5" : "disabled"}
                onClick={(e) => handleReset(e)}
              >
                Reset
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="">
      {renderFunction()}
      <div className={arrowDown ? "activeArrow" : "nonActive"}>
        <FaAngleDoubleDown />
      </div>
    </div>
  );
}
