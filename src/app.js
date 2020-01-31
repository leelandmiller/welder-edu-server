import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import expressGraphQL from 'express-graphql';
import uuidv4 from 'uuid/v4';
import { makeExecutableSchema } from 'graphql-tools';
import { apolloUploadExpress } from 'apollo-upload-server';

const secret = process.env.SECRET;
const ENV = process.env.NODE_ENV || 'development';
const app = express()


app.set('port', process.env.PORT || 8080);

const corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(
  '/graphql',
  cors(corsOptions),
  apolloUploadExpress(),
  expressGraphQL(req => ({
    schema,
    graphiql: ENV === 'production' ? false : true,
    context: {
      req,
      models,
      secret
    }
  }))
);

module.exports = app
