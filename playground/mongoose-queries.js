const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a6860db9f37ba7d36cd8096';

if (!ObjectID.isValid(id)) {
  console.log('the id is not valid');
};

User.find({
  _id: id
}).then((users) => {
  console.log('user', users);
});

User.findOne({
  _id: id
}).then((user) => {
  console.log('User', user);
});

User.findById(id).then((user) => {
  if (!user) {
    return console.log('id not found');
  }
  console.log('user by id', user);
}).catch((e) => console.log(e));
