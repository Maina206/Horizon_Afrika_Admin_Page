import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaUser, FaLock } from "react-icons/fa";
import { loginClient } from "../AuthService";
import { AuthContext } from "../../context/AuthContext";
import "./agencylogin.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // resetting state when modal is reopened
  useEffect(() => {
    if (isOpen) {
      setLoginData({ email: "", password: "" });
      setError("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginClient(loginData.email, loginData.password);
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.agency));
      login();
      navigate("/");
      onClose();
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <h2 className="modal-title">HorizonAfrika</h2>
        <p className="modal-subtitle">Good to see you again</p>
        <h3 className="modal-role">Agent</h3>
        <hr className="modal-underline" />

        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label>Email address</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="e.g. elon@tesla.com"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="e.g. ILoveMoringa@123"
                value={loginData.password}
                onChange={handleChange}
                required
              />
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
  );
};

// Prop Validation
LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
