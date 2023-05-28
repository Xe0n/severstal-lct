# severstal-lct
# backend install
Установить docker, docker-compose  
Зайти в папку backend  
в cd ввести команды  

## для запуска проекта:  
```docker-compose up —build```  
## для проведения миграций:  
    docker-compose exec web /bin/sh  
    pipenv run python manage.py makemigrations  
    pipenv run python manage.py migrate  

## для создания админа:  
    docker-compose exec web /bin/sh 
    pipenv run python manage.py createsuperuser
    написать email, и дважды пароль
