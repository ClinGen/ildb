FROM python:3.5.2

WORKDIR /app

CMD [ "python", "./run.py" ]
#CMD ["/usr/local/bin/uwsgi", "--ini", "/app/uwsgi.ini"]
# RUN pip install uwsgi

# This is require to allow celery to run
ENV C_FORCE_ROOT='true'

COPY ./src /app/

RUN pip install -r requirements.txt
