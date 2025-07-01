"use client";
import React from 'react'
import DashboardLayout from "@/components/layout/DashboarLayouts";
import Profile from '@/components/layout/Profile';

function ManageProfilePage() {
  return (
   
     <DashboardLayout>
 
   <div>
     <Profile></Profile>
   </div>

    </DashboardLayout>
  )
}

export default ManageProfilePage
