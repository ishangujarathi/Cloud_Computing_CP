import React from 'react'
import useKycStatus from "../../hooks/useKycStatus";
import "./TicketPage.css";

const TicketComponent = (props) => {
  useKycStatus();
  const { from, to, names, arr, tokenData, dat } = props
  return (
    <div className="tpMain">
      <article className="ticket">
        <header className="ticket__wrapper">
          <div className="ticket__header">1 🎟 PRISTINE TRAVELS</div>
        </header>
        <div className="ticket__divider">
          <div className="ticket__notch"></div>
          <div className="ticket__notch ticket__notch--right"></div>
        </div>
        <div className="ticket__body">
          <section className="ticket__section">
            <div>
              <p>From: {from}</p>
              <p>To: {to}</p>
            </div>
            {arr.map((element, idx) => (
              <div key={idx}>
                <p className="seatNo">{element}</p>
              </div>
            ))}
            <p>
              Your seats are together <span><p>On: {dat}, 10 AM (Hourly commute)</p></span>
            </p>
          </section>
          <section className="ticket__section">
            <h3>Passenger Names</h3>
            {names.map((name, idx) =>
              <div key={idx}>
                <p className="names">{name}</p>
              </div>
            )}
          </section>
          <section className="ticket__section">
            <h3>Payment Method</h3>
            <p>Credit Card</p>
          </section>
        </div>
        <footer className="ticket__footer">
          <p>Transaction-ID</p>
          <p className="idData">{tokenData}</p>;
        </footer>
      </article>
    </div>
  )
}

export default TicketComponent