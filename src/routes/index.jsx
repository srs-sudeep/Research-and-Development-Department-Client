import useAuthValidation from 'core/Private/Private'
import { useRoutes } from 'react-router-dom'
import SuperAdminRoutes from './SuperAdminRoutes'
import ProfessorsRoutes from './ProfessorRoutes'
import StaffRoutes from './StaffRoutes'
import commonRoutes from './commonRoutes'

export default function Router() {
  useAuthValidation()
  const routes = useRoutes([
    ...SuperAdminRoutes,
    ...commonRoutes,
    ...ProfessorsRoutes,
    ...StaffRoutes,
  ])

  return routes
}
