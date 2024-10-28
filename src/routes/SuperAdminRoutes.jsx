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
const RegisterStudentPage = lazyLoad(
  () => import('views/pages/superAdmin/RegisterStudentPage'),
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

//Vendor Routing
const VendorList = lazyLoad(() => import('views/pages/superAdmin/VendorList'))
const RegisterVendorPage = lazyLoad(
  () => import('views/pages/superAdmin/RegisterVendorPage'),
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
        path: 'student',
        children: [
          {
            path: 'list',
            element: <StudentsList />,
          },
          {
            path: 'register',
            element: <RegisterStudentPage />,
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
        path: 'vendor',
        children: [
          {
            path: 'list',
            element: <VendorList />,
          },
          {
            path: 'register',
            element: <RegisterVendorPage />,
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
