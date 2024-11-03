// assets
import {
  IconDashboard,
  IconUser, // You might want to use a user icon here
  IconSchool, // You can use a school icon if available
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconUser, IconSchool }

// ==============================|| PRODUCT MENU ITEMS ||============================== //

const messTransaction = {
  id: 'messTransaction', // Updated ID
  title: 'Mess Transactions', // Updated title
  type: 'group',
  children: [
    {
      id: 'messTransaction', // Updated child item ID
      title: 'Mess Transactions', // Updated title for the item
      type: 'item',
      url: '/student/messTransaction', // Updated URL for product
      icon: icons.IconSchool, // You can keep this or choose a more relevant icon
      breadcrumbs: false,
    },
  ],
}

export default messTransaction
