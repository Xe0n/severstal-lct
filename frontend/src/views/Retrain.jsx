import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Alert
} from "reactstrap"
import FileUploaderRetrain from './fileUploader/retrain'


const Retrain = () => {
    return (
      <div>
            <Alert color="primary">
        <div className="alert-body">
          <span className="fw-bold">Внимание!</span>
          <span>
            {" "}
            Этот модуль мы доделаем после прохода в ТОП-10. 🤫
          </span>
        </div>
      </Alert>
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
