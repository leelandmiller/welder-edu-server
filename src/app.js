import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

import expressGraphQL from 'express-graphql';
import uuidv4 from 'uuid/v4';
import { makeExecutableSchema } from 'graphql-tools';
import { apolloUploadExpress } from 'apollo-upload-server';

const appConfig = require('./config')();
const secret = process.env.SECRET;
const ENV = process.env.NODE_ENV || 'development';
const app = express()
const PORT = appConfig.PORT || process.env.PORT
app.set('port', PORT)

passport.use(new FacebookStrategy(
  {
    clientID: appConfig.FACEBOOK_APP_ID,
    clientSecret: appConfig.FACEBOOK_APP_SECRET,
    callbackURL: `${appConfig.API_URL}/auth/facebook/callback`
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    const { id, displayName } = profile;
    // first arg of cb is error
    cb(null, profile);
  }
));

app.use(passport.initialize());

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('auth was good');
  });

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
