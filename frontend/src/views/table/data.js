// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonDropdown } from 'reactstrap'

// ** Vars


const status = {
  1: { title: 'В работе', color: 'light-primary' },
  2: { title: 'Professional', color: 'light-success' },
  3: { title: 'Опасно', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
}
const agloMap = {
  1: {
    name: 'Эксгаустер №7'
  },
  2: {
    name: 'Эксгаустер №5'
  },
  3: {
    name: 'Эксгаустер №9'
  },
  4: {
    name: 'Эксгаустер №8'
  },
  5: {
    name: 'Эксгаустер №4'
  },
  6: {
    name: 'Эксгаустер №6'
  }
}

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='fw-bold'>ПС1:</span> {data.city}
      </p>
      <p>
        <span className='fw-bold'>ПС2:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='fw-bold'>ПС3:</span> {data.post}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = [
  {
    name: 'Наименование',
    minWidth: '250px',
    sortable: row => row.name,
    cell: row => (
      <div className='d-flex align-items-center'>
          <Avatar color={`light-success`} content={row.name} initials />
        <div className='user-info text-truncate ms-1'>
          <span className='d-block fw-bold text-truncate'>{agloMap[row.id].name}</span>
          <small>{row.post}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Описание',
    selector: row => row.description
  },
  {
    name: 'Статус',
    minWidth: '150px',
    cell: () => {
      return (
        <Badge color={status[1].color} pill>
          {status[1].title}
        </Badge>
      )
    }
  },
  {
    name: 'Открыть',
    cell: row => {
      return (
        <Link to={`/detail/${row.id}`}>
          <Button>Открыть</Button>
        </Link>
      )
    }
  }
]

// ** Table Intl Column
export const multiLingColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: row => row.full_name
  },
  {
    name: 'Position',
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: row => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '150px',
    selector: row => row.salary
  },
  {
    name: 'Status',
    sortable: true,
    minWidth: '150px',
    selector: row => row.status,
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: () => {
      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span'>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>
                <FileText size={15} />
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem>
                <Archive size={15} />
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem>
                <Trash size={15} />
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      )
    }
  }
]

// ** Table Server Side Column
export const serverSideColumns = [
  {
    sortable: true,
    name: 'Full Name',
    minWidth: '225px',
    selector: row => row.full_name
  },
  {
    sortable: true,
    name: 'Email',
    minWidth: '250px',
    selector: row => row.email
  },
  {
    sortable: true,
    name: 'Position',
    minWidth: '250px',
    selector: row => row.post
  },
  {
    sortable: true,
    name: 'Office',
    minWidth: '150px',
    selector: row => row.city
  },
  {
    sortable: true,
    name: 'Start Date',
    minWidth: '150px',
    selector: row => row.start_date
  },
  {
    sortable: true,
    name: 'Salary',
    minWidth: '150px',
    selector: row => row.salary
  }
]

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Name',
    sortable: true,
    minWidth: '200px',
    selector: row => row.full_name
  },
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  },
  {
    name: 'Post',
    sortable: true,
    minWidth: '250px',
    selector: row => row.post
  },
  {
    name: 'City',
    sortable: true,
    minWidth: '150px',
    selector: row => row.city
  },
  {
    name: 'Date',
    sortable: true,
    minWidth: '150px',
    selector: row => row.start_date
  },

  {
    name: 'Salary',
    sortable: true,
    minWidth: '100px',
    selector: row => row.salary
  }
]

export default ExpandableTable
