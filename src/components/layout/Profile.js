"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { FaEdit, FaSave, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserShield } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { baseUrl } from "@/utils/api";

const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authData, setAuthData] = useState({
    accessToken: "",
    userId: "",
    userRole: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthData({
        accessToken: localStorage.getItem("accessToken") || "",
        userId: localStorage.getItem("userId") || "",
        userRole: localStorage.getItem("userRole") || ""
      });
    }
  }, []);

  // API Headers
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authData.accessToken}`
  });

  // Fetch user data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", authData.userId],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/auth/${authData.userId}`, { 
        headers: getHeaders() 
      });
      if (!res.ok) throw new Error("Failed to fetch user data");
      return res.json();
    },
    onSuccess: (data) => {
      setUserData(data.data);
    }
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await fetch(`${baseUrl}/auth/${authData.userId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", authData.userId]);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(userData);
  };

  // Role badge styling
  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-red-100 text-red-800",
      manager: "bg-purple-100 text-purple-800",
      user: "bg-blue-100 text-blue-800"
    };
    return `${styles[role]} px-3 py-1 rounded-full text-sm font-medium`;
  };

  // Static data for demo purposes
  const staticUserData = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "manager",
    phone: "+1 (555) 123-4567",
    district: "Manhattan",
    thana: "Midtown",
    village: "Times Square",
    avatar: "/profile.jpg",
    isVerified: true
  };

  // Use static data if API data not available
  const displayData = userData || staticUserData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-orange-500 to-orange-600" />
            
            <div className="absolute -bottom-16 left-8 transform translate-y-1/2">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
                  {displayData.avatar ? (
                    <Image
                      src={displayData.avatar}
                      alt={displayData.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center">
                      <FaUserShield className="text-gray-400 text-4xl" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md">
                  <span className={getRoleBadge(displayData.role)}>
                    {displayData.role.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
                >
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
                >
                  <RxCross2 /> Cancel
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{displayData.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-gray-600">{displayData.email}</span>
                  {displayData.isVerified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaUserShield className="text-orange-500" /> Personal Information
                </h2>
                
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData?.name || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData?.email || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                        disabled
                      />
                    </div>
                    
                    {authData.userRole === "admin" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          User Role
                        </label>
                        <select
                          name="role"
                          value={userData?.role || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                          <option value="user">User</option>
                          <option value="manager">Manager</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors w-full justify-center"
                      disabled={updateMutation.isLoading}
                    >
                      <FaSave /> Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <FaLock className="text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Status</p>
                        <p className="font-medium">
                          {displayData.isVerified ? "Verified Account" : "Unverified Account"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <FaEnvelope className="text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{displayData.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <FaUserShield className="text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Role</p>
                        <p className="font-medium capitalize">{displayData.role}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-orange-500" /> Contact Information
                </h2>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData?.phone || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={userData?.district || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thana/Upazila
                      </label>
                      <input
                        type="text"
                        name="thana"
                        value={userData?.thana || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Village/Area
                      </label>
                      <input
                        type="text"
                        name="village"
                        value={userData?.village || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <FaPhone className="text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-medium">
                          {displayData.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <FaMapMarkerAlt className="text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">
                          {displayData.village || "Not provided"},{" "}
                          {displayData.thana || "Not provided"},<br />
                          {displayData.district || "Not provided"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                      <h3 className="font-semibold text-gray-800 mb-2">Security Tip</h3>
                      <p className="text-sm text-gray-600">
                        Your account security is important. Always use a strong password and 
                        enable two-factor authentication for added protection.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Activity Section */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { 
                    action: "Updated profile information", 
                    time: "2 hours ago",
                    icon: <FaEdit className="text-orange-500" />
                  },
                  { 
                    action: "Logged in from new device", 
                    time: "1 day ago",
                    icon: <FaLock className="text-green-500" />
                  },
                  { 
                    action: "Completed security verification", 
                    time: "3 days ago",
                    icon: <FaUserShield className="text-blue-500" />
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="bg-white p-3 rounded-full shadow-sm mt-1">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;