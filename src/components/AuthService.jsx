import axios from "axios";

const API_URL = "http://127.0.0.1:5000/login/agency";

const loginClient = async (email, password) => {
  try {
    const response = await axios.post(API_URL, {
      agency_email: email,
      agency_password: password,
    });

    if (response.data.access_token) {
      localStorage.setItem("user", JSON.stringify(response.data.agency));
      localStorage.setItem("token", response.data.access_token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred during login";
  }
};

export { loginClient };
