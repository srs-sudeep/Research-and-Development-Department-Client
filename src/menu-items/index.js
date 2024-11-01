// import dashboard from './dashboard'
import profAttendance from './professor/attendance'
import professorDashboard from './professor/dashboard'
import profOrders from './professor/orders'
import profProduct from './professor/product'
import professorProfile from './professor/professorProfile'
import staffAttendance from './staff/attendance'
import staffDashboard from './staff/dashboard'
import staffOrders from './staff/orders'
import staffProduct from './staff/product'
import staffProfile from './staff/staffProfile'
import attendance from './student/attendance'
import studentdashboard from './student/dashboard'
import orders from './student/orders'
import product from './student/product'
import messTransaction from './student/messTransaction'
import studentProfile from './student/studentProfile'
import adminProfile from './superadmin/adminProfile'
import dashboard from './superadmin/dashboard'
import professorSuperadmin from './superadmin/professor'
import staffSuperadmin from './superadmin/staff'
import studentSuperadmin from './superadmin/student'
import vendor from './superadmin/vendor'

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
          vendor,
          adminProfile,
        ],
      }
    case 'student':
      return {
        items: [studentdashboard, messTransaction, product, orders, attendance, studentProfile],
      }
    case 'professor':
      return {
        items: [
          professorDashboard,
          profProduct,
          profOrders,
          profAttendance,
          professorProfile,
        ],
      }
    case 'staff':
      return {
        items: [
          staffDashboard,
          staffProduct,
          staffOrders,
          staffAttendance,
          staffProfile,
        ],
      }
  }
}

export default menuItems
