import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

const ProfessorDashboard = lazyLoad(
  () => import('views/pages/professors/ProfessorDashboard'),
)
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
        path: 'profile',
        element: <ProfessorProfile />,
      },
    ],
  },
]

export default ProfessorsRoutes
