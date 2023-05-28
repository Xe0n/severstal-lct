// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem, Form, Progress, Spinner, Alert } from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import axios from 'axios'
import toast from 'react-hot-toast'

const FileUploaderSingle = ({getData}) => {
  // ** State
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState({})
//   const [loadingClicked, setLoadingClicked] = useState()

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
        'text/parquet': ['.parquet']
      },
    onDrop: acceptedFiles => {
      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }
  const ShowNotion = () =>{
    toast.success('Обработка завершенна, файл доступен в таблице ниже', {
        duration: 5000
    })
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }
  const handleSubmit = () => {

    const form = document.querySelector('.uploadFile')
    console.log(form)
    if (form) {
            const formData = new FormData(form)
            formData.set('file', files[0])
            setProgress(0)
            axios.post('https://675c-188-0-169-150.eu.ngrok.io/analyse/', formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: data => {
                    //Set the progress value to show the progress bar
                    setProgress(Math.round((100 * data.loaded) / data.total))
                    // console.log(progress)
                }
            })
            .then(response => {
                console.log(response);
                setResult(response.data)
                console.log(result)
                ShowNotion()
                getData()
            })
            .catch(error => {
                console.error(error);
            });
            console.log(formData)
            console.log(files[0])
            
    } else { 
        console.log('Ошибка отправки формы') 
    }
}
  return (
    
    <Form className='uploadFile' name="uploadFile"  method="POST" encType="multipart/form-data" action="https://675c-188-0-169-150.eu.ngrok.io/uploadfile/">
    <Card>
      <CardHeader>
    
      </CardHeader>
      <CardBody>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <DownloadCloud size={64} />
            <h5>Бросьте файл сюда или нажмите "Загрузка"</h5>
            <p className='text-secondary'>
              Перетащите файл или кликните{' '}
              <a href='/' onClick={e => e.preventDefault()}>
                загрузка
              </a>{' '}
              
            </p>
          </div>
        </div>
        {files.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            <div className='d-flex justify-content-end'>
              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                Удалить
              </Button>
              <Button color='primary' onClick={handleSubmit}>Загрузить файл</Button>
            </div>
          </Fragment>
        ) : null}
        <div className='mt-3'>
          {progress > 0 && progress !== 100 ? <Progress striped value={progress} /> : ' ' }
          {progress == 100 ? 'Загрузка файла завершена' : ''} <br />
          {progress == 100 && result.id == undefined ? 'Идет обработка файла' : ''}
          {progress == 100 && result.id == undefined ? <Spinner color='danger' /> : ''}
          {progress == 100 && result.id !== undefined ? 'Обработка завершенна, файл доступен в таблице ниже' : ''}
        </div>
      </CardBody>
    </Card>
    <Card>
        {result.filename}
    </Card>
    
    </Form>
  )
}

export default FileUploaderSingle
