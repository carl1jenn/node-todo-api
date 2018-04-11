const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// get /todos/123343
app.get('/todos/:id', (req,res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(400).send();
    }
    return res.status(200).send({todo});
    console.log('todo by id', todo);
  }).catch((e) => console.log(e));


  //valid id is using isValid
    // 404 - send back empty send

  // findById
    // success
      // if todo send it back
      // if no todo - send back 404 with empty body
    // error
      // 400 -
})

app.listen(3000, () => {
  console.log('started on port 3000');
});

module.exports = {app};
