"use client";
import CategoryManagement from '@/components/layout/CategoryMangement';
import DashboardLayout from '@/components/layout/DashboarLayouts'
import React from 'react'

function CategoryPage() {
  return (
    <DashboardLayout>
<div>
  {/* CatalogPage */}
<CategoryManagement></CategoryManagement>

</div>
</DashboardLayout>
  )
}

export default CategoryPage