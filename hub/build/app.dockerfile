FROM python:3.6.0

RUN apt-get update && apt-get install -y supervisor && mkdir -p /var/log/supervisor

WORKDIR /app

#CMD ["/usr/local/bin/uwsgi", "--ini", "/app/uwsgi.ini"]
# RUN pip install uwsgi

COPY ./src /app/

RUN pip install -r requirements.txt
