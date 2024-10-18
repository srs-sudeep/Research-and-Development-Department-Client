// assets
import { IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUser }

// ==============================|| STUDENT PROFILE MENU ITEMS ||============================== //

const studentProfile = {
  id: 'studentProfile', // Updated ID
  title: 'STUDENT PROFILE', // Updated title
  type: 'group',
  children: [
    {
      id: 'studentProfile', // Updated child item ID
      title: 'Student Profile', // Updated title for the item
      type: 'item',
      url: '/student/profile', // Keep the URL the same or change if needed
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
}

export default studentProfile
