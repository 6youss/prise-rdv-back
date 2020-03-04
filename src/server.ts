import app from './app'; //import app at the start for env configuration

import dbConnection from './models/dbConnection';
const server = dbConnection.then(() => {
  return app.listen(process.env.PORT, () => {
    console.log('App server listening on port ' + process.env.PORT);
  });
});

export default server;
