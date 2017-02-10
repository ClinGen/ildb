FROM trentmswanson/pynginx:1

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY ./src /app/

COPY ./build/certs /etc/nginx/

COPY ./build/nginx.conf /etc/nginx/nginx.conf

RUN pip install -r requirements.txt
