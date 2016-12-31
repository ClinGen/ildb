# docker compose will shutdown and cleanup containers
docker-compose -p clearnethub -f ./build/docker-compose.yml down

# cleanup the network if there are not containers using it
if [ "$(docker network inspect clearnet --format "{{range .Containers}}T{{end}}")" == "" ]; then
docker network rm clearnet
fi

# NOTE: consider cleaning up data volumes
# docker volume rm $(docker volume ls -qf dangling=true)
