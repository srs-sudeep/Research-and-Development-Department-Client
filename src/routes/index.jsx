import useAuthValidation from 'core/Private/Private'
import { useRoutes } from 'react-router-dom'
import SuperAdminRoutes from './SuperAdminRoutes'
import StudentsRoutes from './StudentRoutes'
import ProfessorsRoutes from './ProfessorRoutes'
import StaffRoutes from './StaffRoutes'
import commonRoutes from './commonRoutes'

export default function Router() {
  useAuthValidation()
  const routes = useRoutes([
    ...SuperAdminRoutes,
    ...StudentsRoutes,
    ...commonRoutes,
    ...ProfessorsRoutes,
    ...StaffRoutes,
  ])

  return routes
}
