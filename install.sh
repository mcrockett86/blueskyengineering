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

git clone git@github.com:pixegami/simple-rag-pipeline.git src_pydantic_ai

# remove the .git directory in the submodule repository
git rm --cached src_pydantic_ai -f 
rm -rf "src_pydantic_ai/.git"
rm "src_pydantic_ai/.gitignore"

python3 -m venv src_pydantic_ai/venv
source src_pydantic_ai/venv/bin/activate
python3 -m pip install -r src_pydantic_ai/requirements.txt

# add pydantic-ai repo
python3 -m pip install pydantic-ai

# TODO: need to package into requirements.txt used for the RAG repo for deployment later
python3 -m pip freeze >> src_pydantic_ai/requirements_frozen.txt

##############################################