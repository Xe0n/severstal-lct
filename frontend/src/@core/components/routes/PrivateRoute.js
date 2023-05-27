// ** React Imports
import { Navigate } from "react-router-dom"
import { useContext, Suspense } from "react"

// ** Context Imports
import { AbilityContext } from "@src/utility/context/Can"
//** redux */
import { useSelector } from "react-redux"

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext)
  const isAuth = useSelector(state => state.user.isAuth)

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {
      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }
    if (!isAuth) {
      console.log('not auth go to login')
      return <Navigate to="/login" />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
