import {
  MdDashboard,
  MdOutlineHotel,
  MdRestaurant,
  MdPayment,
} from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaUser, FaUsers } from "react-icons/fa";
import { BsClipboardDataFill } from "react-icons/bs";

const listMenu = [
  {
    to: "/dashboard",
    path: "/dashboard",
    icon: MdDashboard,
    name: "Dashboard",
  },
  {
    to: "",
    path: "",
    icon: FaUser,
    name: "User",
    submenu: [
      {
        to: "/user/profile/:id",
        path: "/user/profile/:id",
        title: "Profile",
      },
      {
        to: "",
        path: "",
        title: "My Booking",
      },
      {
        to: "",
        path: "",
        title: "My Account",
      },
    ],
  },
  {
    to: "",
    path: "",
    icon: BsClipboardDataFill,
    name: "Master",
    submenu: [
      {
        to: "/master/locations",
        path: "/master/locations",
        title: "Locations",
      },
      {
        to: "/master/policy",
        path: "/master/policy",
        title: "Policy",
      },
      {
        to: "/master/category",
        path: "/master/category",
        title: "Category Group",
      },
      {
        to: "/master/priceitems",
        path: "/master/priceitems",
        title: "Price Items",
      },
      {
        to: "/master/servicetask",
        path: "/master/servicetask",
        title: "Service Task",
      },
    ],
  },
  {
    to: "/hotel",
    path: "/hotel",
    icon: MdOutlineHotel,
    name: "Hotel",
    submenu: [
      {
        to: "/hotel/hotels",
        path: "/hotel/hotels",
        title: "Hotel",
      },
      {
        to: "",
        path: "",
        title: "Facilities",
      },
      {
        to: "",
        path: "",
        title: "Reviews",
      },
    ],
  },
  {
    to: "",
    path: "",
    icon: MdRestaurant,
    name: "Resto",
    submenu: [
      {
        to: "",
        path: "",
        title: "Resto Menu",
      },
    ],
  },
  {
    to: "",
    path: "",
    icon: MdPayment,
    name: "Payment",
    submenu: [
      {
        to: "",
        path: "",
        title: "Bank",
      },
      {
        to: "",
        path: "",
        title: "Fintech",
      },
      {
        to: "",
        path: "",
        title: "Accounts",
      },
      {
        to: "",
        path: "",
        title: "Top Up",
      },
      {
        to: "",
        path: "",
        title: "Transaction",
      },
    ],
  },
  {
    to: "",
    path: "#",
    icon: FaUsers,
    name: "Human Resources",
    submenu: [
      {
        to: "/hr/department",
        path: "/hr/department",
        title: "Department",
      },
      {
        to: "/hr/employee",
        path: "/hr/employee",
        title: "Employee",
      },
      {
        to: "/hr/workorder",
        path: "/hr/workorder",
        title: "Work Order",
      },
    ],
  },
  {
    to: "#",
    path: "#",
    icon: RiShoppingCartFill,
    name: "Purchasing",
    submenu: [
      {
        to: "",
        path: "",
        title: "Vendor",
      },
      {
        to: "",
        path: "",
        title: "Stock",
      },
      {
        to: "",
        path: "",
        title: "Purchasing Order",
      },
    ],
  },
];

export default listMenu;
