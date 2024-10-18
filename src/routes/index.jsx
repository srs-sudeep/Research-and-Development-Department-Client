import useAuthValidation from 'core/Private/Private'
import { useRoutes } from 'react-router-dom'
import SuperAdminRoutes from './SuperAdminRoutes'
import StudentsRoutes from './StudentRoutes'
import commonRoutes from './commonRoutes'

export default function Router() {
  useAuthValidation()
  const routes = useRoutes([
    ...SuperAdminRoutes,
    ...StudentsRoutes,
    ...commonRoutes,
  ])

  return routes
}
