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
    to: "/hotel",
    path: "/hotel",
    icon: MdOutlineHotel,
    name: "Hotel",
    submenu: [
      {
        to: "",
        path: "",
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
  {
    to: "",
    path: "",
    icon: MdPayment,
    name: "Payment",
    submenu: [
      {
        to: "/payment/bank",
        path: "/payment/bank",
        title: "Bank",
      },
      {
        to: "/payment/fintech",
        path: "/payment/fintech",
        title: "Fintech",
      },
      {
        to: "/payment/topup",
        path: "/payment/topup",
        title: "Top Up",
      },
      {
        to: "/payment/userAccount",
        path: "/payment/user-accounts",
        title: "Account",
      },
      {
        to: "/payment/paymentTransaction",
        path: "/payment/payment-transaction",
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
    to: "",
    path: "",
    icon: BsClipboardDataFill,
    name: "Master",
    submenu: [
      {
        to: "",
        path: "",
        title: "Location",
      },
      {
        to: "",
        path: "",
        title: "Policy",
      },
      {
        to: "",
        path: "",
        title: "Category",
      },
      {
        to: "",
        path: "",
        title: "Price",
      },
      {
        to: "",
        path: "",
        title: "Service",
      },
    ],
  },
  {
    to: "",
    path: "",
    icon: FaUser,
    name: "User",
    submenu: [
      {
        to: "",
        path: "",
        title: "Profil",
      },
      {
        to: "",
        path: "",
        title: "Booking",
      },
      {
        to: "",
        path: "",
        title: "Accaount",
      },
    ],
  },
];

export default listMenu;
