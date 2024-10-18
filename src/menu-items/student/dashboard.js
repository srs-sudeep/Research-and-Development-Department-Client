// assets
import { IconDashboard } from '@tabler/icons-react'

// constant
const icons = { IconDashboard }

// ==============================|| STUDENT DASHBOARD MENU ITEMS ||============================== //

const studentdashboard = {
  id: 'studentdashboard',
  title: 'StudentDashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/student/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
  ],
}

export default studentdashboard
