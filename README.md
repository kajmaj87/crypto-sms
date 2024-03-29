# crypto-sms

## What is it

This is the backend side done as part of Asseco Fintech Hackaton 2021.

## Setup

You need two things, first install all dependencies from project directory:

`$ npm install`

You also need netlify cli:

`$ sudo npm install -g netlify-cli`

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

**Do not develop directly on master, use your own branches for new features**

Look at existing endpoints for inspiration. 

To you  will see all console.log statements in console where netlify dev is running.

## Testing

Use curl like this:

`$ curl https://crypto-sms.netlify.app/api/endpoint` 

or

`$ curl localhost:8888/api/endpoint` 

to check if your endpoint is up. 

To test post request with data in request.json file:

`$ curl -X POST --data-binary "@./resources/request.json" localhost:8888/api/endpoint`

