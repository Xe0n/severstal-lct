import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter
} from "reactstrap"
import Avatar from '@components/avatar'
import g from "../@core/assets/avatar/g.jpg"
import a from "../@core/assets/avatar/a.jpg"
import l from "../@core/assets/avatar/l.jpg"
import u from "../@core/assets/avatar/u.jpg"
const Contact = () => {

    return (
    <>
      <Card>
          <CardHeader>
            <CardTitle>Наши контакты</CardTitle>
          </CardHeader>
          <CardBody>
              <h5>Были рады стараться для вас!</h5>
              <ul className="list-unstyled">
                <div className='d-flex justify-content-left align-items-center'>
                    <Avatar img={g} color={`light-success`} content='@gesitnikov' initials /> 
                    <div className='d-flex flex-column p-1'>
                        <a href="https://t.me/gesitnikov" className='user_name text-truncate text-body'>
                            <span className='fw-bolder'>@gesitnikov</span>
                        </a>
                        <small className='text-truncate text-muted mb-0'>PM</small>
                    </div>
                </div>
                <div className='d-flex justify-content-left align-items-center'>
                    <Avatar img={a} color={`light-success`} content='@gesitnikov' initials /> 
                    <div className='d-flex flex-column p-1'>
                        <a href="https://t.me/artrsv" className='user_name text-truncate text-body'>
                            <span className='fw-bolder'>@artrsv</span>
                        </a>
                        <small className='text-truncate text-muted mb-0'>Frontend</small>
                    </div>
                </div>
                <div className='d-flex justify-content-left align-items-center'>
                    <Avatar img={u} color={`light-success`} content='@gesitnikov' initials /> 
                    <div className='d-flex flex-column p-1'>
                        <a href="https://t.me/TakhUsam" className='user_name text-truncate text-body'>
                            <span className='fw-bolder'>@TakhUsam</span>
                        </a>
                        <small className='text-truncate text-muted mb-0'>Backend</small>
                    </div>
                </div>
                <div className='d-flex justify-content-left align-items-center'>
                    <Avatar color={`light-success`} content='Н' initials /> 
                    <div className='d-flex flex-column p-1'>
                        <a href="https://t.me/LightDashing" className='user_name text-truncate text-body'>
                            <span className='fw-bolder'>@LightDashing</span>
                        </a>
                        <small className='text-truncate text-muted mb-0'>DS</small>
                    </div>
                </div>
                <div className='d-flex justify-content-left align-items-center'>
                    <Avatar img={l} color={`light-success`} content='Н' initials /> 
                    <div className='d-flex flex-column p-1'>
                        <a href="https://t.me/Liliconda" className='user_name text-truncate text-body'>
                            <span className='fw-bolder'>@Liliconda</span>
                        </a>
                        <small className='text-truncate text-muted mb-0'>DS</small>
                    </div>
                </div>
              
              </ul>
          </CardBody>
          <CardFooter>
            <a href="https://github.com/Xe0n/severstal-lct" target="_blank">GitHub</a>
          </CardFooter>
        </Card>
    </>
    )
}

export default Contact
