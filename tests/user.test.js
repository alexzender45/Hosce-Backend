/* eslint-disable handle-callback-err */
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api');

chai.use(chaiHttp);

const { expect } = chai;

describe('User test', () => {
  let token = '';
  before((done) => {
    chai.request(app)
      .post('/api/auth/sign_up')
      .send({
        username: 'mlpuiop',
        email: 'mlpuiop@gmail.com',
        password: 'password',
        tel: 876543234
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('Fetch a list of users', () => {
    it('Should pass if user is logged in', (done) => {
      chai.request(app)
        .get('/api/users')
        // This line logs in user
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('Should fail if user is not logged in', (done) => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).eql('Unauthorized access');
          done();
        });
    });
  });

  describe('Fetch one user', () => {
    it('Should pass if user is logged in', (done) => {
      chai.request(app)
        .get(`/api/users/${1}`)
        // This line logs in user
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('Should fail if user is not logged in', (done) => {
      chai.request(app)
        .get(`/api/users/${1}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).eql('Unauthorized access');
          done();
        });
    });
  });

  describe('Update user', () => {
    it('Should pass if user is logged in', (done) => {
      chai.request(app)
        .put(`/api/users/${1}`)
        // This line logs in user
        .set('Authorization', `Bearer ${token}`)
        .send({
          username: 'newname',
          role: 'admin'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('Should fail if user is not logged in', (done) => {
      chai.request(app)
        .put(`/api/users/${1}`)
        .send({
          username: 'newname',
          role: 'admin'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).eql('Unauthorized access');
          done();
        });
    });
  });

  describe('Delete user', () => {
    it('Should pass if user is logged in', (done) => {
      chai.request(app)
        .delete(`/api/users/${1}`)
        // This line logs in user
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('Should fail if user is not logged in', (done) => {
      chai.request(app)
        .delete(`/api/users/${1}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).eql('Unauthorized access');
          done();
        });
    });
  });
});
