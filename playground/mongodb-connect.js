//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// es6 destructioning example
// var user = {name: 'carl', age:49};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect: ${err}`);
  }

  console.log('Connected to MongoDB server');

  // db.collection('ToDos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // insert new doc into users (name, age, location)

  db.collection('Users').insertOne({
    name: 'carl',
    age: 49,
    location: 'round rock'
  }, (err, result) => {
    if (err) {
      return console.log('unable to insert user', err);
    }
    console.log(JSON.stringify(result.ops, undefined,2 ));
  });

  db.close();

});
