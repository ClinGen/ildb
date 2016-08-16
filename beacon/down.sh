# docker compose will shutdown and cleanup containers
docker-compose -p beacon -f ./build/docker-compose.yml down

# NOTE: cleanup images and volumes here
