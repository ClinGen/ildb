# docker compose will shutdown and cleanup containers
docker-compose -p beacon -f ./build/docker-compose.yml down

# NOTE: at the moment this is very simple but we are planning to add more cleanup tasks to this script.
