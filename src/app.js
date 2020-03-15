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

import models from './db/models'

passport.use(new FacebookStrategy(
  {
    clientID: appConfig.FACEBOOK_APP_ID,
    clientSecret: appConfig.FACEBOOK_APP_SECRET,
    callbackURL: `${appConfig.API_URL}/auth/facebook/callback`
  },
  async function(accessToken, refreshToken, profile, cb) {
    /**
     * Case 1: first time loggin in / sign up
     * Case 2: second and so on time logging in...
     */
    console.log(profile);
    const { id, displayName, email } = profile;

    const fbUser = await models.User.findOne({ 
      where: { facebookId: id }
    });
    // no user found
    if (fbUser === null) {
      console.log(`No user found with facebook id: ${id}`);
      // create a user
      const newUser = await models.User.create({
        name: displayName,
        facebookId: id,
        userType: 'student',
        email
      })
    } else {
      // user found
    }
    // first arg of cb is error
    cb(null, {});
  }
));

app.use(passport.initialize());

app.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: 'email'
  }));

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
} else {
  app.use(express.static(path.resolve(__dirname, '../client', 'dev')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dev', 'index.html'));
  })
}

module.exports = app
