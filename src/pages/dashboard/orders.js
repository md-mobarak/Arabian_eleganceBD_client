// import DashboardLayout from "../../components/DashboardLayout";
// import OrdersTable from "../../components/OrdersTable";
"use client";
import DashboardLayout from "@/components/layout/DashboarLayouts";
import OrderManagement from "@/components/layout/OrderManagement";
import OrderTable from "@/components/layout/OrderTable";

const OrdersPage = () => {
  return (

    <DashboardLayout>
      <OrderManagement></OrderManagement>
      </DashboardLayout>
  );
};

export default OrdersPage;
