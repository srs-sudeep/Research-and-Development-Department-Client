// assets
import {
  IconDashboard,
  IconUser, // You might want to use a user icon here
  IconSchool, // You can use a school icon if available
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconUser, IconSchool }

// ==============================|| PRODUCT MENU ITEMS ||============================== //

const product = {
  id: 'product', // Updated ID
  title: 'Product', // Updated title
  type: 'group',
  children: [
    {
      id: 'productlist', // Updated child item ID
      title: 'Product List', // Updated title for the item
      type: 'item',
      url: '/student/product', // Updated URL for product
      icon: icons.IconSchool, // You can keep this or choose a more relevant icon
      breadcrumbs: false,
    },
  ],
}

export default product
