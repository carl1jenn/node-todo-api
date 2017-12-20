const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect: ${err}`);
  }

  console.log('Connected to MongoDB server');

  // db.collection('ToDos').find({
  //   _id: new ObjectID('5a37051cf3460204ec930659')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('ToDos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);

  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  db.close();

});
