// ** React Imports
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from "@components/avatar"

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power
} from "react-feather"

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap"

// ** Default Avatar Image
// import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"

import { useSelector, useDispatch } from 'react-redux'
import { userExit } from "@store/user"

const UserDropdown = () => {
  const dispatch = useDispatch()
  const me = useSelector(state => state.user.user)

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">Оператор демо</span>
          <span className="user-status">{me.email}</span>
        </div>
        <Avatar
          img="/favicon.ico"
          imgHeight="30"
          imgWidth="30"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={() => dispatch(userExit())}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Выход</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
