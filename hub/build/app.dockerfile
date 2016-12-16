FROM python:3.5.2

RUN apt-get update && apt-get install -y supervisor && mkdir -p /var/log/supervisor

COPY superivosrd.conf /etc/supervisor/conf.d/superivosrd.conf

WORKDIR /app

CMD [ "/user/bin/supervisord" ]
#CMD ["/usr/local/bin/uwsgi", "--ini", "/app/uwsgi.ini"]
# RUN pip install uwsgi

COPY ./src /app/

RUN pip install -r requirements.txt
