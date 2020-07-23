import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcrypt';
const appConfig = require('./config')();
/**
 * Signs an access token using jwt.sign() to expire in 20m
 * Signs a refresh tokem using jwt.sign() to expire in 7d
 * @param {*} user 
 * @param {*} secret 
 * @return {Promise}
 */
export const createTokens = async (user, secret) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret,
    {
      expiresIn: '20m',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret,
    {
      expiresIn: '7d',
    },
  );

  return Promise.all([createToken, createRefreshToken]);
};
/**
 * 
 * @param {*} token 
 * @param {*} refreshToken 
 * @param {*} models 
 * @param {*} SECRET 
 */
export const refreshTokens = async (token, refreshToken, models, SECRET) => {
  // extract userId from refreshToken using SECRET
  let userId = -1;
  try {
    const { user: { id } } = jwt.verify(refreshToken, SECRET);
    userId = id;
  } catch (err) {
    console.log('Jwt.Verify Error:', err);
    return {};
  }

  // find user w/userID from refreshToken
  const user = await models.User.findOne({ where: { id: userId }, raw: true });
  // create newToken and newRefreshToken w/user
  const [newToken, newRefreshToken] = await createTokens(user, SECRET);
  // return tokens and user
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

export const tryLogin = async (email, password, models, SECRET) => {
  const user = await models.User.findOne({ where: { email }, raw: true });
  if (!user) {
    // user with provided email not found
    throw new Error('Invalid login');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // bad password
    throw new Error('Invalid login');
  }

  const [token, refreshToken] = await createTokens(user, SECRET);

  return {
    token,
    refreshToken,
  };
};

export const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, appConfig.SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(
        token,
        refreshToken,
        models,
        SECRET,
      );
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};