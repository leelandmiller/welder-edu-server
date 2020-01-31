let app;
if (process.env.NODE_ENV === 'production') {
  require("babel-polyfill");
  app = require('./dist/app.js');
} else {
  app = require('./src/app.js');
}

app.listen(parseInt(process.env.PORT, 10), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
