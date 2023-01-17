import express, { Application } from 'express'
// import openapi from 'express-openapi'
// import {ExpressOpenApi} from '@openapi-ts/express';
import { initialize } from "express-openapi";
import bodyParser from 'body-parser'
import path from 'path'
// import { fileURLToPath } from 'url'
import YAML from 'yamljs'
import swaggerUi from "swagger-ui-express"

import controllers from './controllers'
import { validateAllResponses } from './lib/openAPI'

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const apiDocPath = path.resolve(__dirname, './api-doc.yml')
const apiDoc = YAML.load(apiDocPath);

const app: Application = express()

if (process.env.SHOW_DOCS) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc));
}

initialize({
  app,
  apiDoc: {
    ...apiDoc,
    'x-express-openapi-additional-middleware': [validateAllResponses],
    'x-express-openapi-validation-strict': true
  },
  consumesMiddleware: {
    'application/json': bodyParser.json(),
    'text/text': bodyParser.text()
  },
  errorMiddleware: function(err, req, res, next) { 
    res.status(err.status || 400).json(err)
  },
  operations: controllers
}); 

export default app