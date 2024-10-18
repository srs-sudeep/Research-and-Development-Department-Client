// assets
import {
  IconDashboard,
  IconUser, // You might want to change this to a different icon for orders
  IconSchool, // You can use a school icon if available
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconUser, IconSchool }

// ==============================|| ORDERS DASHBOARD MENU ITEMS ||============================== //

const orders = {
  id: 'orders', // Updated ID
  title: 'Orders', // Updated title
  type: 'group',
  children: [
    {
      id: 'orderlist', // Updated ID for the item
      title: 'Order Lists', // Updated title for the item
      type: 'item',
      url: '/student/order', // Updated URL for orders
      icon: icons.IconUser, // You might want to change this to a different icon for orders
      breadcrumbs: false,
    },
  ],
}

export default orders
