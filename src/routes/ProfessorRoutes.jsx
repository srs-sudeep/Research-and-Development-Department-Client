import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

const ProfessorDashboard = lazyLoad(
  () => import('views/pages/professors/ProfessorDashboard'),
)
const AttendancePage = lazyLoad(
  () => import('views/pages/professors/AttendancePage'),
)
const ProductList = lazyLoad(() => import('views/pages/common/ProductList'))
const OrderList = lazyLoad(() => import('views/pages/common/OrderList'))
const ProfessorProfile = lazyLoad(
  () => import('views/pages/professors/Profile'),
)
import { Navigate } from 'react-router-dom'

// ==============================|| STUDENTS ROUTING ||============================== //

const ProfessorsRoutes = [
  {
    path: '/professor',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/professor/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <ProfessorDashboard />,
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
        element: <ProfessorProfile />,
      },
    ],
  },
]

export default ProfessorsRoutes
