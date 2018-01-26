const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect: ${err}`);
  }

  console.log('Connected to MongoDB server');

  // db.collection('ToDos').findOneAndUpdate({
  //   _id: new ObjectID('5a3a5bcd7e124acc64749fb7')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a3a5d5d7e124acc6474a03a')
  }, {
    $set: {
      name: 'madison'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();

});
