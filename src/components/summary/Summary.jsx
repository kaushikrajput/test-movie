import React, { useState } from "react";
import "./summary.css";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const Summary = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { state } = useLocation();
 

  const handleSubmit = (event) => {
    if (!name) {
      return setError(true);
    }
    if (!email) {
      return setError(true);
    }
    setError("");
    setName("");
    setEmail("");
    setShow(false);
    event.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  
  };
  return (
    <div className="summary-section">
      <div className="container">
        <div className="movie-details">
          <div className="details-section">
            <img src={state.image} alt="" />
            <div className="summary-text">
              <h2>Movie Summary</h2>
              <p>{state.summary.replace(/<\/?[bp]>/g,"")}</p>
            </div>
          </div>
          <button onClick={handleShow} className="button-style">
            book ticket
          </button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <div className="ticket-boking">
              <h2>{state.name}</h2>
              <p>Language - {state.language}</p>
              <p>Rating - {state.rating}</p>
            </div>
            <div className="form-style">
              <form>
                <input
                  value={name}
                  type="text"
                  placeholder="Full name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {error && name?.length <= 0 ? (
                  <p className="error-style">Please fill out this field.</p>
                ) : (
                  ""
                )}
                <input
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && email?.length <= 0 ? (
                  <p className="error-style">Please fill out this field.</p>
                ) : (
                  ""
                )}
              </form>
            </div>
            <button onClick={handleSubmit} className="button-style">
              book
            </button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Summary;
