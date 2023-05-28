FROM python:3.7-alpine3.11

ENV PYTHONUNBUFFERED 1
RUN mkdir /web
WORKDIR /web
ADD Pipfile* /web/

RUN apk update && apk upgrade \
    && apk add --no-cache \
        postgresql-dev \
        gcc \
        python3-dev \
        musl-dev \
    && apk add --no-cache \
        --repository http://dl-cdn.alpinelinux.org/alpine/edge/main \
        --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing \
        --repository http://dl-cdn.alpinelinux.org/alpine/edge/community \
        gdal-dev \
        geos-dev \
        proj-dev \
    && apk add --no-cache \
        jpeg-dev \
        freetype-dev \
        zlib-dev \
    && rm -rf /var/cache/apk/* /tmp/*

COPY ./bootstrap.sh .

RUN mkdir -p ~/.postgresql \
    && wget "https://storage.yandexcloud.net/cloud-certs/CA.pem" -O ~/.postgresql/root.crt \
    && chmod 0600 ~/.postgresql/root.crt \
    && pip install pipenv \
    && pipenv install --deploy \
    && chmod +x ./bootstrap.sh

CMD /bin/sh ./bootstrap.sh
