import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import Login from '../pages/Login'
import RouteGuard from '../components/RouteGuard'
import Error from '../pages/Error'

const Path = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            //making a route guard for Dashboard
            <RouteGuard>
              <Dashboard />
            </RouteGuard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Loading Error page if client goes to unexist page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default Path
