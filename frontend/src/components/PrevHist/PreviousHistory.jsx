import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import TicketComponent from '../TicketPage/TicketComponent';
import styles from './prevhist.module.css';
import useKycStatus from "../../hooks/useKycStatus";
let url = 'https://bussp.azurewebsites.net'; url = url.replace(/\/undefined$/, "");

const TicketList = () => {
  useKycStatus();
  const history = useHistory();
  const [tickets, setTickets] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/api/ticket/?email=${email}`);
      setTickets(response.data.tickets);
      console.log(`Tickes: ${JSON.stringify(response.data)}`);
    };
    fetchData();
  }, [email]);

  return (
    <section className={styles.cont}>
      <button className={styles.go_back} onClick={(e) => {
        e.preventDefault();
        history.push("/routes");
      }}>Go Back</button>
      <div className={styles.ticketList}>

        {tickets.map((ticket) => (
          <TicketComponent
            key={ticket._id}
            from={ticket.start}
            to={ticket.destination}
            names={ticket.namesData}
            arr={ticket.reservedSeats}
            tokenData={ticket.selectedBusId}
            dat={ticket.date}
          />

        ))
        }
      </div >
    </section>
  );
};

export default TicketList;
