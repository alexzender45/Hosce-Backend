import models from '../models';
import { hashPassword, comparePassword } from '../helpers/bcrypt';
import { emailRegEx } from '../helpers';
import nodemailer from "nodemailer";
require('dotenv').config();
import { createToken } from '../helpers/jwt';

const { User, Code } = models;
const Auth = {
  async signUp(req, res, next) {
    res.setHeader('content-type', 'application/json');
    try {
      const genCode = await Code.findOne({ where: { code: req.body.codeReg }})
      if(genCode === null){
        return res.status(400).json({
          status: 'error',
          error: 'Please contact the Admin for registration code',
        });
      }
      if(genCode.code === req.body.codeReg){
        const find = await User.findOne({ where: { codeReg: genCode.code }})
        if(find){
          return res.status(400).send({
            status: 'error',
            error: 'Code already used',
          });
        }
      const {
        fullname, username, email, tel, gender, bankdetails, password, codeReg, availableincome, totalearning, status, role
      } = req.body;
       const link = `https://trfhosce.com/?referral=${req.body.username}`
      const hash = hashPassword(password);
      const user = await User.create({
        fullname, username, email, tel, gender, bankdetails, password: hash, link, codeReg, availableincome, totalearning, status, role
      });
      const token = createToken(user);
      const check = req.query.referral
      if(check == undefined || check == null){
        user.update({referralCount : + 0,
          amountByReferral : user.referralCount + 0.00,
          availableincome : user.availableincome + 0.00,
          totalearning : user.totalearning + 0.00,
          sponsor: 'No Sponsor'
        })
      }else{
        const see = await User.findOne({ where: { username:check } });
        if(user.status === 'Normal' || user.status === 'normal'){
        see.update({referralCount : see.referralCount + 1,
          amountByReferral : see.amountByReferral + 5000,
          availableincome : user.availableincome + 0.00,
          totalearning : see.totalearning + 5000,
          totalearning : user.totalearning + 0.00,
        })
      }else if(user.status === 'half' || user.status === 'Half'){
        see.update({referralCount : see.referralCount + 1,
          amountByReferral : see.amountByReferral + 0.00,
          availableincome : user.availableincome + 0.00,
          totalearning : user.totalearning + 0.00,
        })
      }
        user.update({sponsor: check,
          amountByReferral : user.referralCount + 0.00,
          referralCount : + 0,
          availableincome : user.availableincome + 0.00,
          totalearning : user.totalearning + 0.00,
        })
      }
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user:process.env.user ,
            pass: process.env.pass 
        }, 
        tls:{
               rejectUnauthorized : false
        }
    });
    await transporter.sendMail({
      from: process.env.user,
      to: `${user.email}`,
      subject: 'HOSCE Registration Successful',
      html: `<div><h2>Welcome ${user.fullname} your registration with Hosce is Successful Congratulations!!!</h2>
      <p>Your username:<b> ${user.username}</b></p>
      <p>Your password:<b>${req.body.password}</b></p>
      <p>Please keep your password and username safe</p>
      <h4>Welcome onces again </h4>
      </div>`
  });
      return res.status(201).json({
        status: 'success',
        user: {
          fullname, username, email, tel, gender, bankdetails, link, availableincome, totalearning, status, 
          sponsor: user.sponsor,
          amountByReferral: user.amountByReferral,
          referralCount: user.referralCount
        },
        token,
      });
    }
    } catch (err) {
      console.log(err)
      return res.status(400).json({
       status: 'error',
       error: 'OOp Something went wrong'
      })
    }
  },

  // Login
  async signIn(req, res, next) {
    res.setHeader('content-type', 'application/json');
    const { password, email, username} = req.body;
    if ((!emailRegEx.test(email) && !username) || !password) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Wrong Username/Password combination'
       });
    }
    try {
      const userByEmail = email ? await User.findOne({ where: { email } }) : null;
      if (userByEmail) {
        if (comparePassword(password, userByEmail.password)) {
          const token = createToken(userByEmail);
          return res.status(200).json({
            status: 'success',
            user: {
              username: userByEmail.username, email: userByEmail.email, tel: userByEmail.tel 
            },
            token,
          });
        }
      }
      const userByUsername = username ? await User.findOne({ where: { username } }) : null;
      if (userByUsername) {
        if (comparePassword(password, userByUsername.password)) {
          const token = createToken(userByUsername);
          return res.status(200).json({
            status: 'success',
            user: {
              username: userByUsername.username,
              email: userByUsername.email,
              tel: userByUsername.tel,
              link: userByUsername.link
            },
            token,
          });
        }
      }
      if (!userByUsername && !userByEmail) {
        return res.status(404).json({
           status: 'error',
           error: 'User does not exist'
           });
      }
      return res.status(400).json({
         status: 'error',
         error: 'Wrong Username/Password combination' 
        });
    } catch (err) {
      return next(new Error(err));
    }
  },
};

export default Auth;
