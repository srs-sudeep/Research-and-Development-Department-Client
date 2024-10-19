// assets
import {
  IconDashboard,
  IconUser, // You might want to use a user icon here
  IconSchool, // You can use a school icon if available
} from '@tabler/icons-react'

// constant
const icons = { IconDashboard, IconUser, IconSchool }

// ==============================|| ATTENDANCE MENU ITEMS ||============================== //

const staffAttendance = {
  id: 'staffAttendance', // Updated ID
  title: 'Attendance', // Updated title
  type: 'group',
  children: [
    {
      id: 'attendancelist',
      title: 'Attendance List', // Updated title for the item
      type: 'item',
      url: '/staff/attendance', // Updated URL for attendance
      icon: icons.IconSchool, // You might want to use a school icon here
      breadcrumbs: false,
    },
  ],
}

export default staffAttendance
