import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketComponent from './TicketComponent';
import styles from './prevhist.module.css';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/api/ticket/?email=${email}`);
      setTickets(response.data);
    };
    fetchData();
  }, [email]);

  return (
    <div className={styles.ticketList}>
      {tickets.map((ticket) => (
        <div key={ticket.id} className={styles.ticketWrapper}>
          <TicketComponent
            from={ticket.start}
            to={ticket.destination}
            names={ticket.namesData}
            arr={ticket.reservedSeats}
            tokenData={ticket.selectedBusId}
            dat={ticket.date}
          />
        </div>
      ))}
    </div>
  );
};

export default TicketList;
