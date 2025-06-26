// "use client";
// import { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { confirmAlert } from "react-confirm-alert";
// import Skeleton from "react-loading-skeleton";
// import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import "react-loading-skeleton/dist/skeleton.css";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import ProductModal from "../ProductModal";
// import Image from "next/image";
// import { baseUrl } from "@/utils/api";

// const ProductManagement = () => {
//   const queryClient = useQueryClient();
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [page, setPage] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const limit = 10;

//   // Fetch categories for select
//   const { data: categories } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const res = await fetch(`${baseUrl}/category`);
//       const data = await res.json();
//       return data.categories;
//     }
//   });

//   // Authentication state
//   const [authData, setAuthData] = useState({
//     accessToken: "",
//     userRole: ""
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setAuthData({
//         accessToken: localStorage.getItem("accessToken") || "",
//         userRole: localStorage.getItem("userRole") || ""
//       });
//     }
//   }, []);

//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${authData.accessToken}`
//   });

//   // Fetch products
//   const { data, isLoading, isError,refetch  } = useQuery({
//     queryKey: ["products", search, categoryFilter, minPrice, maxPrice, page],
//     queryFn: async () => {
//       const params = new URLSearchParams({
//         search,
//         category: categoryFilter,
//         minPrice,
//         maxPrice,
//         page: page.toString(),
//         limit: limit.toString()
//       });
      
//       const res = await fetch(`${baseUrl}/product?${params}`);
//       return res.json();
//     }
//   });

//   // Image handling
//   const handleFileSelect = (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map(file => ({
//       file,
//       preview: URL.createObjectURL(file)
//     }));
//     setSelectedFiles(prev => [...prev, ...previews]);
//   };

//   const removeImage = (index, isExisting) => {
//     if (isExisting) {
//       setExistingImages(prev => prev.filter((_, i) => i !== index));
//     } else {
//       setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//     }
//   };

//   // Product mutation
//   const productMutation = useMutation({
//     mutationFn: async ({ id, formData }) => {
//       const url = id ? `${baseUrl}/product/${id}` : `${baseUrl}/product`;
//       const method = id ? "PUT" : "POST";

//       // Upload new images
//       const uploadPromises = selectedFiles.map(async (fileObj) => {
//         const form = new FormData();
//         form.append("image", fileObj.file);
//         const res = await fetch(
//           `https://api.imgbb.com/1/upload?key=85550ec4bf046ba661f38ebd86e505ac`,
//           { method: "POST", body: form }
//         );
//         return res.json();
//       });

//       const uploaded = await Promise.all(uploadPromises);
//       const newImageUrls = uploaded.map(img => img.data.url);

//       // Prepare product data
//       const productData = {
//         ...Object.fromEntries(formData.entries()),
//         category: formData.get("category"),
//         sizes: formData.getAll("sizes"),
//         colors: formData.get("colors").split(",").map(c => c.trim()),
//         tags: formData.get("tags").split(",").map(t => t.trim()),
//         images: [...existingImages, ...newImageUrls],
//         price: Number(formData.get("price")),
//         stock: Number(formData.get("stock"))
//       };

//       const res = await fetch(url, {
//         method,
//         headers: getHeaders(),
//         body: JSON.stringify(productData)
//       });
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["products"]);
//       toast.success("Product saved successfully");
//       handleCloseModal();
//     },
//     onError: (error) => {
//       toast.error(error.message || "Operation failed");
//     }
//   });

//   const handleSubmit = (e, id) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     productMutation.mutate({ id, formData });
//   };

//   const handleDelete = (id) => {
//     confirmAlert({
//       title: "Confirm Delete",
//       message: "Are you sure?",
//       buttons: [
//         { 
//           label: "Yes", 
//           onClick: () => {
//             fetch(`${baseUrl}/product/${id}`, {
//               method: "DELETE",
//               headers: getHeaders()
//             })
//             .then(() => {
//               queryClient.invalidateQueries(["products"]);
//                refetch()
//               toast.success("Product deleted");
//             });
//           }
//         },
//         { label: "No" }
//       ]
//     });
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//     setSelectedFiles([]);
//     setExistingImages([]);
//   };

//   useEffect(() => {
//     if (selectedProduct) {
//       setExistingImages(selectedProduct.images || []);
//     }
//   }, [selectedProduct]);

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
//         {["admin", "manager"].includes(authData.userRole) && (
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
//           >
//             + New Product
//           </button>
//         )}
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border p-2 rounded-lg"
//         />
//         <input
//           type="number"
//           placeholder="Min Price"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           className="border p-2 rounded-lg"
//         />
//         <input
//           type="number"
//           placeholder="Max Price"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           className="border p-2 rounded-lg"
//         />
//         <select
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="border p-2 rounded-lg"
//         >
//           <option value="">All Categories</option>
//           {categories?.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left">Product</th>
//               <th className="px-6 py-3 text-left">Price</th>
//               <th className="px-6 py-3 text-left">Category</th>
//               <th className="px-6 py-3 text-left">Stock</th>
//               <th className="px-6 py-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {data?.products?.map(product => (
//               <tr key={product._id}>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     {product.images?.[0] && (
//                       <Image
//                         src={product.images[0]}
//                         alt={product.title}
//                         width={60}
//                         height={60}
//                         className="w-12 h-12 object-cover rounded"
//                       />
//                     )}
//                     <span className="font-medium">{product.title}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">${product.price}</td>
//                 <td className="px-6 py-4">{product.category?.name || '-'}</td>
//                 <td className="px-6 py-4">{product.stock}</td>
//                 <td className="px-6 py-4 space-x-2">
//                   <button
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setIsModalOpen(true);
//                     }}
//                     className="text-indigo-600 hover:text-indigo-900"
//                   >
//                     <FaEdit className="text-xl" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <FaTrash className="text-xl" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex justify-between items-center px-6 py-4 border-t">
//           <span className="text-sm text-gray-700">
//             Showing {data?.products?.length} of {data?.total} products
//           </span>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setPage(p => Math.max(p - 1, 1))}
//               disabled={page === 1}
//               className="px-4 py-2 border rounded-md disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2">Page {page}</span>
//             <button
//               onClick={() => setPage(p => p + 1)}
//               disabled={page >= data?.totalPages}
//               className="px-4 py-2 border rounded-md disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Product Modal */}
//       <ProductModal isOpen={isModalOpen} onClose={handleCloseModal}>
//         <form onSubmit={(e) => handleSubmit(e, selectedProduct?._id)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Product Name</label>
//             <input
//               name="title"
//               defaultValue={selectedProduct?.title}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Category</label>
//             <select
//               name="category"
//               defaultValue={selectedProduct?.category?._id}
//               className="w-full p-2 border rounded"
//               required
//             >
//               <option value="">Select Category</option>
//               {categories?.map(cat => (
//                 <option key={cat._id} value={cat._id}>{cat.name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               name="description"
//               defaultValue={selectedProduct?.description}
//               className="w-full p-2 border rounded"
//               rows="3"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Price</label>
//               <input
//                 name="price"
//                 type="number"
//                 defaultValue={selectedProduct?.price}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Stock</label>
//               <input
//                 name="stock"
//                 type="number"
//                 defaultValue={selectedProduct?.stock}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Sizes</label>
//             <div className="grid grid-cols-3 gap-2">
//               {["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38","40","42","44"].map(size => (
//                 <label key={size} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     name="sizes"
//                     value={size}
//                     defaultChecked={selectedProduct?.sizes?.includes(size)}
//                     className="mr-2"
//                   />
//                   {size}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Colors (comma separated)</label>
//             <input
//               name="colors"
//               defaultValue={selectedProduct?.colors?.join(", ")}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
//             <input
//               name="tags"
//               defaultValue={selectedProduct?.tags?.join(", ")}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Images</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileSelect}
//               className="w-full p-2 border rounded"
//               accept="image/*"
//             />
            
//             <div className="mt-4 flex flex-wrap gap-4">
//               {existingImages.map((img, index) => (
//                 <div key={`existing-${index}`} className="relative">
//                   <Image
//                     src={img}
//                     width={100}
//                     height={100}
//                     className="w-24 h-24 object-cover rounded"
//                     alt={`Existing ${index}`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index, true)}
//                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                   >
//                     <FaTimes className="text-xs" />
//                   </button>
//                 </div>
//               ))}

//               {selectedFiles.map((fileObj, index) => (
//                 <div key={`new-${index}`} className="relative">
//                   {/* <img
//                     src={fileObj.preview}
//                     className="w-24 h-24 object-cover rounded"
//                     alt={`Preview ${index}`}
//                   /> */}
//                    <Image
//                     src={fileObj.preview}
//                     className="w-24 h-24 object-cover rounded"
//                     alt={`Preview ${index}`}
//                     width={100}
//                     height={100}
          
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                   >
//                     <FaTimes className="text-xs" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-end gap-2 mt-6">
//             <button
//               type="button"
//               onClick={handleCloseModal}
//               className="px-4 py-2 border rounded hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//             >
//               {selectedProduct ? "Update Product" : "Create Product"}
//             </button>
//           </div>
//         </form>
//       </ProductModal>
//     </div>
//   );
// };

// export default ProductManagement;

"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import Skeleton from "react-loading-skeleton";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "react-loading-skeleton/dist/skeleton.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import ProductModal from "../ProductModal";
import Image from "next/image";
import { baseUrl } from "@/utils/api";
// import { baseUrl } from "@/utils/api";

const ProductManagement = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const limit = 10;

  // Fetch categories for select
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/category`);
      const data = await res.json();
      return data.categories;
    }
  });

  // Authentication state
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

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authData.accessToken}`
  });

  // Fetch products
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", search, categoryFilter, minPrice, maxPrice, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        search,
        category: categoryFilter,
        minPrice,
        maxPrice,
        page: page.toString(),
        limit: limit.toString()
      });
      
      const res = await fetch(`${baseUrl}/product?${params}`);
      return res.json();
    }
  });
  // console.log(data)

  // Skeleton loader for table rows
  const TableSkeleton = () => (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton circle width={48} height={48} />
          <Skeleton width={150} />
        </div>
      </td>
      <td className="px-6 py-4"><Skeleton width={80} /></td>
      <td className="px-6 py-4"><Skeleton width={100} /></td>
      <td className="px-6 py-4"><Skeleton width={60} /></td>
      <td className="px-6 py-4 space-x-2">
        <Skeleton width={30} height={30} circle />
        <Skeleton width={30} height={30} circle />
      </td>
    </tr>
  );

  // Image handling
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setSelectedFiles(prev => [...prev, ...previews]);
  };

  const removeImage = (index, isExisting) => {
    if (isExisting) {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Product mutation
  // const productMutation = useMutation({
  //   mutationFn: async ({ id, formData }) => {
  //     const url = id ? `${baseUrl}/product/${id}` : `${baseUrl}/product`;
  //     const method = id ? "PUT" : "POST";

  //     // Upload new images
  //     const uploadPromises = selectedFiles.map(async (fileObj) => {
  //       const form = new FormData();
  //       form.append("image", fileObj.file);
  //       const res = await fetch(
  //         `https://api.imgbb.com/1/upload?key=85550ec4bf046ba661f38ebd86e505ac`,
  //         { method: "POST", body: form }
  //       );
  //       return res.json();
  //     });

  //     const uploaded = await Promise.all(uploadPromises);
  //     const newImageUrls = uploaded.map(img => img.data.url);

  //     // Prepare product data
  //     const productData = {
  //       ...Object.fromEntries(formData.entries()),
  //       category: formData.get("category"),
  //       sizes: formData.getAll("sizes"),
  //       colors: formData.get("colors").split(",").map(c => c.trim()),
  //       tags: formData.get("tags").split(",").map(t => t.trim()),
  //       images: [...existingImages, ...newImageUrls],
  //       price: Number(formData.get("price")),
  //       stock: Number(formData.get("stock"))
  //     };

  //     const res = await fetch(url, {
  //       method,
  //       headers: getHeaders(),
  //       body: JSON.stringify(productData)
  //     });
  //     return res.json();
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["products"]);
  //     toast.success("Product saved successfully");
  //     handleCloseModal();
  //   },
  //   onError: (error) => {
  //     toast.error(error.message || "Operation failed");
  //   }
  // });
  // Update your product mutation in the frontend
const productMutation = useMutation({
  mutationFn: async ({ id, formData }) => {
    const url = id ? `${baseUrl}/product/${id}` : `${baseUrl}/product`;
    const method = id ? "PUT" : "POST";

    // Create FormData and append all fields
    const formDataToSend = new FormData();
    
    // Append text fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('sizes', JSON.stringify(formData.sizes));
    formDataToSend.append('colors', formData.colors);
    formDataToSend.append('tags', formData.tags);

    // Append new images
    selectedFiles.forEach(fileObj => {
      formDataToSend.append('images', fileObj.file);
    });

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
      body: formDataToSend
    });
console.log(res);
    return res.json();
  },
  
  onSuccess: () => {
    queryClient.invalidateQueries(["products"]);
    toast.success("Product saved successfully");
    handleCloseModal();
  },
  onError: (error) => {
    toast.error(error.message || "Operation failed");
  }

});

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    productMutation.mutate({ id, formData });
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure?",
      buttons: [
        { 
          label: "Yes", 
          onClick: () => {
            fetch(`${baseUrl}/product/${id}`, {
              method: "DELETE",
              headers: getHeaders()
            })
            .then(() => {
              queryClient.invalidateQueries(["products"]);
              refetch();
              toast.success("Product deleted");
            });
          }
        },
        { label: "No" }
      ]
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSelectedFiles([]);
    setExistingImages([]);
  };

  useEffect(() => {
    if (selectedProduct) {
      setExistingImages(selectedProduct.images || []);
    }
  }, [selectedProduct]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {isLoading ? (
          <Skeleton width={200} height={32} />
        ) : (
          <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        )}
        {["admin", "manager"].includes(authData.userRole) && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            + New Product
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {isLoading ? (
          <Skeleton containerClassName="w-full" height={40} />
        ) : (
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg"
          />
        )}
        {isLoading ? (
          <Skeleton containerClassName="w-full" height={40} />
        ) : (
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 rounded-lg"
          />
        )}
        {isLoading ? (
          <Skeleton containerClassName="w-full" height={40} />
        ) : (
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 rounded-lg"
          />
        )}
        {categoriesLoading || isLoading ? (
          <Skeleton containerClassName="w-full" height={40} />
        ) : (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">All Categories</option>
            {categories?.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => <TableSkeleton key={i} />)
            ) : data?.products?.map(product => (
              <tr key={product._id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {product.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={60}
                        height={60}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <span className="font-medium">{product.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.category?.name || '-'}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <FaEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t">
          {isLoading ? (
            <Skeleton width={200} />
          ) : (
            <span className="text-sm text-gray-700">
              Showing {data?.products?.length} of {data?.total} products
            </span>
          )}
          <div className="flex gap-2">
            {isLoading ? (
              <>
                <Skeleton width={80} height={36} />
                <Skeleton width={80} height={36} />
                <Skeleton width={80} height={36} />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton height={40} count={6} />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton height={40} />
              <Skeleton height={40} />
            </div>
            <Skeleton height={100} />
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, selectedProduct?._id)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                name="title"
                defaultValue={selectedProduct?.title}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                defaultValue={selectedProduct?.category?._id}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                {categories?.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                defaultValue={selectedProduct?.description}
                className="w-full p-2 border rounded"
                rows="3"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  name="price"
                  type="number"
                  defaultValue={selectedProduct?.price}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  name="stock"
                  type="number"
                  defaultValue={selectedProduct?.stock}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sizes</label>
              <div className="grid grid-cols-3 gap-2">
                {["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38","40","42","44"].map(size => (
                  <label key={size} className="flex items-center">
                    <input
                      type="checkbox"
                      name="sizes"
                      value={size}
                      defaultChecked={selectedProduct?.sizes?.includes(size)}
                      className="mr-2"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Colors (comma separated)</label>
              <input
                name="colors"
                defaultValue={selectedProduct?.colors?.join(", ")}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                name="tags"
                defaultValue={selectedProduct?.tags?.join(", ")}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Images</label>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="w-full p-2 border rounded"
                accept="image/*"
              />
              
              <div className="mt-4 flex flex-wrap gap-4">
                {existingImages.map((img, index) => (
                  <div key={`existing-${index}`} className="relative">
                    <Image
                      src={img}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded"
                      alt={`Existing ${index}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, true)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </div>
                ))}

                {selectedFiles.map((fileObj, index) => (
                  <div key={`new-${index}`} className="relative">
                    <Image
                      src={fileObj.preview}
                      className="w-24 h-24 object-cover rounded"
                      alt={`Preview ${index}`}
                      width={100}
                      height={100}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {selectedProduct ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        )}
      </ProductModal>
    </div>
  );
};

export default ProductManagement;
