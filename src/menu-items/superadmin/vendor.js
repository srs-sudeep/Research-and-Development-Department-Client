// assets
import {
  IconDashboard,
  IconTruck, // You can use a truck or delivery icon for vendor
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconTruck }

// ==============================|| VENDOR DASHBOARD MENU ITEMS ||============================== //

const vendorSuperadmin = {
  id: 'vendor',
  title: 'Vendors',
  type: 'group',
  children: [
    {
      id: 'vendorlist',
      title: 'Vendor Lists',
      type: 'item',
      url: '/superadmin/vendor/list',
      icon: icons.IconTruck,
      breadcrumbs: false,
    },
    {
      id: 'registervendor',
      title: 'Register Vendor',
      type: 'item',
      url: '/superadmin/vendor/register',
      icon: icons.IconTruck,
      breadcrumbs: false,
    },
  ],
}

export default vendorSuperadmin
