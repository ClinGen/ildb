FROM python:3.6.0

RUN apt-get update && apt-get install -y supervisor && mkdir -p /var/log/supervisor

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /app

CMD [ "/usr/bin/supervisord" ]
#CMD ["/usr/local/bin/uwsgi", "--ini", "/app/uwsgi.ini"]
# RUN pip install uwsgi

# This is require to allow celery to run
ENV C_FORCE_ROOT='true'

COPY ./src /app/

RUN pip install -r requirements.txt
