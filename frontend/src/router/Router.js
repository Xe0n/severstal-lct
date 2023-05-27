import React, { lazy } from 'react'
// ** Router imports
import { useRoutes, Navigate } from "react-router-dom"

// ** GetRoutes
import { getRoutes } from "./routes"

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout"

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Redux
import { useSelector, useDispatch } from 'react-redux'
import { me } from '@store/user'
const Router = () => {
  // ** Components
  const Error = lazy(() => import('../views/Error'))
  const Login = lazy(() => import('../views/Login'))
  const NotAuthorized = lazy(() => import('../views/NotAuthorized'))
  const ForgotPassword = lazy(() => import('../views/ForgotPassword'))

  // ** Hooks
  const { layout } = useLayout()
  const allRoutes = getRoutes(layout)

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const loadingAuth = useSelector(state => state.user.loading)
  const token = localStorage.getItem('accessToken')

  React.useEffect(() => {
    if (token) {
      dispatch(me())
    } else {
      console.log('Нет токена')
    }
  }, [])
  
  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={'/home'} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  const noLogin = useRoutes([
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '/auth/forgot',
      element: <BlankLayout/>,
      children: [{path: '/auth/forgot', element: <ForgotPassword/>}]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Login /> }]
    }
  ])

  if (!loadingAuth && token) {
    if (isAuth) {
      console.log('роут1')
      return routes
    } else {
      console.log('роут2')
      return noLogin
    }
  }
  if (!token && token !== undefined) {
    return noLogin
  }
}

export default Router
