# crypto-sms

## Setup

You need two things, first install all dependencies from project directory:

`$ npm install`

You also need netlify cli:

`$ npm install -g netlify-cli`

After this is complete you can start local server using:

`$ netlify dev`

The server will be run under port 8888 and will automatically update itself after you do any changes.

## Developement

Put new api endpoints under api directory. If you create api/endpoint.js it will be available under:

`localhost:8888/api/endpoint` 

when running locally using `netlify dev` 

or under:

`https://crypto-sms.netlify.app/api/endpoint`

Deploys happen automatically after you push code to master branch.

Look at existing endpoints for inspiration.
