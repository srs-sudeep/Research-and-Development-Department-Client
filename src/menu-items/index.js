import professorDashboard from './professor/dashboard'
import professorProfile from './professor/professorProfile'
import staffDashboard from './staff/dashboard'
import staffProfile from './staff/staffProfile'
import adminProfile from './superadmin/adminProfile'
import dashboard from './superadmin/dashboard'
import professorSuperadmin from './superadmin/professor'
import staffSuperadmin from './superadmin/staff'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (role) => {
  switch (role) {
    case 'superadmin':
      return {
        items: [dashboard, professorSuperadmin, staffSuperadmin, adminProfile],
      }
    case 'professor':
      return {
        items: [professorDashboard, professorProfile],
      }
    case 'staff':
      return {
        items: [staffDashboard, staffProfile],
      }
  }
}

export default menuItems
