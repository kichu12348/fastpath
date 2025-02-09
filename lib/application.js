const http = require('http');
const Router = require('./router');

class Application extends Router {
  constructor() {
    super();
    this.middlewares = [];
    this.errorHandlers = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  error(handler) {
    this.errorHandlers.push(handler);
  }

  async handleRequest(req, res) {
    // Enhanced response helpers
    res.json = (data) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };

    res.send = (data) => {
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    };

    res.status = (code) => {
      res.statusCode = code;
      return res;
    };

    try {
      // Execute middlewares
      for (const middleware of this.middlewares) {
        await middleware(req, res);
      }

      // Handle routes
      await this.handle(req, res);
    } catch (err) {
      if (this.errorHandlers.length) {
        for (const handler of this.errorHandlers) {
          await handler(err, req, res);
        }
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  }

  listen(port, callback) {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(port, callback);
    return server;
  }
}

module.exports = Application;
