import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

// dashboard routing
const AdminDashboard = lazyLoad(
  () => import('views/pages/superAdmin/AdminDashboard'),
)
const Analytics = lazyLoad(() => import('views/pages/superAdmin/Analytics'))

//Project routing
const ProjectList = lazyLoad(
  () => import('views/pages/superAdmin/ProjectList'),
)
const RegisterProjectPage = lazyLoad(
  () => import('views/pages/superAdmin/RegisterProjectPage'),
)

//Professor routing
const ProfessorList = lazyLoad(
  () => import('views/pages/superAdmin/ProfessorList'),
)
const RegisterProfessorPage = lazyLoad(
  () => import('views/pages/superAdmin/RegisterProfessorPage'),
)

//Staff List
const StaffList = lazyLoad(() => import('views/pages/superAdmin/StaffList'))
const RegisterStaffPage = lazyLoad(
  () => import('views/pages/superAdmin/RegisterStaffPage'),
)

const Profile = lazyLoad(() => import('views/pages/superAdmin/Profile'))
import { Navigate } from 'react-router-dom'

// ==============================|| MAIN ROUTING ||============================== //

const SuperAdminRoutes = [
  {
    path: '/superadmin',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/superadmin/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'project',
        children: [
          {
            path: 'list',
            element: <ProjectList />,
          },
          {
            path: 'register',
            element: <RegisterProjectPage />,
          },
        ],
      },
      {
        path: 'professor',
        children: [
          {
            path: 'list',
            element: <ProfessorList />,
          },
          {
            path: 'register',
            element: <RegisterProfessorPage />,
          },
        ],
      },
      {
        path: 'staff',
        children: [
          {
            path: 'list',
            element: <StaffList />,
          },
          {
            path: 'register',
            element: <RegisterStaffPage />,
          },
        ],
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]

export default SuperAdminRoutes
