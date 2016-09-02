
# check to see if docker is installed and correct version
DOCKER_VER= docker version --format '{{.Client.Version}}'
echo "Docker version ${DOCKER_VER}"
# TODO: include a version check here

# create a network if this does not exist
if ! docker network ls | grep -q clinbeacon; then
docker network create clinbeacon
fi

# use docker compose to bring up the environment
docker-compose -p beacon -f ./build/docker-compose.yml up -d

# attach to the applicaiton instance
docker attach beacon_app_1

#docker run -d --net beacon --net-alias mongo --name beaconmongo mongo:3.3.6
#docker run -it --net beacon --name beaconserver -p 5000:80 -v `pwd`/src:/app -v `cd ../sampledata; pwd`:/data -w /app python:3.5.1 bash
