# movieworld

A webapp that can list movies fetched from themoviedb.org via a node backend.

## How to test this abomination
1. Rename src/backend/config.example.json to src/backend/config.json
2. Insert your themoviedb.org API key in src/backend/config.json
3. Start frontend `node_modules/.bin/webpack-dev-server`
4. Start backend `node src/backend/server.js`
5. Start mongodb `docker run --name movieworld-mongo -p 27017:27017 --user mongodb -d mongo`
6. ???
7. Profit!

# Frontend
* Webpack
* Bootstrap
* jQuery
* Some typescript, mostly js

# Backend
* Express for relaying API calls
  * Listens on port 8888
  * Makes calls to themoviedb.org API
* MongoDB for persitence
