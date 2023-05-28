import React from 'react'
import $api from '../../http'
import { useParams } from 'react-router-dom'
import { descript } from './lang-map'
import SimpleLineChart from '../charts/LineCharts'
import { Card, CardHeader, CardBody, Row, Col, Form, Input, Label, Spinner, Badge  } from 'reactstrap'

import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/charts/recharts.scss'
const Detail = () => {
    const id = useParams()
    console.log(id.id)
    const [data, setData] = React.useState([])
    const [dateReady, setDateReady] = React.useState([])
    const [defOptions, setDefOptions] = React.useState('masloohloditel_m05_1')
    const [partList, setPartList] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [currentPart, setCurrentPart] = React.useState('masloohloditel_m05_1')
    function prepareChartData(jsonData) {
      // Создаем пустой массив для хранения подготовленных данных
      const chartData = []
    
      // Перебираем каждую запись обслуживания в JSON-фрагменте
      for (const record of jsonData) {
        // Создаем объект с датой и статусами компонентов для текущей записи
        const dataEntry = {
          date: record.date
        }
    
        // Перебираем каждый компонент в текущей записи
        for (const componentName in record) {
          // Пропускаем поле "date"
          if (componentName === "date") continue
          if (componentName === "id") continue
    
          // Получаем статус компонента
          const componentStatus = record[componentName]?.status || 0
    
          // Добавляем статус компонента в объект с данными для текущей записи
          dataEntry[componentName] = componentStatus
        }
    
        // Добавляем объект с данными для текущей записи в массив подготовленных данных
        chartData.push(dataEntry)
      }
    
      // Возвращаем подготовленные данные
      return chartData
    }
    const getData = async (start = '2022-01-01T00:00:00.0000', end = '2023-05-30T11:50:00.0003') => {
      setLoading(true)
      const resp = await $api(`api/wear/exhauster/${id.id}/?startDate=${start}&endDate=${end}`)
      // const dataObject = JSON.parse(resp.data.statistics)
      setData(resp.data.statistics)
      setDateReady(prepareChartData(resp.data.statistics))
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


  return (
    <>
    <Row>
      <Col md={3} >
       
        <Card className='p-2 scroll-fix'>
        <h4>Выберите деталь</h4>
        {!loading ? <Form onChange={(e) => {
          setCurrentPart(e.target.value)
          setDefOptions(e.target.value)
          } 
        }>
          {partList?.map(item => {
            if (item !== 'id' && item !== 'date') {
              let m1 = false
              let m3 = false
              return (
                <div className='demo-inline-spacing' key={item}>
                  <div className='form-check form-check-inline'>
                    <Input type='radio' name='ex1' id={item} value={item} defaultChecked={item === defOptions}/>
                    <Label for={item} className='form-check-label break-word'>
                      {descript[item]?.name ? descript[item].name : item}
                      {dateReady.map(val => {
                        if (val[item] === 3 && !m1) {
                          m1 = true
                          return <Badge color='danger' className='ms-1'>M3</Badge>
                        }
                        if (val[item] === 1  && !m3) {
                          m3 = true
                          return <Badge color='warning' className='ms-1'>M1</Badge>
                        }
                      }
                      )}
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
      <Col md={9}>
         <Card>
          <CardHeader>
            <div className='d-flex align-items-center'>
              <Calendar size={15} />
              <Flatpickr
                className='form-control flat-picker bg-transparent border-0 shadow-none'
                options={{
                  mode: 'range',
                  // eslint-disable-next-line no-mixed-operators
                  defaultDate: ['2022-01-01T00:00:00.0000', '2023-05-30T11:50:00.0003'],
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
            {!loading ? <SimpleLineChart warning={'red'} data={dateReady} target={currentPart}/> : <Spinner/>}
          </CardBody>
        </Card>
      </Col>
    </Row>
     
    </>
  )
}   

export default Detail
