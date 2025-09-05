# !/bin/bash

######### Client Side Application ###########

# install the dependencies
npm install

# check the app out using development server
npm run start

# build the app 
npm run predeploy

# push to the gh-pages branch
npm run deploy

# deployment
https://create-react-app.dev/docs/deployment/#github-pages



######### Server Side Application ###########

git clone git@github.com:pixegami/simple-rag-pipeline.git src_backend

# remove the .git directory in the submodule repository
git rm --cached src_backend -f 
rm -rf "src_backend/.git"
rm "src_backend/.gitignore"

python3 -m venv src_backend/.venv
source src_backend/.venv/bin/activate
python3 -m pip install -r src_backend/requirements.txt

# test run with provided data
cd src_backend
python3 main.py run

# clear test run and provide new datastore of docs
python3 main.py reset

#Index and embed documents. You can specify a file or directory path.
python3 main.py add -p "provided_data/source/"


#Search for information using a query string.
python3 main.py query "What experience do you have in machine learning engineering?"

python3 main.py query "I am having a lot of technical scope creep and overworked engineers.  How can you help me introduce AI to solve this challenge?"

python3 main.py query "what is your phone number?"
python3 main.py query "what is your email address?"

# run the fastapi server for development
#fastapi dev app_fastapi.py

# run the fastapi server for production
fastapi run app_fastapi.py --port 7860


######## Server Side Container Build #########

docker build -f containers/Dockerfile_Backend -t bluesky_ai:latest .

# docker run --name your-container-name -p host-port:container-port your-image-name:your-tag
docker run -p 7860:7860 bluesky_ai:latest

# serve locally with tunnel from ngrok (temporary for dev purposes)
brew install ngrok
ngrok config add-authtoken 32GejFIJL4Un5bHyQY77uL8EESq_3pBNkkPa9pyGW95P8FKgc

# ngrok deploy tunnel from local port to static url
ngrok http --url=definite-perch-sincerely.ngrok-free.app 7860

# access prod server running locally
http://0.0.0.0:7860/chat?question=what%20experience%20do%20you%20have%20in%20machine%20learning%20engineering

# access prod server through public accessible static
http://definite-perch-sincerely.ngrok-free.app/chat?question=what%20experience%20do%20you%20have%20in%20machine%20learning%20engineering

##############################################