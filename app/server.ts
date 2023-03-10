import http from 'http'
import { promisify } from 'util'
import app from './app'

const SIGINT = 'SIGINT';
const SIGTERM = 'SIGTERM';
const { SERVER_PORT = 3000 } = process.env;

const shutdownMessages: any = {
  [SIGINT]: 'Received SIGINT, probably ctrl-c. Gracefully shutting down the server.',
  [SIGTERM]: 'Received SIGTERM, probably docker stop. Gracefully shutting down the server.',
};

function start() {
  app.set('port', SERVER_PORT);

  const server = http.createServer(app);
  const serverClose = promisify(server.close.bind(server));

  // Handle a shutdown event
  async function shutdown(signal: any) {
    console.log(shutdownMessages[signal]);

    try {
      await serverClose();
      console.log('Bye');
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  function onError(error: any) {
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${SERVER_PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${SERVER_PORT} is already in use!`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  server.listen(SERVER_PORT, () => {
    console.log(`Server listening at http://localhost:${SERVER_PORT}`);
  });

  server.on('error', onError);

  process.on(SIGINT, () => shutdown(SIGINT));
  process.on(SIGTERM, () => shutdown(SIGTERM));
}

start();
