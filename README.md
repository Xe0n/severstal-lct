# severstal-lct
# frontend setup
Демо дашборда доступно по адресу http://severstal.kobix.ru/, но вы можете запустить локальную копию у себя.
    cd /frontend
    yarn install
    yarn start

# backend install
Установить docker, docker-compose  
Зайти в папку backend  
в cd ввести команды  

## для запуска проекта:  
    docker-compose up —build  
## для проведения миграций:  
    docker-compose exec web /bin/sh  
    pipenv run python manage.py makemigrations  
    pipenv run python manage.py migrate  

## для создания админа:  
    docker-compose exec web /bin/sh 
    pipenv run python manage.py createsuperuser
    написать email, и дважды пароль
