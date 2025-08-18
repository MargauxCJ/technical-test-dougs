# DOUGS - Technical Test

Technical test for a position at Dougs intended to evaluate Angular skills. 

## Run all via scripts

You can run api and frontend server in parallel in the root folder (_technical-test-dougs_) :
- Run `npm install` in the root folder
- Run `npm run install-all` (install npm package in both folder)
- Run `npm run start-all` (start dev and api server)

### tests & linting

- Run `npm run frontend:test` for Jest testing

- Run `npm run frontend:lint` for linting

## Run servers separatly 

### Frontend

The frontend app is located in the [frontend](frontend) folder.

Run `npm install` and `npm start` (or `ng serve`) to start the dev server at `http://localhost:4200/`.

### tests & linting

- Run `npm run test` for Jest testing

- Run `ng lint` for linting

### API

The Api app is located in the [api](api) folder.

Run `npm install` and `npm start`to start api server at `http://localhost:3001/`.


## Proxy Conf

In order to have access to the api, if your api have a different address,
got to the [proxy.conf.json](frontend/proxy.conf.json) file and change `"target"` address

