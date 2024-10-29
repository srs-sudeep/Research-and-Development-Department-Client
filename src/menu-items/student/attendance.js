// assets
import {
  IconDashboard,
  IconUser, // You might want to use a user icon here
  IconSchool, // You can use a school icon if available
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconUser, IconSchool }

var program = null
try {
  program = localStorage.getItem('program')
} catch (error) {
  console.error('Failed to get program value:', error)
}

const hasVisitLogs =
  program === 'M.Tech' || program === 'M.Sc' || program === 'PhD'

// ==============================|| ATTENDANCE MENU ITEMS ||============================== //

const attendance = {
  id: 'attendance', // Updated ID
  title: 'Attendance', // Updated title
  type: 'group',
  children: [
    {
      id: 'attendancelist',
      title: 'Attendance List', // Updated title for the item
      type: 'item',
      url: '/student/attendance', // Updated URL for attendance
      icon: icons.IconSchool, // You might want to use a school icon here
      breadcrumbs: false,
    },
    hasVisitLogs && {
      id: 'student-visitlogs',
      title: 'Visit Logs',
      type: 'item',
      url: '/student/visitlogs',
      icon: icons.IconSchool,
      breadcrumbs: false,
    },
  ].filter(Boolean),
}

export default attendance
