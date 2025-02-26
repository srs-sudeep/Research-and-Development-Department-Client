// assets
import {
    IconDashboard,
    IconUser, // Use a user icon for professor
    IconSchool, // You can use a school icon if available
  } from '@tabler/icons-react'
  
  // constant
  const icons = { IconDashboard, IconUser, IconSchool }
  
  // ==============================|| PROFESSOR DASHBOARD MENU ITEMS ||============================== //
  
  const projectSuperadmin = {
    id: 'project',
    title: 'Projects',
    type: 'group',
    children: [
      {
        id: 'projectlist',
        title: 'Project Lists',
        type: 'item',
        url: '/superadmin/project/list',
        icon: icons.IconUser, // You might want to change this to a different icon for professors
        breadcrumbs: false,
      },
      {
        id: 'registerproject',
        title: 'Register Project',
        type: 'item',
        url: '/superadmin/project/register',
        icon: icons.IconUser, // You might want to change this to a different icon for professors
        breadcrumbs: false,
      },
    ],
  }
  
  export default projectSuperadmin
  