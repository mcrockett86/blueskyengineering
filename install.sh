# !/bin/bash

# install the dependencies
npm install

# check the app out using development server
npm run start

# build the app 
npm run predeploy

# push to the gh-pages branch
npm run deploy

# deployment                                                                                      │
https://create-react-app.dev/docs/deployment/#github-pages