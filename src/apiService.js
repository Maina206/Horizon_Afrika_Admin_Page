const API_BASE_URL = "http://127.0.0.1:5000";

// Function to create a package
export const createPackage = async (packageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/packages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(packageData),
    });
    if (!response.ok) {
      throw new Error("Failed to create package");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
};

// Function to edit a package
export const editPackage = async (packageId, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/packages/${packageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Failed to edit package");
    }
    return await response.json();
  } catch (error) {
    console.error("Error editing package:", error);
    throw error;
  }
};

// Function to delete a package
export const deletePackage = async (packageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/packages/${packageId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete package");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
};

// Function to fetch bookings data
export const getBookings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    const data = await response.json();
    return data.map((booking) => ({
      name: booking.user.name,
      packageName: booking.package.name,
      location: booking.location,
      email: booking.user.email,
      amountPaid: booking.amountPaid,
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
