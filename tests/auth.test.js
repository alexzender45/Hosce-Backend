/* eslint-disable handle-callback-err */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { hashPassword } = require('../api/helpers/bcrypt');

const app = require('../api');

chai.use(chaiHttp);

const { expect } = chai;


describe('Authentications test', () => {
  beforeEach((done) => {
    chai.request(app)
      .post('/api/auth/sign_up')
      .send({
        username: 'bob',
        email: 'bob@example.com',
        password: 'password',
        tel: 8101838493,
      })
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }
        done();
      });
  });
  describe('Sign up', () => {
    it('Should fail if username is not provided', (done) => {
      chai.request(app)
        .post('/api/auth/sign_up')
        .send({
          email: 'emptyname@email.com',
          password: 'password1',
          tel: 8101838493
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error').eql('username is required');
          done();
        });
    });

    it('Should fail if email is invalid', (done) => {
      chai.request(app)
        .post('/api/auth/sign_up')
        .send({
          username: 'John',
          email: 'wrongemailemail@gmail',
          password: 'password1',
          tel: 8101838493
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error').eql('invalid email address');
          done();
        });
    });

    it('Should fail if password is < 8 characters', (done) => {
      chai.request(app)
        .post('/api/auth/sign_up')
        .send({
          username: 'Richman',
          email: 'richman@email.com',
          password: 'passwor',
          tel: 8101838493
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error').eql('password must be at least 8 characters');
          done();
        });
    });

    it('Should pass if credentials are valid', (done) => {
      chai.request(app)
        .post('/api/auth/sign_up')
        .send({
          username: 'fhfjduejdd',
          email: 'fhfjduejdd@email.com',
          password: 'password',
          tel: 8101838493
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          done();
        });
    });

    it('Should fail if username exist already', (done) => {
      chai.request(app)
        .post('/api/auth/sign_up')
        .send({
          username: 'bob',
          email: 'someemail@example.com',
          password: 'password',
          tel: 8101838493
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error').eql('username exists already');
          done();
        });
    });

    it('Should fail if email exist already', (done) => {
      chai.request(app)
        .post('/api/auth/sign_up')
        .send({
          username: 'ddkfkdk',
          email: 'bob@example.com',
          password: 'password',
          tel: 8101838493
        })
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.have.property('error').eql('email exists already');
          done();
        });
    });
  });
});


describe('Sign in', () => {
  it('Should fail if email is invalid', (done) => {
    chai.request(app)
      .post('/api/auth/sign_in')
      .send({
        email: 'ema/email@',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').eql('Wrong Email/Password combination');
        done();
      });
  });

  it('Should fail if user does not exist', (done) => {
    chai.request(app)
      .post('/api/auth/sign_in')
      .send({
        email: 'doesnotexist@email.com',
        password: 'password1',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').eql('User does not exist');
        done();
      });
  });

  it('Should pass if all credentials are valid', (done) => {
    chai.request(app)
      .post('/api/auth/sign_in')
      .send({
        email: 'bob@example.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
  });

  it('Should fail if passwords do not match', (done) => {
    chai.request(app)
      .post('/api/auth/sign_in')
      .send({
        email: 'bob@example.com',
        password: 'passord12',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').eql('Wrong Email/Password combination');
        done();
      });
  });
});
