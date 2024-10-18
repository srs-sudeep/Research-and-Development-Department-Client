// import dashboard from './dashboard'
import dashboard from './superadmin/dashboard'
import studentSuperadmin from './superadmin/student'
import adminProfile from './superadmin/adminProfile'
import professorSuperadmin from './superadmin/professor'
import staffSuperadmin from './superadmin/staff'
import driver from './superadmin/vendor'
import beds from './hospital/beds'
import hospitalProfile from './hospital/hospitalProfile'
import operatorProfile from './operator/operatorProfile'
import other from './other'

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (role) => {
  switch (role) {
    case 'operator':
      return {
        items: [dashboard, operatorProfile],
      }
    case 'hospital':
      return {
        items: [dashboard, beds, hospitalProfile],
      }
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
    default:
      return {
        items: [other], // default or guest menu
      }
  }
}

export default menuItems
