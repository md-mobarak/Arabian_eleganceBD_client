
"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import Skeleton from "react-loading-skeleton";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "react-loading-skeleton/dist/skeleton.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Image from "next/image";
import { baseUrl } from "@/utils/api";

const CategoryManagement = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const limit = 10;

  // Authentication State
  const [authData, setAuthData] = useState({
    accessToken: "",
    userRole: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthData({
        accessToken: localStorage.getItem("accessToken") || "",
        userRole: localStorage.getItem("userRole") || ""
      });
    }
  }, []);

  // API Headers
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authData.accessToken}`
  });

  // Fetch Categories Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories", search, page],
    queryFn: async () => {
      let url = `${baseUrl}/category?page=${page}&limit=${limit}`;
      if (search) url += `&search=${search}`;

      const res = await fetch(url, { headers: getHeaders() });
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    }
  });

  // Create/Update Category Mutation
  const categoryMutation = useMutation({
    mutationFn: async ({ id, formData, existingImages }) => {
      const url = id 
        ? `${baseUrl}/category/${id}` 
        : `${baseUrl}/category`;
      const method = id ? "PUT" : "POST";

      // Extract form data
      const name = formData.get("name");
      const slug = formData.get("slug");
      const description = formData.get("description");
      const imageFiles = formData.getAll("images");

      // Handle image uploads
      let imageUrls = [];
      if (imageFiles.length > 0) {
        const uploadPromises = Array.from(imageFiles).map(async (file) => {
          const uploadData = new FormData();
          uploadData.append("image", file);
          const res = await fetch(
            `https://api.imgbb.com/1/upload?key=6c4d7b1d844a7a8b28ed2385a890bf17`,
            { method: "POST", body: uploadData }
          );
          const json = await res.json();
          return json.data.url;
        });
        imageUrls = await Promise.all(uploadPromises);
      }

      // Combine with existing images if updating
      if (id) {
        imageUrls = [...existingImages, ...imageUrls];
      }

      // Prepare category data
      const categoryData = {
        name,
        slug,
        description,
        images: imageUrls
      };

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(categoryData)
      });
      
      if (res.status === 401) throw new Error("Unauthorized");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success(`Category ${selectedCategory ? "updated" : "created"} successfully`);
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message === "Unauthorized" ? "Login expired!" : "Operation failed");
    }
  });

  // Delete Category Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${baseUrl}/category/${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      console.log(res,id)
      if (res.status === 401) throw new Error("Unauthorized");
      return res.json();
   
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category deleted successfully");
      console.log(toast)
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message === "Unauthorized" ? "Login expired!" : "Delete failed");
    }
  });

  // Handle Filters Reset
  const resetFilters = () => {
    setSearch("");
    setPage(1);
  };

  // Handle Delete
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure? This will also delete all subcategories!",
      buttons: [
        { label: "Yes", onClick: () => deleteMutation.mutate(id) },
        { label: "No" }
      ]
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
        <div className="flex gap-4">
          <button
            onClick={resetFilters}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <RxCross2 /> Reset Filters
          </button>
          {["admin", "manager"].includes(authData.userRole) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setIsEditModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <FaPlus /> New Category
            </button>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b">
              <Skeleton height={30} count={4} />
            </div>
          ))
        ) : isError ? (
          <div className="p-6 text-red-500">Error loading categories</div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Slug</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.categories?.map((category) => (
                  <tr key={category._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {category.images?.[0] && (
                          <Image
                            src={category.images[0]}
                            alt={category.name}
                            className="w-10 h-10 object-cover rounded-full"
                            width={600}
                            height={400}
                          />
                        )}
                        <span className="font-medium">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{category.slug}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsViewModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye className="text-xl" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsEditModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FaEdit className="text-xl"/>
                      </button>
                      {["admin", "manager"].includes(authData.userRole) && (
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="text-xl"/>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t">
              <span className="text-sm text-gray-700">
                Showing {data?.categories?.length} of {data?.totalCategories} categories
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= data?.totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {selectedCategory ? "Edit Category" : "Create Category"}
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <RxCross2 className="text-2xl" />
              </button>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const existingImages = selectedCategory?.images || [];
                categoryMutation.mutate({ 
                  id: selectedCategory?._id, 
                  formData: formData,
                  existingImages: existingImages
                });
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    name="name"
                    defaultValue={selectedCategory?.name}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <input
                    name="slug"
                    defaultValue={selectedCategory?.slug}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedCategory?.description}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedCategory?.images?.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Category image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                      width={100}
                      height={100}
                    />
                  ))}
                </div>
                <input
                  type="file"
                  name="images"
                  multiple
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {selectedCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Category Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Category Details</h3>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <RxCross2 className="text-2xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <p className="p-2 bg-gray-100 rounded">{selectedCategory?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <p className="p-2 bg-gray-100 rounded">{selectedCategory?.slug}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <p className="p-2 bg-gray-100 rounded whitespace-pre-line">
                  {selectedCategory?.description || "No description"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Images</label>
                <div className="flex flex-wrap gap-4">
                  {selectedCategory?.images?.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Category image ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg"
                      width={128}
                      height={128}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;