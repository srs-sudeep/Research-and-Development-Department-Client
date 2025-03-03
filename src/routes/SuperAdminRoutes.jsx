import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

// dashboard routing
const AdminDashboard = lazyLoad(
  () => import('views/pages/superAdmin/AdminDashboard'),
)
const Analytics = lazyLoad(() => import('views/pages/superAdmin/Analytics'))
const AdminPayroles = lazyLoad(
  () => import('views/pages/superAdmin/AdminPayroles'),
)
//Project routing
const ProjectList = lazyLoad(() => import('views/pages/superAdmin/ProjectList'))
const RegisterProjectPage = lazyLoad(
  () => import('views/pages/superAdmin/RegisterProjectPage'),
)
const ProjectIndividual = lazyLoad(
  () => import('views/pages/superAdmin/ProjectIndividual'),
)

//Professor routing
const ProfessorList = lazyLoad(
  () => import('views/pages/superAdmin/ProfessorList'),
)
const RegisterProfessorPage = lazyLoad(
  () => import('views/pages/superAdmin/RegisterProfessorPage'),
)
const ProfessorIndividual = lazyLoad(
  () => import('views/pages/superAdmin/ProfessorIndividual'),
)

//Staff List
const StaffList = lazyLoad(() => import('views/pages/superAdmin/StaffList'))
const RegisterStaffPage = lazyLoad(
  () => import('views/pages/superAdmin/RegisterStaffPage'),
)
const StaffIndividual = lazyLoad(
  () => import('views/pages/superAdmin/StaffIndividual'),
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
        path: 'payrole',
        element: <AdminPayroles />,
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
          {
            path: ':id',
            element: <ProjectIndividual />,
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
          {
            path: ':id',
            element: <ProfessorIndividual />,
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
          {
            path: ':id',
            element: <StaffIndividual />,
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
