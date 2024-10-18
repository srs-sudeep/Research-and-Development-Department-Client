import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

// dashboard routing
const DashboardDefault = lazyLoad(() => import('views/dashboard'))

//Hospital routing
const Profile = lazyLoad(() => import('views/pages/Operator/Profile'))

import { Navigate } from 'react-router-dom'

// ==============================|| MAIN ROUTING ||============================== //

const OperatorRoutes = [
  {
    path: '/operator',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/hospital/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <DashboardDefault />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]

export default OperatorRoutes
