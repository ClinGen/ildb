docker network create beacon

docker run -d --net beacon --net-alias mongo --name beaconmongo mongo:3.3.6

docker run -it --net beacon --name beaconserver -p 5000:80 -v `pwd`/src:/app -w /app python:3.5.1 bash
