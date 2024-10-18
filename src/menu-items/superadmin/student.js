// assets
import {
  IconDashboard,
  IconUser, // You might want to use a user icon here
  IconSchool, // You can use a school icon if available
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconUser, IconSchool }

// ==============================|| STUDENT DASHBOARD MENU ITEMS ||============================== //

const studentSuperadmin = {
  id: 'student',
  title: 'Students',
  type: 'group',
  children: [
    {
      id: 'studentlist',
      title: 'Student Lists',
      type: 'item',
      url: '/superadmin/student/list',
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
}

export default studentSuperadmin
