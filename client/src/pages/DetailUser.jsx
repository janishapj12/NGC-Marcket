import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { assets } from "../assets/assets";

const DetailUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  // Fetch user profile
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:1000/api/user/profile/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUserData(data);
      setFormData({ name: data.name, email: data.email });
    } catch (error) {
      toast.error("Failed to load profile");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    handleUpdate();
  }, [id]);

  // Handle update
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:1000/api/user/update/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
          runValidators: true 
        }
      );
      toast.success("User updated successfully");
      setUserData(data);
      setFormData({ name: data.name, email: data.email });
      setEditMode(false);
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Update error:", error.response?.data || error.message);
    }
  };
  

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:1000/api/user/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("User deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen p-6">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="bg-slate-900 shadow-lg rounded-2xl p-10 max-w-md w-full text-center relative z-10">
        {loading ? (
          <Skeleton height={200} />
        ) : userData ? (
          <>
            <div onClick={() => navigate("/Dashbord")} className="absolute -top-14 left-1/2 transform -translate-x-1/2">
            
              <img
                src={assets.user_id}
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
                             />
            </div>

            <div className="mt-16">
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 mb-2 rounded bg-gray-800 text-white"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white"
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-indigo-300 dark:text-white">
                    {userData.name}
                  </h2>
                  <p className="text-gray-500">{userData.email}</p>

                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Account Details
                    </h2>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Account Status
                        </span>
                        <span className="text-sm font-semibold text-lime-400">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-around">
                    <button
                      onClick={() => setEditMode(true)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No user data found
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailUser;
