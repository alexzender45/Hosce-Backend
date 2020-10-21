import models from '../models';
const nodemailer = require('nodemailer');
require('dotenv').config();

const { User } = models;

const UserController = {
  async fetchAll(req, res, next) {
    res.setHeader('content-type', 'application/json');
    try {
      const allUsers = await User.findAndCountAll({
        limit: 2000
      })
      const users = await User.findAll();
      return res.status(200).json({
        status: 'success',
        allUsers,
        users
      });
    } catch (err) {
      return next(new Error(err));
    }
  },

  async fetchOne(req, res, next) {
    res.setHeader('content-type', 'application/json');
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        return res.status(400).json({ 
          status: 'error',
          error: 'User does not exist' 
        });
      }
      if(user)
      return res.status(200).json({
        status: 'success',
        user
      });
    } catch (err) {
      return next(new Error(err));
    }
  },

  async update(req, res, next) {
    res.setHeader('content-type', 'application/json');
    try {
      const { userId } = req.params;
      const {
        fullname, tel, gender, bankdetails, status, amountByReferral, availableincome, totalearning
      } = req.body;
      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        return res.status(400).send({
          status: 'error',
          error: 'User does not exist'
         });
      }
      const updatedUser = await existingUser.update({
        fullname: fullname || existingUser.fullname,
        tel: tel || existingUser.tel,
        gender: gender || existingUser.gender,
        bankdetails: bankdetails || existingUser.bankdetails,
        status: status || existingUser.status,
        amountByReferral: amountByReferral || existingUser.amountByReferral,
        availableincome: availableincome || existingUser.availableincome,
        totalearning: totalearning || existingUser.totalearning
        
      });
      return res.status(200).json({
        status: 'success',
        updatedUser
      });
    } catch (err) {
      return next(new Error(err));
    }
  },

  async delete(req, res, next) {
    res.setHeader('content-type', 'application/json');
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ 
          status: 'error',
          error: 'User does not exist'
         });
      }
      await user.destroy();
      return res.status(200).json({
        status: 'success'
      });
    } catch (err) {
      return next(new Error(err));
    }
  },

    async sendMassage(req, res, next) {
      res.setHeader('content-type', 'application/json');
      try {
        const {username, email, subjectTopic, message} = req.body;
        let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
          auth: {
              user: process.env.send,
              pass: process.env.pass 
          }, 
      });
      await transporter.sendMail({
        from: `${username}`,
        to: process.env.send,
        subject: `${subjectTopic}`,
        html: `<div><h2>${req.body.subjectTopic} from ${req.body.username}</h2>
        <p>${req.body.message}</p>
        <p>${email}</p>
        </div>`
    });
    return res.status(200).json({
      status: 'success'
    });

      }catch (err) {
        return next(new Error(err));
      }
    }
};

export default UserController;
