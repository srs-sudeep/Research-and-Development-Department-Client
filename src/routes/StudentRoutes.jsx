import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'
import { element } from 'prop-types'

// students routing
const StudentDashboard = lazyLoad(
  () => import('views/pages/students/StudentDashboard'),
)
const AttendancePage = lazyLoad(
  () => import('views/pages/students/AttendancePage'),
)
const ProductList = lazyLoad(() => import('views/pages/common/ProductList'))
const OrderList = lazyLoad(() => import('views/pages/common/OrderList'))
const StudentProfile = lazyLoad(() => import('views/pages/students/Profile'))
import { Navigate } from 'react-router-dom'
import MessTransaction from 'views/pages/students/MessTransaction'

// ==============================|| STUDENTS ROUTING ||============================== //

const StudentsRoutes = [
  {
    path: '/student',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/student/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <StudentDashboard />,
      },
      {
        path: 'messTransaction',
        element: <MessTransaction />,
      },
      {
        path: 'attendance',
        element: <AttendancePage />,
      },
      {
        path: 'visitlogs',
        element: <AttendancePage />,
      },
      {
        path: 'product',
        element: <ProductList />,
      },
      {
        path: 'order',
        element: <OrderList />,
      },
      {
        path: 'profile',
        element: <StudentProfile />,
      },
    ],
  },
]

export default StudentsRoutes
