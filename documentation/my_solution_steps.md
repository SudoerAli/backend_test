# Solution steps

1. I forked the original repo from the provided Github repository and kept the forked repo public. I cloned the repository using Github desktop app. I open the folder with VS Code.

1. Install the project and run it on port **3000** :

   1. I run `npm install` to install the project dependencies.
   1. The server is configured to run on port **8080** by default as it uses the environement variable `PORT` which is set to **8080** and **3000** as fallback value. I changed the `PORT` variable value to **3000** in the `.env` file.
   1. I run `npm start` to start the server on port **3000** but it failed to start because of an error at _src\items.service.js:6_ (which will be corrected later).

