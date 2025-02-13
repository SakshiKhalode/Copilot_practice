// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Add body-parser middleware
app.use(bodyParser.json());

// Read the comments from the file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Create a route to get the comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Create a route to post a new comment
app.post('/comments', function(req, res) {
  var newComment = req.body;

  // Add new comment to the list of comments
  comments.push(newComment);

  // Write the new list of comments to the file
  fs.writeFileSync('comments.json', JSON.stringify(comments));

  res.json(newComment);
});

// Start the server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});