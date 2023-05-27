// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Badge } from 'reactstrap'

// ** Third Party Components
import { ArrowDown } from 'react-feather'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <span>{`${payload[0]?.payload.date}`}</span>
      </div>
    )
  }

  return null
}

const SimpleLineChart = ({ data, target, warning }) => {
  // const newData = data.reduce((acc, el) => {
  //   console.log(acc[el[target]])
  //   acc[el[target]] = (acc[el[target]] || 0) + 1
  //   return acc
  // }, {})
  if (!target) target = 'id'
  const codes = Object.entries(data).map(([key, value]) => {
    // console.log(JSON.parse(value[target]).value)
    return { id: key, date: value.date, count: JSON.parse(value[target]).value }
  })
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle tag='h4'>Прогнозная аналитика экскаустера 1</CardTitle>
          <small className='text-muted'>Выберите нужный диапазон для демонстрации работы. По умолчанию выводится последняя неделя</small>
        </div>
      </CardHeader>

      <CardBody>
        <div className='recharts-wrapper'>
          <ResponsiveContainer>
            <LineChart height={100} data={codes}>
              <CartesianGrid />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip content={CustomTooltip} />
              <Line dataKey='count' stroke={warning} strokeWidth={3} />
              <Brush />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}
export default SimpleLineChart
