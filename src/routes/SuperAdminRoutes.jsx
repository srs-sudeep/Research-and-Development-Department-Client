import lazyLoad from 'core/utils/lazyLoad'

// project imports
import MainLayout from 'layout/MainLayout'

// dashboard routing
const AdminDashboard = lazyLoad(
  () => import('views/pages/superAdmin/AdminDashboard'),
)

// Student routing
const StudentsList = lazyLoad(
  () => import('views/pages/superAdmin/StudentsList'),
)
const StudentRegister = lazyLoad(
  () => import('views/pages/superAdmin/StudentRegister'),
)

//Professor routing
const ProfessorList = lazyLoad(
  () => import('views/pages/superAdmin/ProfessorList'),
)

//Staff List
const StaffList = lazyLoad(() => import('views/pages/superAdmin/StaffList'))

//Vendor Routing
const VendorList = lazyLoad(() => import('views/pages/superAdmin/VendorList'))
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
        path: 'student',
        children: [
          {
            path: 'list',
            element: <StudentRegister />,
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
        ],
      },
      {
        path: 'staff',
        children: [
          {
            path: 'list',
            element: <StaffList />,
          },
        ],
      },
      {
        path: 'vendor',
        children: [
          {
            path: 'list',
            element: <VendorList />,
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
