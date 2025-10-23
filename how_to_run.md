# Running the UI in vscode

## Prerequisites:
- nodejs installed:v22.21.0 at time of writing => should bundle install node and npm.
- @angular-cli:20.3.6 is the current version => this should be globally installed as "ng"

Note: Unlike java the angular frontend interactions are usually done via cmd although plugins can be used to debug etc.

## Pulling dependancies from package.json
1) To get packages for the frontend, firstly run `npm install`
If you need to reinstalll all dependancies you can use `npm ci` which is usually used by CI/CD when you need a clean slate build.

## Running the code
2) To run execute `npm start` or `ng serve`
Note: This can be fine tuned depending on which environment variables you need within package.json

## Testing
3) Run `npm test` to run the tests, note if interactions with UI are required then a browser such as chrome-headless/phantom will be required.

## Building the artifacts
4) Run `npm run build` or `ng build` which will transpile your typescript into javascript code.
Output is created in /dist folder and is provided the code as a series of .js files. (These can later be added to a Dockerfile and served over a load-balancer such as nginx)

## Building as a Dockerfile
6) Change directory to location of the Dockerfile and run: `docker build -t url-shortener-ui:{{insert_version}}
   This will build the image locally using the layers specified in your dockerfile. (e.g. layers for file changes, layers for artifact placement in folder structure)

## Running the Dockerfile
7) docker run -p 80:80 --name=url-shortener-ui-v{{insert_version}} url-shortener:{{insert_version}}
   This will run the container on port 80 (default http port) named url-shortener-ui