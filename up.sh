
# check to see if docker is installed and correct version
DOCKER_VER= docker version --format '{{.Client.Version}}'
echo "Docker version ${DOCKER_VER}"
# TODO: include a version check here

# create a network if this does not exist
if ! docker network ls | grep -q clearnet; then
docker network create clearnet
fi

# use docker compose to bring up the environment
docker-compose -p casevault -f ./build/docker-compose.yml up -d

# attach to the applicaiton instance
docker attach casevault_app_1

#docker run -d --net clearnet --net-alias mongo --name casevaultmongo mongo:3.3.6
#docker run -it --net clearnet --name casevaultserver -p 5000:80 -v `pwd`/src:/app -v `cd ../sampledata; pwd`:/data -w /app python:3.5.1 bash
