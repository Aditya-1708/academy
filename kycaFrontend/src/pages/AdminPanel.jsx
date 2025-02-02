"use client"

import { useEffect, useState, useCallback } from "react"
import { useRecoilValue } from "recoil"
import { userState } from "../atoms"
import axiosInstance from "../axios"

const AdminPanel = () => {
  const user = useRecoilValue(userState)
  const [feedbacks, setFeedbacks] = useState([])
  const [links, setLinks] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [listChange, setListChange] = useState(false)

  const [inquiries, setInquiries] = useState([])
  const [admins, setAdmins] = useState([])
  const [email, setEmail] = useState("")

  const [gems, setGems] = useState([])
  const [gemName, setGemName] = useState("")
  const [gemImage, setGemImage] = useState(null)
  const [gemTeam, setGemTeam] = useState("")
  const [gemPreview, setGemPreview] = useState(null)

  const [coaches, setCoaches] = useState([])
  const [coachName, setCoachName] = useState("")
  const [coachImage, setCoachImage] = useState(null)
  const [coachPhone, setCoachPhone] = useState("")
  const [coachDescription, setCoachDescription] = useState("")
  const [coachPreview, setCoachPreview] = useState(null)

  const [activeTab, setActiveTab] = useState("admins")
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", message: "", onConfirm: () => {} })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [adminsRes, gemsRes, coachesRes, inquiriesRes, feedbacksRes, linksRes] = await Promise.all([
          axiosInstance.get("/api/user/getAdmins"),
          axiosInstance.get("/api/gems"),
          axiosInstance.get("/api/coach"),
          axiosInstance.get("/api/inquiries"),
          axiosInstance.get("/api/admin/getAllFeedback"),
          axiosInstance.get("/api/user/links"),
        ])

        setAdmins(adminsRes.data.list || [])
        setGems(gemsRes.data || [])
        setCoaches(coachesRes.data || [])
        setInquiries(inquiriesRes.data)
        setFeedbacks(feedbacksRes.data.feedback)
        setLinks(linksRes.data[0])
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch data. Please try again later.")
        setLoading(false)
      }
      setIsLoading(false)
    }

    fetchData()
    setListChange(false)
  }, [])

  const handleAddAdmin = async () => {
    if (!email) {
      setError("Please enter an email address.")
      return
    }
    setIsLoading(true)
    try {
      const response = await axiosInstance.post("/api/user/addAdmin", { email })
      setSuccess(
        response.data.msg === "Invalid email" || response.data.msg === "No user found"
          ? "Failed to add admin"
          : "Admin added successfully.",
      )
      setEmail("")
      setListChange(true)
    } catch (err) {
      setError("Failed to add admin. Please try again.")
    }
    setIsLoading(false)
  }

  const handleRemoveAdmin = async (AdminEmail) => {
    setModalContent({
      title: "Remove Admin",
      message: `Are you sure you want to remove ${AdminEmail} as an admin?`,
      onConfirm: async () => {
        setIsLoading(true)
        try {
          await axiosInstance.post(`/api/user/delAdmin`, { email: AdminEmail })
          setSuccess("Admin removed successfully.")
          setListChange(true)
        } catch (err) {
          setError("Failed to remove admin. Please try again.")
        }
        setIsLoading(false)
        setIsModalOpen(false)
      },
    })
    setIsModalOpen(true)
  }

  const handleDeleteInquiries = async (id) => {
    setModalContent({
      title: "Delete Inquiry",
      message: "Are you sure you want to delete this inquiry?",
      onConfirm: async () => {
        setIsLoading(true)
        try {
          await axiosInstance.delete(`/api/inquiries/${id}`)
          setSuccess("Inquiry deleted successfully.")
          setListChange(true)
        } catch (err) {
          setError("Failed to delete inquiry. Please try again.")
        }
        setIsLoading(false)
        setIsModalOpen(false)
      },
    })
    setIsModalOpen(true)
  }

  const handleDeleteFeedback = async (id) => {
    setModalContent({
      title: "Delete Feedback",
      message: "Are you sure you want to delete this feedback?",
      onConfirm: async () => {
        setIsLoading(true)
        try {
          await axiosInstance.post("/api/admin/delFeedback", { id })
          setSuccess("Feedback deleted!")
          setListChange(true)
        } catch (e) {
          setError("Failed to delete Feedback!")
        }
        setIsLoading(false)
        setIsModalOpen(false)
      },
    })
    setIsModalOpen(true)
  }

  const handleChooseFeedback = async (id, choice) => {
    setIsLoading(true)
    try {
      await axiosInstance.post("/api/admin/chooseFeedback", { id })
      setSuccess(`Feedback ${choice === 1 ? "chosen" : "unchosen"}`)
    } catch (e) {
      setError(`Failed to ${choice === 1 ? "choose" : "unchoose"} feedback`)
    }
    setIsLoading(false)
  }

  const handleAddGem = async () => {
    if (!gemName || !gemTeam) {
      setError("Please fill in all fields.")
      return
    }
    setIsLoading(true)
    const formData = new FormData()
    formData.append("name", gemName)
    formData.append("team", gemTeam)
    if (gemImage) {
      formData.append("img", gemImage)
    }

    try {
      await axiosInstance.post("/api/gems", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setGemTeam("")
      setGemName("")
      setSuccess("Gem added successfully.")
      setListChange(true)
      setGemPreview(null)
      setGemImage(null)
    } catch {
      setError("Failed to add gem. Please try again.")
    }
    setIsLoading(false)
  }

  const handleDeleteGem = async (gemId) => {
    setModalContent({
      title: "Delete Gem",
      message: "Are you sure you want to delete this gem?",
      onConfirm: async () => {
        setIsLoading(true)
        try {
          await axiosInstance.delete(`/api/gems/${gemId}`)
          setSuccess("Gem deleted successfully.")
          setListChange(true)
        } catch {
          setError("Failed to delete gem. Please try again.")
        }
        setIsLoading(false)
        setIsModalOpen(false)
      },
    })
    setIsModalOpen(true)
  }

  const handleFileChangeGem = (e) => {
    const file = e.target.files[0]
    setGemImage(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setGemPreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setGemPreview(null)
    }
  }

  const handleAddCoach = async () => {
    if (!coachName || !coachPhone || !coachDescription) {
      setError("Please fill in all fields.")
      return
    }
    setIsLoading(true)
    const formData = new FormData()
    formData.append("name", coachName)
    formData.append("phone", coachPhone)
    formData.append("description", coachDescription)
    if (coachImage) {
      formData.append("img", coachImage)
    }
    try {
      await axiosInstance.post("/api/coach", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setSuccess("Coach added successfully.")
      setListChange(true)
      setCoachPreview(null)
      setCoachName("")
      setCoachPhone("")
      setCoachDescription("")
      setCoachImage(null)
    } catch {
      setError("Failed to add Coach. Please try again.")
    }
    setIsLoading(false)
  }

  const handleDeleteCoach = async (coachId) => {
    setModalContent({
      title: "Delete Coach",
      message: "Are you sure you want to delete this coach?",
      onConfirm: async () => {
        setIsLoading(true)
        try {
          await axiosInstance.delete(`/api/coach/${coachId}`)
          setSuccess("Coach deleted successfully.")
          setListChange(true)
        } catch {
          setError("Failed to delete Coach. Please try again.")
        }
        setIsLoading(false)
        setIsModalOpen(false)
      },
    })
    setIsModalOpen(true)
  }

  const handleFileChangeCoach = (e) => {
    const file = e.target.files[0]
    setCoachImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoachPreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setCoachPreview(null)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLinks((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axiosInstance.put(`/api/admin/links/0`, {
        facebook: links.facebook,
        instagram: links.instagram,
        whatsapp: links.whatsapp,
      })
      setSuccess("Links updated successfully")
    } catch (err) {
      setError("Failed to update links")
    }
    setIsLoading(false)
  }

  const filteredData = useCallback(
    (data) => {
      return data.filter((item) =>
        Object.values(item).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    },
    [searchTerm],
  )

  const paginatedData = useCallback(
    (data) => {
      const filtered = filteredData(data)
      const lastIndex = currentPage * itemsPerPage
      const firstIndex = lastIndex - itemsPerPage
      return filtered.slice(firstIndex, lastIndex)
    },
    [currentPage, filteredData, itemsPerPage],
  )

  const pageCount = useCallback(
    (data) => Math.ceil(filteredData(data).length / itemsPerPage),
    [filteredData, itemsPerPage],
  )

  if (loading) return <p className="text-center p-4">Loading...</p>
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"} p-4 md:p-8`}>
      <div
        className={`max-w-6xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md overflow-hidden`}
      >
        <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-md ${darkMode ? "bg-yellow-500 text-gray-900" : "bg-gray-800 text-white"}`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
          {success && (
            <p className={`mt-2 ${success.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{success}</p>
          )}
        </div>

        <div className={`flex flex-wrap border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          {["admins", "inquiries", "gems", "feedbacks", "coaches", "social"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium ${
                activeTab === tab
                  ? darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-3 py-2 border ${
                darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>

          {activeTab === "admins" && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                Manage Admins
              </h2>
              <div className="flex flex-col md:flex-row items-end gap-4 mb-6">
                <div className="w-full md:w-auto">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} mb-1`}
                  >
                    Admin Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2 border ${
                      darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                <button
                  onClick={handleAddAdmin}
                  className={`px-4 py-2 ${
                    darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                  } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add Admin"}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className={`min-w-full divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                  <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        ID
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Name
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Email
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`${darkMode ? "bg-gray-900" : "bg-white"} divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
                  >
                    {paginatedData(admins).map((admin) => (
                      <tr key={admin.id}>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {admin.id}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {admin.name}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {admin.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleRemoveAdmin(admin.email)}
                            className={`px-3 py-1 ${
                              darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                            } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                            disabled={isLoading}
                          >
                            {isLoading ? "Removing..." : "Remove"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredData(admins).length)} of {filteredData(admins).length}{" "}
                    entries
                  </p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: pageCount(admins) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* rest of the code */}
          {activeTab === "inquiries" && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Inquiries</h2>
              <div className="overflow-x-auto">
                <table className={`min-w-full divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                  <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        ID
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Name
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Email
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Message
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Created At
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`${darkMode ? "bg-gray-900" : "bg-white"} divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
                  >
                    {paginatedData(inquiries).map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {inquiry.id}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {inquiry.name}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {inquiry.email}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap max-w-xs truncate ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          {inquiry.message}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {new Date(inquiry.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteInquiries(inquiry.id)}
                            className={`px-3 py-1 ${
                              darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                            } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                            disabled={isLoading}
                          >
                            {isLoading ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredData(inquiries).length)} of{" "}
                    {filteredData(inquiries).length} entries
                  </p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: pageCount(inquiries) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "gems" && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Manage Gems</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Enter Gem name"
                  value={gemName}
                  onChange={(e) => setGemName(e.target.value)}
                  className={`px-3 py-2 border ${
                    darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <input
                  type="text"
                  placeholder="Enter Gem team"
                  value={gemTeam}
                  onChange={(e) => setGemTeam(e.target.value)}
                  className={`px-3 py-2 border ${
                    darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChangeGem}
                  className={`px-3 py-2 border ${
                    darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <button
                  onClick={handleAddGem}
                  className={`px-4 py-2 ${
                    darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                  } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add Gem"}
                </button>
              </div>
              {gemPreview && (
                <div className="mt-4">
                  <p>Preview:</p>
                  <img
                    src={gemPreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
              <div className="overflow-x-auto">
                <table className={`min-w-full divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                  <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        ID
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Name
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Team
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Image
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`${darkMode ? "bg-gray-900" : "bg-white"} divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
                  >
                    {paginatedData(gems).map((gem) => (
                      <tr key={gem.id}>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {gem.id}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {gem.name}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {gem.team}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}${gem.img}`}
                            alt={gem.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteGem(gem.id)}
                            className={`px-3 py-1 ${
                              darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                            } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                            disabled={isLoading}
                          >
                            {isLoading ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredData(gems).length)} of {filteredData(gems).length}{" "}
                    entries
                  </p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: pageCount(gems) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "feedbacks" && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Feedbacks</h2>
              <div className="overflow-x-auto">
                <table className={`min-w-full divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                  <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        ID
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"}uppercase tracking-wider`}
                      >
                        Name
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Email
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Rating
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Message
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`${darkMode ? "bg-gray-900" : "bg-white"} divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
                  >
                    {paginatedData(feedbacks).map((feedback) => (
                      <tr key={feedback.id}>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {feedback.id}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {feedback.name}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {feedback.email}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {feedback.rating}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap max-w-xs truncate ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          {feedback.message}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleChooseFeedback(feedback.id, 1)}
                              className={`px-3 py-1 ${
                                darkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
                              } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                              disabled={isLoading}
                            >
                              {isLoading ? "Choosing..." : "Choose"}
                            </button>
                            <button
                              onClick={() => handleChooseFeedback(feedback.id, 2)}
                              className={`px-3 py-1 ${
                                darkMode ? "bg-yellow-600 hover:bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-600"
                              } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
                              disabled={isLoading}
                            >
                              {isLoading ? "Unchoosing..." : "Unchoose"}
                            </button>
                            <button
                              onClick={() => handleDeleteFeedback(feedback.id)}
                              className={`px-3 py-1 ${
                                darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                              } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                              disabled={isLoading}
                            >
                              {isLoading ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredData(feedbacks).length)} of{" "}
                    {filteredData(feedbacks).length} entries
                  </p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: pageCount(feedbacks) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "coaches" && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                Manage Coaches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Enter Coach name"
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  className={`px-3 py-2 border ${
                    darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <input
                  type="text"
                  placeholder="Enter Coach Phone"
                  value={coachPhone}
                  onChange={(e) => setCoachPhone(e.target.value)}
                  className={`px-3 py-2 border ${
                    darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <input
                  type="text"
                  placeholder="Enter Coach Description"
                  value={coachDescription}
                  onChange={(e) => setCoachDescription(e.target.value)}
                  className={`px-3 py-2 border ${
                    darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChangeCoach}
                  className={`px-3 py-2 border ${
                    darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                <button
                  onClick={handleAddCoach}
                  className={`px-4 py-2 ${
                    darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                  } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add Coach"}
                </button>
              </div>
              {coachPreview && (
                <div className="mt-4">
                  <p>Preview:</p>
                  <img
                    src={coachPreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
              <div className="overflow-x-auto">
                <table className={`min-w-full divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                  <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
                    <tr>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        ID
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Name
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Phone
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Description
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Image
                      </th>
                      <th
                        className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-500"} uppercase tracking-wider`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`${darkMode ? "bg-gray-900" : "bg-white"} divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
                  >
                    {paginatedData(coaches).map((coach) => (
                      <tr key={coach.id}>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {coach.id}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {coach.name}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {coach.phone}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap max-w-xs truncate ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          {coach.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}${coach.img}`}
                            alt={coach.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteCoach(coach.id)}
                            className={`px-3 py-1 ${
                              darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                            } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                            disabled={isLoading}
                          >
                            {isLoading ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredData(coaches).length)} of{" "}
                    {filteredData(coaches).length} entries
                  </p>
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: pageCount(coaches) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1
                          ? darkMode
                            ? "bg-blue-600 text-white"
                            : "bg-blue-500 text-white"
                          : darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                Edit Social Links
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="facebook"
                    className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="facebook"
                    value={links.facebook}
                    onChange={handleChange}
                    placeholder="Enter Facebook URL"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="instagram"
                    className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={links.instagram}
                    onChange={handleChange}
                    placeholder="Enter Instagram URL"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    WhatsApp
                  </label>
                  <input
                    type="url"
                    id="whatsapp"
                    name="whatsapp"
                    value={links.whatsapp}
                    onChange={handleChange}
                    placeholder="Enter WhatsApp URL"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      darkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Links"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-lg max-w-md w-full`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              {modalContent.title}
            </h2>
            <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{modalContent.message}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 ${
                  darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
                } text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
              >
                Cancel
              </button>
              <button
                onClick={modalContent.onConfirm}
                className={`px-4 py-2 ${
                  darkMode ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? "text-white" : "text-gray-900"} text-2xl font-bold`}>Loading...</div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel