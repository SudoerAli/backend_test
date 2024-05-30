#!/usr/bin/env node


# delete docker container and image if they exist
docker-compose down
# Check if the container exists
if [ "$(docker ps -aq -f name=mongodb_container)" ]; then
    # Stop the container
    docker container stop mongodb_container
    # Remove the container
    docker container rm -v mongodb_container
fi

# Check if the image exists
if [ "$(docker images -q backend_test-mongodb)" ]; then
    # Remove the image
    docker image rm mongodb_image
fi

# build the docker image
docker-compose build
# start the docker container
docker-compose up -d
# install the mongoose ORM package
npm install mongoose
# run the init_db.js script to create 
# the database, the collection and insert the data
node init_mongodb.js
