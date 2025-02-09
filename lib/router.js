const { parse } = require('url');

class Router {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    this.addRoute('GET', path, handler);
  }

  post(path, handler) {
    this.addRoute('POST', path, handler);
  }

  addRoute(method, path, handler) {
    this.routes.push({ method, path, handler });
  }

  parseParams(routePath, pathname) {
    routePath = routePath.replace(/\/$/, '');
    pathname = pathname.replace(/\/$/, '');

    const routeParts = routePath.split('/').filter(Boolean);
    const urlParts = pathname.split('/').filter(Boolean);

    if (routeParts.length !== urlParts.length) {
      return null;
    }

    const params = {};
    const isMatch = routeParts.every((routePart, index) => {
      if (routePart.startsWith(':')) {
        const paramName = routePart.slice(1);
        params[paramName] = decodeURIComponent(urlParts[index]);
        return true;
      }
      return routePart === urlParts[index];
    });

    return isMatch ? params : null;
  }

  async handle(req, res) {
    const { pathname, query } = parse(req.url, true);
    req.query = query;
    
    // Find matching route
    for (const route of this.routes) {
      if (route.method === req.method) {
        const params = this.parseParams(route.path, pathname);
        if (params !== null) {
          req.params = params;
          return route.handler(req, res);
        }
      }
    }
    
    // No match found
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.end(JSON.stringify({
      status: 404,
      error: 'Not Found',
      message: `Cannot ${req.method} ${pathname}`,
      path: pathname,
      availableRoutes: this.routes.map(r => `${r.method}:${r.path}`)
    }));
  }
}

module.exports = Router;
