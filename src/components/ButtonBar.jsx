import { useState } from "react";
import CreatePackageModal from "./CreatePackageModal/CreatePackageModal";

const ButtonBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-orange-500 py-4">
      <div className="max-w-7xl mx-auto px-4 flex gap-2">
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-950"
          onClick={() => setIsModalOpen(true)}
        >
          Create Package
        </button>
      </div>

      <CreatePackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </div>
  );
};

export default ButtonBar;
