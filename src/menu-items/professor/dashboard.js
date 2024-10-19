// assets
import { IconDashboard } from '@tabler/icons-react'

// constant
const icons = { IconDashboard }

// ==============================|| STUDENT DASHBOARD MENU ITEMS ||============================== //

const professorDashboard = {
  id: 'professorDashboard',
  title: 'ProfessorDashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/professor/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
  ],
}

export default professorDashboard
