# App environment:

- Node.js v22.2.0
- npm v10.8.0
- VS Code v1.89.1
- Postman v10.24.26
- Github Desktop v3.4.0
- Docker v24.0.6
- Windows 11 Éducation

# Branches:

- main: contains the original code of the app Merged with the do_tasks branch.
- do_tasks: contains the code of the app after doing the tasks.
- mongodb: contains the code of the app using MongoDB.

# How to run the app:

- Clone the repository using Github Desktop app or with `git clone {repo_url}` command.
- Run `npm install` to install the project dependencies.
- Run `npm start` to start the server on port **3000**.
- Use Postman to test the API routes (import _documentation/postman/backend_test_collection_test.postman_collection.json_ file to Postman to run the tests).
- Switch to the mongodb branch to see the app using MongoDB `git checkout mongodb`.
- Run `npm run init_mongodb` to initialize the MongoDB database.
- Run `npm run start` to start the MongoDB server (make sure ports **27017** and **3000** are not used).

# Solution steps:

1.  I forked the original repo from the provided Github repository and kept the forked repo public. I cloned the repository using Github desktop app. I open the folder with VS Code.

1.  Install the project and run it on port **3000** :

    1. I run `npm install` to install the project dependencies.
    1. The server is configured to run on port **8080** by default as it uses the environement variable `PORT` which is set to **8080** and **3000** as fallback value. I changed the `PORT` variable value to **3000** in the `.env` file. Alternatively, I could change the start command script to `nodemon src/server.js localhost 3000`.
    1. I run `npm start` to start the server on port **3000** but it failed to start because of an error at _src\items.service.js:6_ (which will be corrected later).

1.  Fix `GET /items` route so that it properly returns the list of all existing items:

    1. I added `ITEMS_FILENAME=items.json` line to the `.env` file, because _src\items.service.js_ actually uses the `ITEMS_FILENAME` environment variable.
    1. I corrected the typo when declaring the `itemsFilename` constant, adding `s` as it was passed as argument to `path.join` inside `fs.readFileSync` method.
       The error is fixed, but it returns an empty list. (Test was done on Postman)
    1. I paused the `getAllItems` function in the _items.controller.js_ using await when calling the `getAllItems` function of the _items.service.js_ file to make sure the function returns the list of items before sending the response. The list of the 3 items is well returned on `GET /items` route.

1.  Add the ability to filter the items in the GET /items route:

    - In the `getAllItems` function of the _items.controller.js_ file, if the `filter_by` parameter is provided in the query of the request object, I filtered the items list based on their `isActive` property value according to the `filter_by` value if it is `active` or `inactive`. The filtered list is then returned. `items` constant is chaged to be a let variable to be able to reassign it.

    API test was done on Postman. The filtered list is returned as expected.

1.  Identify some basic security and stability issues, and suggest simple ways of correcting them:

    - The fallback value is hardcoded in the `src/server.js` file. It is better to use another `PORT_2` environment variable as the fallback value (different of 3000) to avoid hardcoding.
    - Same remark for the filename of the items file in the _src/items.service.js_ file.
    - The _.env_ file is not added to the _.gitignore_ file. It is better to add it to avoid pushing sensitive data to the repository.
    - Same remark for the _data/items.json_ file. Especially if the file contains confidential data.
    - The app does not check variables types. It is better to check the types of the variables to avoid bugs using typescript for example.
    - The app does not treat the errors (hanling exceptions). It is better to treat the errors to avoid the app from crashing.
    - The `items.json` file is read synchronously. It is better to read it asynchronously to avoid blocking the app especially if the file is large.
    - The app is not using any logger. It is better to use a logger to log the errors and the info messages.
    - The app is not using any testing framework. It is better to use a testing framework to test the app functionalities.
    - The app is not using any authentication. Meaning that anyone can access the data. It is better to use an authentication system to protect the data.
    - The app does not set the CORS headers. It is better to set the CORS headers to avoid the app from being accessed by unauthorized domains.

1.  Mongodb branch:

    You can switch to the mongodb branch to see the app using MongoDB. The app is using the mongoose library to create and manage the MongoDB database. The app is using the `items` collection to store the items data. The `items` collection is created when the app is initialized.

1.  Postman tests:
    - Basic tests are done on Postman to test the API routes. The tests are saved in the _documentation/postman_ folder in a json file. You can import them in Postman to run them.
