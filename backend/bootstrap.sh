#!/bin/bash

sleep 10s
pipenv run python manage.py migrate
pipenv run python manage.py collectstatic --no-input --clear
pipenv run gunicorn app.wsgi:application --bind 0.0.0.0:4000 --reload
