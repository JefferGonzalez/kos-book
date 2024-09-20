import Root from '@/Root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '*',
    Component: Root
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
