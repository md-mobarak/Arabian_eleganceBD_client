

"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import Skeleton from "react-loading-skeleton";
import { FaEdit, FaTrash, FaLock, FaUnlock } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "react-loading-skeleton/dist/skeleton.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Image from "next/image";
import { baseUrl } from "@/utils/api";

const Users = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 10;

  // Authentication state
  const [authData, setAuthData] = useState({
    accessToken: "",
    userRole: "",
    userId: ""
  });

  useEffect(() => {
    const verifyAuth = () => {
      const token = localStorage.getItem("accessToken");
      const role = localStorage.getItem("userRole");
      const userId = localStorage.getItem("userId");

      if (!token || !role || !userId) {
        window.location.href = "/auth/login";
        return;
      }

      setAuthData({ accessToken: token, userRole: role, userId });
    };
    verifyAuth();
  }, []);

  // API headers
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authData.accessToken}`
  });

  // Fetch users with error handling
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", search, roleFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        search,
        role: roleFilter,
        page: page.toString(),
        limit: limit.toString()
      });

      const res = await fetch(`${baseUrl}/auth?${params}`, {
        headers: getHeaders(),
        credentials: 'include'
      });

      if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
        throw new Error("Session expired");
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      return res.json();
    }
  });

  // Update user with enhanced error handling
  const updateMutation = useMutation({
    mutationFn: async ({ id, userData }) => {
      const res = await fetch(`${baseUrl}/auth/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(userData)
      });

      if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Role update failed");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User role updated successfully");
    },
    onError: (error) => {
      toast.error(error.message.includes("403") 
        ? "You can't modify your own role" 
        : error.message);
    }
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${baseUrl}/auth/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });

      if (res.status === 401) {
        localStorage.clear();
        window.location.href = "/auth/login";
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Delete failed");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message.includes("403") 
        ? "You can't delete yourself" 
        : error.message);
    }
  });

  const handleRoleUpdate = (user) => {
    if (user._id === authData.userId) {
      toast.error("You can't modify your own role");
      return;
    }

    confirmAlert({
      title: "Change Role",
      message: `Current role: ${user.role}`,
      buttons: [
        {
          label: "Make Admin",
          onClick: () => updateMutation.mutate({ 
            id: user._id, 
            userData: { role: "admin" } 
          })
        },
        {
          label: "Make Manager",
          onClick: () => updateMutation.mutate({ 
            id: user._id, 
            userData: { role: "manager" } 
          })
        },
        {
          label: "Make User",
          onClick: () => updateMutation.mutate({ 
            id: user._id, 
            userData: { role: "user" } 
          })
        },
        { label: "Cancel" }
      ]
    });
  };

  const handleDelete = (id) => {
    if (id === authData.userId) {
      toast.error("You can't delete yourself");
      return;
    }

    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this user?",
      buttons: [
        { label: "Yes", onClick: () => deleteMutation.mutate(id) },
        { label: "No" }
      ]
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        {authData.userRole === "admin" && (
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b">
              <Skeleton height={30} count={4} />
            </div>
          ))
        ) : isError ? (
          <div className="p-6 text-red-500">{error.message}</div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.data?.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 relative rounded-full overflow-hidden mr-4">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 48px)"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        user.role === "admin" ? "bg-red-100 text-red-800" :
                        user.role === "manager" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.isVerified ? (
                        <span className="text-green-600 flex items-center">
                          <FaUnlock className="mr-2" /> Active
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center">
                          <FaLock className="mr-2" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {authData.userRole === "admin" && user._id !== authData.userId && (
                        <>
                          {
                            user._id === authData.userId ?<button 
                           disabled
                            onClick={() => handleRoleUpdate(user)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaEdit className="text-xl"/>
                          </button>:<button 
                          
                          onClick={() => handleRoleUpdate(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit className="text-xl"/>
                        </button>
                          }
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash className="text-xl"/>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t">
              <span className="text-sm text-gray-700">
                Showing {data?.data?.length} of {data?.pagination?.totalUsers} users
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= data?.pagination?.totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;