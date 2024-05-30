# Get the latest MongoDB image
FROM mongo:latest

# CREDIENTIALS for MongoDB
ENV MONGO_INITDB_ROOT_USERNAME=MY_USER
ENV MONGO_INITDB_ROOT_PASSWORD=MY_PWD

# Expose the default MongoDB port
EXPOSE 27017
