const fastpath = require('./index.js');

const app = fastpath();

// Logging middleware
app.use(async (req, res) => {
  console.log(`${req.method} ${req.url}`);
});

// Error handling middleware
app.error((err, req, res) => {
  console.error('Error:', err);
  res.status(500).json({
    error: err.message
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our lightweight framework!' });
});

// Route with parameters
app.get('/users/:id', (req, res) => {
    console.log(req.params);
  res.json({
    userId: req.params.id,
    query: req.query
  });
});

// Multiple parameters test
app.get('/users/:userId/posts/:postId', (req, res) => {
  res.json({
    userId: req.params.userId,
    postId: req.params.postId,
    query: req.query
  });
});

// Test with special characters
app.get('/products/:category/:name', (req, res) => {
  res.json({
    category: req.params.category,
    name: req.params.name
  });
});

// Route that throws an error
app.get('/error', (req, res) => {
  throw new Error('Test error handling');
});

// Start the server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
  console.log('Try these routes:');
  console.log('- http://localhost:3000/');
  console.log('- http://localhost:3000/users/123?name=john');
  console.log('- http://localhost:3000/users/123/posts/456');
  console.log('- http://localhost:3000/products/electronics/iPhone%2013');
  console.log('- http://localhost:3000/error');
});
