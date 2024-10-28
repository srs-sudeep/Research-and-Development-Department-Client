// assets
import {
  IconDashboard,
  IconUser, // Use a user icon for staff
  IconSchool, // You can use a school icon if available
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconUser, IconSchool }

// ==============================|| STAFF DASHBOARD MENU ITEMS ||============================== //

const staffSuperadmin = {
  id: 'staff',
  title: 'Staff',
  type: 'group',
  children: [
    {
      id: 'stafflist',
      title: 'Staff Lists', // Change title to Staff Lists
      type: 'item',
      url: '/superadmin/staff/list',
      icon: icons.IconUser, // Use the same or a different icon for staff
      breadcrumbs: false,
    },
    {
      id: 'registerstaff',
      title: 'Register Staff', // Change title to Register Staff
      type: 'item',
      url: '/superadmin/staff/register',
      icon: icons.IconUser, // Use the same or a different icon for staff
      breadcrumbs: false,
    },
  ],
}

export default staffSuperadmin
