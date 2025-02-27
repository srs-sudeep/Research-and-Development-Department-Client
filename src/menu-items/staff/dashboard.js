// assets
import { IconDashboard } from '@tabler/icons-react'

// constant
const icons = { IconDashboard }

// ==============================|| STUDENT DASHBOARD MENU ITEMS ||============================== //

const staffDashboard = {
  id: 'staffDashboard',
  title: 'StaffDashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/staff/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: 'payrole',
      title: 'Payrole',
      type: 'item',
      url: '/staff/payrole',
      icon: icons.IconDashboard,
    },
  ],
}

export default staffDashboard
