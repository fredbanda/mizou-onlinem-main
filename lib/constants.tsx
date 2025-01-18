import { LayoutDashboard, LayoutList, Boxes, Users, Truck } from "lucide-react";

export const navLinks = [
    {
        url: "/dashboard",
        icon: <LayoutDashboard />,
        label: "Dashboard",
    },
    {
        url: "/dashboard/collections",
        icon: <LayoutList />,
        label: "Collections",
    },
    {
        url: "/dashboard/products",
        icon: <Boxes />,
        label: "Products",
    },
    {
        url: "/dashboard/customers",
        icon: <Users />,
        label: "Customers",
    },

    {
        url: "/dashboard/orders",
        icon: <Truck />,        
        label: "Orders",
    }
    
    
]