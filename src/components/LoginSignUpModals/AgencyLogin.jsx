import React from "react";
import { FaTimes, FaUser, FaLock } from "react-icons/fa";
import "./agencylogin.css";

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="login-class">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            <FaTimes size={20} />
          </button>
          <h2 className="modal-title">HorizonAfrika</h2>
          <p className="modal-subtitle">Good to see you again</p>
          <h3 className="modal-role">Agent</h3>
          <hr className="modal-underline" />

          <form>
            <div className="input-group">
              <label>Email address</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input type="email" placeholder="e.g. elon@tesla.com" />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input type="password" placeholder="e.g. ILoveMoringa@123" />
              </div>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>

          <p className="signup-text">
            Don't have an account? <a href="#">Contact Us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
