// assets
import {
  IconDashboard,
  IconUser, // Use a user icon for professor
  IconSchool, // You can use a school icon if available
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconUser, IconSchool }

// ==============================|| PROFESSOR DASHBOARD MENU ITEMS ||============================== //

const professorSuperadmin = {
  id: 'professor',
  title: 'Professors',
  type: 'group',
  children: [
    {
      id: 'professorlist',
      title: 'Professor Lists',
      type: 'item',
      url: '/superadmin/professor/list',
      icon: icons.IconUser, // You might want to change this to a different icon for professors
      breadcrumbs: false,
    },
    {
      id: 'registerprofessor',
      title: 'Register Professor',
      type: 'item',
      url: '/superadmin/professor/register',
      icon: icons.IconUser, // You might want to change this to a different icon for professors
      breadcrumbs: false,
    },
  ],
}

export default professorSuperadmin
