import {
  MdDashboard,
  MdOutlineHotel,
  MdRestaurant,
  MdPayment,
} from 'react-icons/md'
import { RiShoppingCartFill } from 'react-icons/ri'
import { FaUser, FaUsers } from 'react-icons/fa'
import { BsClipboardDataFill } from 'react-icons/bs'

const listMenu = [
  {
    to: '/dashboard',
    path: '/dashboard',
    icon: MdDashboard,
    name: 'Dashboard',
    role: [4],
  },
  {
    to: '/users',
    path: '/users',
    icon: FaUser,
    name: 'User',
    role: [1, 4],
    submenu: [
      {
        to: '/users/profile/*',
        path: '/users/profile/*',
        title: 'Profile',
      },
      {
        to: '/users/booking/',
        path: '/users/booking/',
        title: 'My Booking',
      },
      {
        to: '/users/myAccount',
        path: '/users/myAccount',
        title: 'My Account',
      },
    ],
  },
  {
    to: '/master',
    path: '/master',
    icon: BsClipboardDataFill,
    name: 'Master',
    role: [4],
    submenu: [
      {
        to: '/master/locations',
        path: '/master/locations',
        title: 'Locations',
      },
      {
        to: '/master/policy',
        path: '/master/policy',
        title: 'Policy',
      },
      {
        to: '/master/categorygroup',
        path: '/master/categorygroup',
        title: 'Category Group',
      },
      {
        to: '/master/priceitems',
        path: '/master/priceitems',
        title: 'Price Items',
      },
      {
        to: '/master/servicetask',
        path: '/master/servicetask',
        title: 'Service Task',
      },
    ],
  },
  {
    to: '/hotel',
    path: '/hotel',
    icon: MdOutlineHotel,
    name: 'Hotel',
    role: [4],
    submenu: [
      {
        to: '/hotel/hotels',
        path: '/hotel/hotels',
        title: 'Hotels',
      },
      {
        to: '/hotel/facilities-support',
        path: '/hotel/facilities-support',
        title: 'Facility Support',
      },
    ],
  },
  {
    to: '/resto',
    path: '/resto',
    icon: MdRestaurant,
    name: 'Resto',
    role: [4],
    submenu: [
      {
        to: '/resto/restoMenu',
        path: 'restoMenu',
        title: 'Resto Menu',
      },
      {
        to: '/resto/restoMenuPhotos',
        path: 'restoPhoto',
        title: 'Resto Photo',
      },
      {
        to: '/resto/orderMenu',
        path: 'orderMenu',
        title: 'Bill',
      },
    ],
  },
  {
    to: '/payment',
    path: '/payment',
    icon: MdPayment,
    name: 'Payment',
    role: [1, 4],
    submenu: [
      {
        to: '/payment/bank',
        path: '/payment/bank',
        title: 'Bank',
      },
      {
        to: '/payment/fintech',
        path: '/payment/fintech',
        title: 'Fintech',
      },
      {
        to: '/payment/accounts',
        path: '/payment/accounts',
        title: 'Accounts',
      },
      {
        to: '/payment/topup',
        path: '/payment/topup',
        title: 'Top Up',
      },
      {
        to: '/payment/transaction',
        path: '/payment/transaction',
        title: 'Transaction',
      },
    ],
  },
  {
    to: '/hr',
    path: '/hr',
    icon: FaUsers,
    name: 'Human Resources',
    role: [4],
    submenu: [
      {
        to: '/hr/department',
        path: '/hr/department',
        title: 'Department',
      },
      {
        to: '/hr/employee',
        path: '/hr/employee',
        title: 'Employee',
      },
      {
        to: '/hr/work_orders',
        path: '/hr/work_orders',
        title: 'Work Order',
      },
    ],
  },
  {
    to: '/purchasing',
    path: '/purchasing',
    icon: RiShoppingCartFill,
    name: 'Purchasing',
    role: [4],
    submenu: [
      {
        to: '/purchasing/vendor',
        path: '/purchasing/vendor',
        title: 'Vendor',
      },
      {
        to: '/purchasing/stock',
        path: '/purchasing/stock',
        title: 'Stock',
      },
      {
        to: '/purchasing/order',
        path: '/purchasing/order',
        title: 'Purchasing Order',
      },
    ],
  },
]

export default listMenu
