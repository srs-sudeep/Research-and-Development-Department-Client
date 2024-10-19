// assets
import { IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUser }

// ==============================|| STUDENT PROFILE MENU ITEMS ||============================== //

const professorProfile = {
  id: 'professorProfile', // Updated ID
  title: 'PROFESSOR PROFILE', // Updated title
  type: 'group',
  children: [
    {
      id: 'professorProfile', // Updated child item ID
      title: 'Professor Profile', // Updated title for the item
      type: 'item',
      url: '/professor/profile', // Keep the URL the same or change if needed
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
}

export default professorProfile
