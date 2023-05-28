import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Spinner
} from "reactstrap"
import $api from '../http'
import DataTableWithButtons from "./table/DataTableWithButtons"
import Flatpickr from 'react-flatpickr'
import SimpleLineChart from './charts/LineCharts'
import { Calendar } from 'react-feather'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/charts/recharts.scss'
const Home = () => {
  const [aglo, setAglo] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const getAglo = async () => {
    setLoading(true)
    const resp = await $api.get('/api/wear/exhauster/')
    setAglo(resp.data)
    console.log(aglo)
    setLoading(false)
  }
  console.log(loading)
  React.useEffect(() => {
    getAglo()
  }, [])
  // const [data, setData] = React.useState([])
  // const getData = async (start = '2023-05-24T07:50:00.0003', end = '2023-05-30T11:50:00.0003') => {
  //   setLoading(true)
  //   const resp = await $api(`api/wear/exhauster/1/?startDate=${start}&endDate=${end}`)
 
  //   const parsedArray = resp.data.statistics.map(obj => {
  //     const parsedObj = {}
  //     for (const key in obj) {
  //       if (obj.hasOwnProperty(key)) {
  //         try {
  //           parsedObj[key] = JSON.parse(obj[key])
  //         } catch (error) {
  //           parsedObj[key] = obj[key] // сохранить значение как есть, если не является JSON
  //         }
  //       }
  //     }
  //     return parsedObj
  //   })

  //   console.log(parsedArray.filter(function(item) {
  //     return Object.values(item).some(function(value) {
  //       return value.value === 1
  //     })
  //   }).map(function(item) {
  //     const newItem = {}
  //     Object.keys(item).forEach(function(key) {
  //       if (item[key].value === 3) {
  //         newItem[key] = item[key]
  //       }
  //     })
  //     return newItem
  //   })
  // )
  //   setData(parsedArray)
  //   setLoading(false)
  // }
  // React.useEffect(() => {
  //   getData()
  // }, [])
  // console.log(data)

  // console.log(loading)
  return (
    <div>
      {/* <Card>
        <CardHeader>
          <Row>
           <CardTitle> 
              Прогнозы модели на основе исторических данных <br />
              <small>Выберите диапазон</small>

            </CardTitle>
           
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
          
          </Row>
          
        </CardHeader>
        <CardBody>
          
        </CardBody>
      </Card> */}
      <Card>
        <CardHeader>
          <CardTitle>Мониторинг</CardTitle>
        </CardHeader>
        <CardBody>
          {!loading ? <DataTableWithButtons data={aglo}/> : <Spinner/>}
          </CardBody>
      </Card>
    </div>
  )
}

export default Home
