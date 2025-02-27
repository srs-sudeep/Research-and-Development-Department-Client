// assets
import { IconDashboard } from '@tabler/icons-react'

// constant
const icons = { IconDashboard }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'superadmindashboard',
  title: 'SuperAdminDashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/superadmin/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: 'analysis',
      title: 'Analytics',
      type: 'item',
      url: '/superadmin/analytics',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: 'payrole',
      title: 'Payrole',
      type: 'item',
      url: '/superadmin/payrole',
      icon: icons.IconDashboard,
    },
  ],
}

export default dashboard
