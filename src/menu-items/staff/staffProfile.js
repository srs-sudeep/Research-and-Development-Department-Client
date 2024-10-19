// assets
import { IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUser }

// ==============================|| STUDENT PROFILE MENU ITEMS ||============================== //

const staffProfile = {
  id: 'staffProfile', // Updated ID
  title: 'STAFF PROFILE', // Updated title
  type: 'group',
  children: [
    {
      id: 'staffProfile', // Updated child item ID
      title: 'Staff Profile', // Updated title for the item
      type: 'item',
      url: '/staff/profile', // Keep the URL the same or change if needed
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
}

export default staffProfile
