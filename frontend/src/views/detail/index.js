import React from 'react'
import $api from '../../http'
import { useParams } from 'react-router-dom'

import SimpleLineChart from '../charts/LineCharts'
import { Card, CardHeader, CardBody, Row, Col, Form, Input, Label, Spinner } from 'reactstrap'

import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/charts/recharts.scss'
const Detail = () => {
    const id = useParams()
    console.log(id.id)
    const [data, setData] = React.useState([])
    const [partList, setPartList] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [currentPart, setCurrentPart] = React.useState()
    const getData = async (start = '2023-05-24T07:50:00.0003', end = '2023-05-30T11:50:00.0003') => {
      setLoading(true)
      const resp = await $api(`api/wear/exhauster/${id.id}/?startDate=${start}&endDate=${end}`)
      // const dataObject = JSON.parse(resp.data.statistics)
      setData(resp.data.statistics)
      setLoading(false)
    }
    React.useEffect(() => {
      getData()
    }, [])
    React.useEffect(() => {
      if (data.length > 0) {
        setPartList(Object.keys(data[1]))
      }
    }, [data])
    console.log(data)
  return (
    <>
    <Row>
      <Col md={2}>
        <Card className='p-2'>
        {!loading ? <Form onChange={(e) => setCurrentPart(e.target.value) }>
          {partList?.map(item => {
            if (item !== 'id' && item !== 'date') {
              return (
                <div className='demo-inline-spacing' key={item}>
                  <div className='form-check form-check-inline'>
                    <Input type='radio' name='ex1' id={item} value={item}/>
                    <Label for={item} className='form-check-label break-word'>
                      {item}
                    </Label>
                  </div>
                </div>
              )
            }
          }
         )}

          </Form> : <Spinner/>}
        </Card>
      </Col>
      <Col md={10}>
         <Card>
          <CardHeader>
            <div className='d-flex align-items-center'>
              <Calendar size={15} />
              <Flatpickr
                className='form-control flat-picker bg-transparent border-0 shadow-none'
                options={{
                  mode: 'range',
                  // eslint-disable-next-line no-mixed-operators
                  defaultDate: ['2023-05-24T07:50:00.0003', '2023-05-30T11:50:00.0003'],
                  onClose: (selectedDates) => {
                    const startDate = new Date(selectedDates[0].getTime() - (selectedDates[0].getTimezoneOffset() * 60 * 1000)).toISOString()
                    const endDate = new Date(selectedDates[1].getTime() - (selectedDates[0].getTimezoneOffset() * 60 * 1000)).toISOString()
                    getData(startDate, endDate)
                  }
                }}
              />
            </div>
          </CardHeader>
          <CardBody>
            {!loading ? <SimpleLineChart warning={'red'} data={data} target={currentPart}/> : <Spinner/>}
          </CardBody>
        </Card>
      </Col>
    </Row>
     
    </>
  )
}   

export default Detail
