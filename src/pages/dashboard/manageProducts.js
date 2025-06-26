// "use client";
// import DashboardLayout from '@/components/layout/DashboarLayouts'
// import ProductManagement from '@/components/layout/ProductManagement';
// import React from 'react'

// function ManageProductsPage() {
//   return (
//     <DashboardLayout>
// <div>ManageProducts

// <ProductManagement></ProductManagement>
// </div>
// </DashboardLayout>
//   )
// }

// export default ManageProductsPage


"use client";

import DashboardLayout from "@/components/layout/DashboarLayouts";
import ProductManagement from "@/components/layout/ProductManagement";
import React from "react";
// import DashboardLayout from "@/components/layout/DashboardLayouts";
// import ProductManagement from "@/components/layout/ProductManagement";

export default function ManageProductsPage() {
  return (
    <DashboardLayout>
      <div className="">
        <ProductManagement />
      </div>
    </DashboardLayout>
  );
}
