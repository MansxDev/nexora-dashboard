import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { appRoutes } from './routes'

export default function App() {
  return <RouterProvider router={createBrowserRouter(appRoutes)} />
}
