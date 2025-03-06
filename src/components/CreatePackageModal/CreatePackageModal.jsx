import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreatePackageModal.css";

const API_URL = "http://127.0.0.1:5000/packages";

const CreatePackageModal = ({ isOpen, onClose, mode, initialData }) => {
  const [packageData, setPackageData] = useState({
    package_name: "",
    price: "",
    location: "",
    package_type: "Beach",
    activities: "",
    day_count: "",
    inclusions: "",
    exclusions: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setPackageData({
        package_name: initialData.package_name || "",
        price: initialData.price || "",
        location: initialData.location || "",
        package_type: initialData.package_type || "Beach",
        activities: initialData.activities || "",
        day_count: initialData.day_count || "",
        inclusions: initialData.inclusions || "",
        exclusions: initialData.exclusions || "",
      });
    }
  }, [mode, initialData]);

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages].slice(0, 3));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const agency_id = localStorage.getItem("agency_id");
    console.log("Retrieved agency ID:", agency_id);

    if (!agency_id) {
      alert("Error: Missing Agency ID. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("package_name", packageData.package_name);
    formData.append("price", packageData.price);
    formData.append("location", packageData.location);
    formData.append("package_type", packageData.package_type);
    formData.append("activities", packageData.activities || "None");
    formData.append("day_count", packageData.day_count);
    formData.append("inclusions", packageData.inclusions);
    formData.append("exclusions", packageData.exclusions);

    images.forEach((image, index) => {
      formData.append("photos", image);
      console.log(`adding image ${index + 1}:`, image.name);
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("Sending FormData:", formData);

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let response;
      if (mode === "edit" && initialData?.id) {
        response = await axios.put(
          `${API_URL}/update/${initialData.id}`,
          formData,
          config
        );
        console.log("Package updated successfully:", response.data);
      } else {
        response = await axios.post(API_URL, formData, config);
        console.log("Package created successfully:", response.data);
      }

      onClose();
    } catch (error) {
      console.error(
        "Error submitting package:",
        error.response?.data || error.message
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            {mode === "edit" ? "Edit Package" : "Bring Adventure to Life and"}
            <br />
            {mode === "edit" ? "" : "Life to Adventure here....."}
          </h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Package Name</label>
            <input
              type="text"
              value={packageData.package_name}
              onChange={(e) =>
                setPackageData({ ...packageData, package_name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={packageData.price}
              onChange={(e) =>
                setPackageData({ ...packageData, price: e.target.value })
              }
              required
            />
          </div>

          <div className="trip-info">
            <h3>Trip Information:</h3>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={packageData.location}
                onChange={(e) =>
                  setPackageData({ ...packageData, location: e.target.value })
                }
                required
              />
            </div>

            <div className="package-types">
              <label>Package:</label>
              <div className="radio-group">
                {["Beach", "Bush", "Weekend Getaways"].map((type) => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="packageType"
                      value={type}
                      checked={packageData.package_type === type}
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          package_type: e.target.value,
                        })
                      }
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Activities</label>
              <input
                type="text"
                value={packageData.activities}
                onChange={(e) =>
                  setPackageData({ ...packageData, activities: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Day Count</label>
              <input
                type="number"
                value={packageData.day_count}
                onChange={(e) =>
                  setPackageData({ ...packageData, day_count: e.target.value })
                }
              />
            </div>
          </div>

          <div className="image-upload-section">
            <label>Package Images:</label>
            <div className="image-upload-grid">
              {[0, 1, 2].map((index) => (
                <div key={index} className="image-upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id={`image-upload-${index}`}
                  />
                  <label htmlFor={`image-upload-${index}`}>
                    {images[index] ? images[index].name : "Upload Image"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Inclusions:</label>
            <textarea
              value={packageData.inclusions}
              onChange={(e) =>
                setPackageData({ ...packageData, inclusions: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Exclusions:</label>
            <textarea
              value={packageData.exclusions}
              onChange={(e) =>
                setPackageData({ ...packageData, exclusions: e.target.value })
              }
            />
          </div>

          <button type="submit" className="upload-package-btn">
            {mode === "edit" ? "UPDATE PACKAGE" : "UPLOAD PACKAGE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePackageModal;
