import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/inquiries/${id}`);
      setInquiries((prevInquiries) =>
        prevInquiries.filter((inquiry) => inquiry.id !== id)
      );
      setSuccess("Inquiry deleted successfully.");
    } catch (err) {
      setError("Failed to delete inquiry. Please try again.");
    }
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-black min-h-screen p-8 font-sans text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

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
