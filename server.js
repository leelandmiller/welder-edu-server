let app;
if (process.env.NODE_ENV === 'production') {
  require("babel-polyfill");
  app = require('./dist/app.js');
} else {
  app = require('./src/app.js');
}

// const appConfig = require('./config')()

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
