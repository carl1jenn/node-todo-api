const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require ('./../models/todo');
const {User} = require ('./../models/user');

const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'testing todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        };
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('it should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send('')
    .expect(400)
    .end((err,res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('Get /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('get /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });
});

describe('get /todos:id', () => {
  it('should return a 400 if todo not found', (done) => {
    request(app)
    .get('/todos/1ac76b74b5a45e2d88f8acc8')
    .expect(400)
    .end(done);
    });
});

describe('get /todos:id', () => {
  it('should return a 404 for non-object ids', (done) => {
    // /todos/123
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('delete /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return a 400 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(400)
    .end(done);
  });

  it('should return a 404 if object it is invalid' ,(done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('patch /todos/:id', () => {
  it('should update the todo', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'updated from test case';
      request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
      })
      .end(done)
  });

  it('should clear the completed flag', (done) => {
      var hexId = todos[1]._id.toHexString();
      var text = 'updated from test case2';
      request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
      })
      .end(done)
  });
});

describe('Get /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res) => {
      expect(res.body).toEqual({});
    })
    .end(done);
  });

  describe('POST /users', () => {
    it('should create a user', (done) => {
      var email = 'example@example.com';
      var password = '123mnd!';

      request(app)
        .post('/user')
        .send({email, password})
        .expect(200)
        .expect((res) => {
          expect(res.header['x-auth']).toBeTruthy();
          expect(res.body._id).toBeTruthy();
          expect(res.body.email).toBe(email);
        })
        .end((err) => {
          if (err) {
            return done(err);
          }
          User.findOne({email}).then((user) => {
            expect(user).toBeTruthy;
            expect(user.password).not.toBe(password);
            done();
          })
        });
    });
    it('should return validation erros if request invalid', (done) => {
      var email = 'example';
      var password = '';

      request(app)
        .post('/user')
        .send({email, password})
        .expect(400)
        .end(done);
    });
    it('should not create a user if email in use', (done) => {
      var email = 'carl1jenn@carl.com';
      var password = '123mnd!';

      request(app)
        .post('/user')
        .send({email, password})
        .expect(400)
        .end(done);
    });

  });
});
