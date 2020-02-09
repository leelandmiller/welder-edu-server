let app;
if (process.env.NODE_ENV === 'production') {
  require("babel-polyfill");
  app = require('./dist/app.js');
} else {
  app = require('./src/app.js');
}

const appConfig = require('./config')()

const PORT = appConfig.PORT || process.env.PORT

app.listen(parseInt(PORT, 10), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
