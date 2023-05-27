import {
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "reactstrap"
import DataTableWithButtons from "./table/DataTableWithButtons"
const Home = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Мониторинг</CardTitle>
        </CardHeader>
        <CardBody>
          <DataTableWithButtons/>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
