import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [inquiries, setInquiries] = useState([]);
  const [admins, setAdmins] = useState([]); // State to hold the admins
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [listChange, setListChange] = useState(false); // Fixed to camelCase
  const [email, setEmail] = useState(""); // State to hold the email input

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/inquiries");
        setInquiries(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch inquiries. Please try again later.");
        setLoading(false);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/getAdmins");
        setAdmins(response.data.list || []); // Ensure admins is always set to an array
      } catch (err) {
        setError("Failed to fetch admins. Please try again later.");
      }
    };

    fetchInquiries();
    fetchAdmins();
    setListChange(false); // Reset the listChange flag after fetching
  }, [listChange]); // Dependency on listChange to re-fetch

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/inquiries/${id}`);
      setInquiries((prevInquiries) =>
        prevInquiries.filter((inquiry) => inquiry.id !== id)
      );
      setSuccess("Inquiry deleted successfully.");
      setListChange(true); // Trigger re-fetch
    } catch (err) {
      setError("Failed to delete inquiry. Please try again.");
    }
  };

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/user/addAdmin", { email });
      if (response.data.msg === "Invalid email" || response.data.msg === "No user found") {
        setSuccess("Failed to add admin");
      } else {
        setSuccess("Admin added successfully.");
      }
      setEmail(""); 
      setListChange(true); // Trigger re-fetch
    } catch (err) {
      setError("Failed to add admin. Please try again.");
    }
  };

  const handleRemoveAdmin = async (AdminEmail) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user/delAdmin`, { email: AdminEmail });
      setSuccess("Admin removed successfully.");
      setListChange(true); // Trigger re-fetch
    } catch (err) {
      setError("Failed to remove admin. Please try again.");
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-black min-h-screen p-8 font-sans text-white">
      <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
      <hr className="border-gray-800" />
      <br />
      {success && success !== "Failed to add admin" && <p className="text-green-500 mb-4">{success}</p>}
      {success && success === "Failed to add admin" && <p className="text-red-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ADD ADMIN Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">ADD ADMIN</h2>
        <div className="flex items-center space-x-4">
          <input
            type="email"
            placeholder="Enter email"
            className="p-2 border border-gray-600 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleAddAdmin}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* ADMINS Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">ADMINS</h2>
        {admins.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 p-2">ID</th>
                <th className="border border-gray-600 p-2">Name</th>
                <th className="border border-gray-600 p-2">Email</th>
                <th className="border border-gray-600 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 text-center p-2">{admin.id}</td>
                  <td className="border border-gray-600 text-center p-2">{admin.name}</td>
                  <td className="border border-gray-600 text-center p-2">{admin.email}</td>
                  <td className="border border-gray-600 text-center p-2">
                    <button
                      onClick={() => handleRemoveAdmin(admin.email)}
                      className="bg-red-500 hover:bg-red-900 text-white px-4 py-2 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No admins found.</p>
        )}
      </div>

      <br />
      <h2 className="text-xl font-bold mb-4">ENQUIRY TABLE</h2>
      {inquiries.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-600 p-2">ID</th>
              <th className="border border-gray-600 p-2">Name</th>
              <th className="border border-gray-600 p-2">Email</th>
              <th className="border border-gray-600 p-2">Message</th>
              <th className="border border-gray-600 p-2">Created At</th>
              <th className="border border-gray-600 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-gray-700">
                <td className="border border-gray-600 p-2">{inquiry.id}</td>
                <td className="border border-gray-600 p-2">{inquiry.name}</td>
                <td className="border border-gray-600 p-2">{inquiry.email}</td>
                <td className="border border-gray-600 p-2">{inquiry.message}</td>
                <td className="border border-gray-600 p-2">
                  {new Date(inquiry.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-600 p-2">
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No inquiries found.</p>
      )}
    </div>
  );
};

export default AdminPanel;