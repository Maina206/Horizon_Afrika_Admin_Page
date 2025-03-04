import React, { useState, useEffect } from "react";
import "./CreatePackageModal.css";

const CreatePackageModal = ({ isOpen, onClose, mode, initialData }) => {
  const [packageData, setPackageData] = useState({
    packageName: "",
    price: "",
    location: "",
    packageType: "Beach",
    activities: "",
    dayCount: "",
    inclusions: "",
    exclusions: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setPackageData({
        packageName: initialData.packageName || "",
        price: initialData.price || "",
        location: initialData.location || "",
        packageType: initialData.packageType || "Beach",
        activities: initialData.activities || "",
        dayCount: initialData.dayCount || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission based on mode
    if (mode === "edit") {
      console.log("Updating package:", packageData, images);
    } else {
      console.log("Creating new package:", packageData, images);
    }
    onClose();
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
              value={packageData.packageName}
              onChange={(e) =>
                setPackageData({ ...packageData, packageName: e.target.value })
              }
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
              />
            </div>

            <div className="package-types">
              <label>Package:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="packageType"
                    value="Beach"
                    checked={packageData.packageType === "Beach"}
                    onChange={(e) =>
                      setPackageData({
                        ...packageData,
                        packageType: e.target.value,
                      })
                    }
                  />
                  Beach
                </label>
                <label>
                  <input
                    type="radio"
                    name="packageType"
                    value="Bush"
                    checked={packageData.packageType === "Bush"}
                    onChange={(e) =>
                      setPackageData({
                        ...packageData,
                        packageType: e.target.value,
                      })
                    }
                  />
                  Bush
                </label>
                <label>
                  <input
                    type="radio"
                    name="packageType"
                    value="Weekend Getaways"
                    checked={packageData.packageType === "Weekend Getaways"}
                    onChange={(e) =>
                      setPackageData({
                        ...packageData,
                        packageType: e.target.value,
                      })
                    }
                  />
                  Weekend Getaways
                </label>
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
                value={packageData.dayCount}
                onChange={(e) =>
                  setPackageData({ ...packageData, dayCount: e.target.value })
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
