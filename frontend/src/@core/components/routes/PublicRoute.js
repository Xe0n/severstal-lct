// ** React Imports
import { Suspense } from "react"
import { Navigate } from "react-router-dom"

//** redux */
import { useSelector } from "react-redux"

const PublicRoute = ({ children, route }) => {
  const user = useSelector(state => state.user.isAuth)
  console.log(user)
  if (route) {
    const restrictedRoute = route.meta && route.meta.restricted

    if (user && restrictedRoute) {
      console.log("Все не ок в паблике")
      return '/'
    } else {
      console.log("Все ок в паблике")
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
