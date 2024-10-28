// assets
import { IconUser } from '@tabler/icons-react'

// constant
const icons = { IconUser }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const adminProfile = {
  id: 'adminProfile',
  title: 'Admin Profile',
  type: 'group',
  children: [
    {
      id: 'admin Profile',
      title: 'Admin Profile',
      type: 'item',
      url: '/superadmin/profile',
      icon: icons.IconUser,
      breadcrumbs: false,
    },
  ],
}

export default adminProfile
