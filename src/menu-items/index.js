// import dashboard from './dashboard'
import adminProfile from './superadmin/adminProfile'
import dashboard from './superadmin/dashboard'
import professorSuperadmin from './superadmin/professor'
import staffSuperadmin from './superadmin/staff'
import studentSuperadmin from './superadmin/student'
import driver from './superadmin/vendor'
import studentdashboard from './student/dashboard'
import attendance from './student/attendance'
import orders from './student/orders'
import product from './student/product'
import studentProfile from './student/studentProfile'
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
    case 'student':
      return {
        items: [studentdashboard, product, orders, attendance, studentProfile],
      }
  }
}

export default menuItems
