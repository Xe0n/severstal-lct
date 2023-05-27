//** React */
import React from 'react'
//** Redux */
import { useDispatch, useSelector } from 'react-redux'
import { tryLogin, me } from '@store/user'

// ** React Imports
import { Link, Navigate } from 'react-router-dom'

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, Badge } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'


const LoginBasic = () => {
  const [userEmail, setUserEmal] = React.useState('admin@mail.ru')
  const [userPassword, setUserPassword] = React.useState('admin')
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user.isAuth)
  const authError = useSelector(state => state.user.error)

  const auth = async (e) => {
    e.preventDefault()
    await dispatch(tryLogin({ userEmail, userPassword }))
    await dispatch(me())
  }

  if (userData && localStorage.getItem('accessToken')) {
    console.log('redirect to /')
    return (<Navigate to="/" replace />)
  }
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src={require("@src/assets/images/logo/Severstal_Logo_CYR_Blue_RGB.png").default} className="img-fluid" alt="" />
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Добро пожаловать! 👋
            </CardTitle>
            <CardText className='mb-2'>Пожалуйста войдите в ваш аккаунт, аккаунт предоставляется администратором</CardText>
            <Form className='auth-login-form mt-2' onSubmit={(e) => auth(e)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email' placeholder='john@example.com' autoFocus value={userEmail} onChange={(e) => setUserEmal(e.target.value)} />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Пароль
                  </Label>
                </div>
                <InputPasswordToggle className='input-group-merge' id='login-password'value={userPassword}  onChange={(e) => setUserPassword(e.target.value)} />
              </div>
              <Button color='primary' block>
                Войти
              </Button>
            </Form>
            {authError &&
                <Badge pill color='danger' className='d-block mt-2'>
                  <span>{authError}</span>
                </Badge>
              }
            <p className='text-center mt-2'>
              Демо-доступ: admin@mail.ru / admin
            </p>
      
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginBasic
