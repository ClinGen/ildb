
# check to see if docker is installed and correct version
DOCKER_VER= docker version --format '{{.Client.Version}}'
echo "Docker version ${DOCKER_VER}"
# TODO: include a version check here

# create a network if this does not exist
if ! docker network ls | grep -q clearnet; then
docker network create clearnet
fi

# use docker compose to bring up the environment
docker-compose -p clearnethub -f ./build/docker-compose.yml up -d

# attach to the applicaiton instance
docker attach clearnethub_app_1
