import React, { useState } from "react";
import PropTypes from "prop-types";
import CreatePackageModal from "./CreatePackageModal/CreatePackageModal";

const PackageCard = ({
  title,
  price,
  image,
  location,
  booked,
  viewed,
  packageData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");

  const handleEditClick = () => {
    setModalMode("edit");
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md mb-4">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </div>
        <div className="md:w-2/3 p-4">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-orange-500">{title}</h2>
            <div className="text-right">
              <p className="text-sm text-gray-600">Prices </p>
              <p className="text-orange-500 font-bold">{price}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Detail and Includes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Hotel</p>
                <p className="text-gray-600">Location: {location}</p>
              </div>
              <div className="text-right">
                <ul className="space-y-2">
                  <li>
                    <a
                      href={`/bookings?packageId=${packageData?.id}`}
                      className="hover:scale-105 transition-transform"
                    >
                      Booked: {booked}
                    </a>
                  </li>
                </ul>
                <p className="text-gray-600">Viewed: {viewed}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              onClick={handleEditClick}
            >
              Edit Package
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Delete Package
            </button>
          </div>
        </div>
      </div>

      <CreatePackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={modalMode === "edit" ? packageData : undefined}
      />
    </div>
  );
};

PackageCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  booked: PropTypes.string.isRequired,
  viewed: PropTypes.string.isRequired,
  packageData: PropTypes.object,
};

export default PackageCard;
