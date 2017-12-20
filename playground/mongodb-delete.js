const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if (err) {
    return console.log(`Unable to connect: ${err}`);
  }

  console.log('Connected to MongoDB server');

  // delete many
  // db.collection('Users').deleteMany({name: 'carl'}).then((result) => {
  //   console.log(result);
  // });

  // delete one
  db.collection('Users').deleteOne({_id: new ObjectID('5a3a5d6c7e124acc6474a044')}).then((result) => {
    console.log(result);
  });
  // find one and delete
  // db.collection('ToDos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });
  // db.close();

});
