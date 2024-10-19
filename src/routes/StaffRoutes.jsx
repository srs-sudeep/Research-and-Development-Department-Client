import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

const StaffDashboard = lazyLoad(
  () => import('views/pages/staff/StaffDashboard'),
)
const AttendancePage = lazyLoad(
  () => import('views/pages/staff/AttendancePage'),
)
const ProductList = lazyLoad(() => import('views/pages/common/ProductList'))
const OrderList = lazyLoad(() => import('views/pages/common/OrderList'))
const StaffProfile = lazyLoad(() => import('views/pages/staff/Profile'))
import { Navigate } from 'react-router-dom'

// ==============================|| STUDENTS ROUTING ||============================== //

const StaffRoutes = [
  {
    path: '/staff',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/staff/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <StaffDashboard />,
      },
      {
        path: 'attendance',
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
        element: <StaffProfile />,
      },
    ],
  },
]

export default StaffRoutes
