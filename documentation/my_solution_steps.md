# Solution steps

1. I forked the original repo from the provided Github repository and kept the forked repo public. I cloned the repository using Github desktop app. I open the folder with VS Code.

1. Install the project and run it on port **3000** :

   1. I run `npm install` to install the project dependencies.
   1. The server is configured to run on port **8080** by default as it uses the environement variable `PORT` which is set to **8080** and **3000** as fallback value. I changed the `PORT` variable value to **3000** in the `.env` file. Alternatively, I could change the start command script to `nodemon src/server.js localhost 3000`.
   1. I run `npm start` to start the server on port **3000** but it failed to start because of an error at _src\items.service.js:6_ (which will be corrected later).

1. Fix `GET /items` route so that it properly returns the list of all existing items:

   1. I added `ITEMS_FILENAME=items.json` line to the `.env` file, because _src\items.service.js_ actually use the `ITEMS_FILENAME` environment variable.
   1. I corrected the typo when declaring the `itemsFilename` constant, adding `s` as it was passed as argument to `path.join` inside `fs.readFileSync` method.
   1. I paused the `getAllItems` function in the _items.controller.js_ using await when calling the `getAllItems` function of the _items.service.js_ file to make sure the function returns the list of items before sending the response. The list of the 3 items is well returned on `GET /items` route.


