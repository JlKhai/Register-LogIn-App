import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const RouteGuard = ({ children }) => {
  const token = Cookies.get('token')

  //if TOKEN is exist the route gose to Children if not go to LOGIN route
  if (token) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}

export default RouteGuard
