"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import Skeleton from "react-loading-skeleton";
import { 
  FaEdit, FaTrash, FaSearch, FaPlus, FaEye, 
  FaTimes, FaSave, FaImage, FaInfoCircle
} from "react-icons/fa";
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
  const [imagePreviews, setImagePreviews] = useState([]);
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

  // Handle image previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

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
      if (imageFiles.length > 0 && imageFiles[0].size > 0) {
        const uploadPromises = Array.from(imageFiles).map(async (file) => {
          if (file.size === 0) return null; // Skip empty files
          
          const uploadData = new FormData();
          uploadData.append("image", file);
          const res = await fetch(
            `https://api.imgbb.com/1/upload?key=6c4d7b1d844a7a8b28ed2385a890bf17`,
            { method: "POST", body: uploadData }
          );
          const json = await res.json();
          return json.data.url;
        });
        imageUrls = (await Promise.all(uploadPromises)).filter(url => url !== null);
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
      setImagePreviews([]);
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
      if (res.status === 401) throw new Error("Unauthorized");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
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
        { 
          label: "Delete", 
          className: "bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mr-2",
          onClick: () => deleteMutation.mutate(id) 
        },
        { 
          label: "Cancel",
          className: "bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        }
      ],
      overlayClassName: "backdrop-blur-sm"
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={resetFilters}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 text-gray-700 transition-colors"
          >
            <FaTimes className="text-sm" /> Reset Filters
          </button>
          {["admin", "manager"].includes(authData.userRole) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setImagePreviews([]);
                setIsEditModalOpen(true);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus /> New Category
            </button>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        {isLoading ? (
          <div className="p-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="mb-4">
                <Skeleton height={60} />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-8 text-center">
            <div className="text-red-500 text-lg mb-2">Error loading categories</div>
            <p className="text-gray-600">Please try again later</p>
          </div>
        ) : data?.categories?.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-500 text-lg mb-2">No categories found</div>
            <p className="text-gray-600">Try adjusting your search or create a new category</p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.categories?.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {category.images?.[0] ? (
                          <Image
                            src={category.images[0]}
                            alt={category.name}
                            className="w-10 h-10 object-cover rounded-lg"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                        )}
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{category.slug}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsViewModalOpen(true);
                        }}
                        className="text-orange-500 hover:text-orange-700 p-2 rounded-full hover:bg-orange-50 transition-colors"
                        title="View Details"
                      >
                        <FaEye className="text-lg" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setImagePreviews([]);
                          setIsEditModalOpen(true);
                        }}
                        className="text-black hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Edit Category"
                      >
                        <FaEdit className="text-lg"/>
                      </button>
                      {["admin", "manager"].includes(authData.userRole) && (
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete Category"
                        >
                          <FaTrash className="text-lg"/>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-t bg-gray-50">
              <span className="text-sm text-gray-700 mb-2 md:mb-0">
                Showing {data?.categories?.length} of {data?.totalCategories} categories
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <span>Previous</span>
                </button>
                <div className="px-4 py-2 bg-orange-50 text-orange-600 rounded-md font-medium">
                  Page {page} of {data?.totalPages}
                </div>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= data?.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <span>Next</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedCategory ? "Edit Category" : "Create Category"}
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <RxCross2 className="text-xl" />
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
              className="space-y-4 p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Category Name*</label>
                  <input
                    name="name"
                    defaultValue={selectedCategory?.name}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Slug*</label>
                  <input
                    name="slug"
                    defaultValue={selectedCategory?.slug}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                    placeholder="Enter unique slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedCategory?.description}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  rows="3"
                  placeholder="Add a description for this category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Category Images
                </label>
                
                {/* Existing Images */}
                {selectedCategory?.images?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Existing Images:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.images.map((img, index) => (
                        <Image
                          key={index}
                          src={img}
                          alt={`Category image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                          width={80}
                          height={80}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* New Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">New Images:</p>
                    <div className="flex flex-wrap gap-2">
                      {imagePreviews.map((preview, index) => (
                        <Image
                          key={index}
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                          width={80}
                          height={80}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaImage className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                    </div>
                    <input 
                      type="file" 
                      name="images" 
                      multiple 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                  disabled={categoryMutation.isLoading}
                >
                  {categoryMutation.isLoading ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <FaSave />
                      <span>{selectedCategory ? "Update Category" : "Create Category"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Category Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">Category Details</h3>
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <RxCross2 className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <FaInfoCircle className="text-orange-500 text-xl" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">Category Information</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Name</p>
                      <p className="font-medium text-gray-900">{selectedCategory?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Slug</p>
                      <p className="font-medium text-gray-900">{selectedCategory?.slug}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Description</p>
                      <p className="font-medium text-gray-900">
                        {selectedCategory?.description || "No description"}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedCategory?.images?.length > 0 && (
                  <div className="bg-white p-5 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-orange-100 p-3 rounded-full">
                        <FaImage className="text-orange-500 text-xl" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800">Category Images</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedCategory.images.map((img, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={img}
                            alt={`Category image ${index + 1}`}
                            className="w-full h-full object-cover"
                            width={200}
                            height={200}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;