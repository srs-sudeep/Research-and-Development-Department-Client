// import dashboard from './dashboard'
import adminProfile from './superadmin/adminProfile'
import dashboard from './superadmin/dashboard'
import professorSuperadmin from './superadmin/professor'
import staffSuperadmin from './superadmin/staff'
import studentSuperadmin from './superadmin/student'
import driver from './superadmin/vendor'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (role) => {
  switch (role) {
    case 'superadmin':
      return {
        items: [
          dashboard,
          studentSuperadmin,
          professorSuperadmin,
          staffSuperadmin,
          driver,
          adminProfile,
        ],
      }
  }
}

export default menuItems
