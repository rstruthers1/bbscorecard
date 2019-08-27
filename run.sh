#!/usr/bin/env bash

main() {
  "$@"
}


initBbScorecardDb() {
  createBbScorecardDbNetwork
  createBbScorecardDbVolume
  runBbScorecardDbContainer
}

createBbScorecardDbNetwork() {
  docker network create -d bridge bbscorecard-mongo-network
}

createBbScorecardDbVolume() {
  docker volume create bbscorecard-mongo-db-volume
}

runBbScorecardDbContainer() {
  docker run -d \
  -p 27018:27017 \
  --expose=27017 \
  -h bbscorecard-mongo-db \
  --mount source=bbscorecard-mongo-db-volume,target=/data/db \
  --network=bbscorecard-mongo-network \
  --name bbscorecard-mongo-db_1 \
  -e AUTH=yes \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=password1 \
  mongo:4.1.11
}


initAppUser() {
  docker exec -it bbscorecard-mongo-db_1 mongo --authenticationDatabase admin \
   --host localhost -u root -p password1 \
   bbscorecard \
   --eval "db.createUser({user: 'appuser', pwd: 'password1', roles: [{role: 'readWrite', db: 'bbscorecard'}]});"
}

doDataQueries() {
  docker exec -it bbscorecard-mongo-db_1 mongo --authenticationDatabase admin \
    --host localhost -u root -p password1
}

destroyBbScorecardDb() {

  docker stop bbscorecard-mongo-db_1
  docker rm bbscorecard-mongo-db_1
  docker network rm bbscorecard-mongo-network
  docker volume rm bbscorecard-mongo-db-volume
}


main "$@"
