import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap"
import FileUploaderRetrain from './fileUploader/retrain'


const Retrain = () => {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Загрузите ваш файл для получения новых результатов 🚀</CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>Мы ожидаем от вас формат .parquet</CardText>
            <FileUploaderRetrain/>
          </CardBody>
        </Card>  
      </div>
    )
}

export default Retrain
