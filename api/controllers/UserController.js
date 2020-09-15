import models from '../models';
import { authorizeAdmins } from '../middlewares/authorization';

const { User } = models;

const UserController = {
  async fetchAll(req, res, next) {
    try {
      const users = await User.findAll();
      return res.status(200).send(users);
    } catch (err) {
      return next(new Error(err));
    }
  },

  async fetchOne(req, res, next) {
    try {
      const user = await User.findByPk(req.params.userId);
      if (!user) {
        return res.status(400).send({ error: 'User does not exist' });
      }
      if(user)
      return res.status(200).send(user);
    } catch (err) {
      return next(new Error(err));
    }
  },

  async update(req, res, next) {
    try {
      const { userId } = req.params;
      const {
        fullname, tel, gender, bankdetails, status, role, availableincome, totalearning
      } = req.body;
      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        return res.status(400).send({ error: 'User does not exist' });
      }
      const updatedUser = await existingUser.update({
        fullname: fullname || existingUser.fullname,
        tel: tel || existingUser.tel,
        gender: gender || existingUser.gender,
        bankdetails: bankdetails || existingUser.bankdetails,
        status: status || existingUser.status,
        role: role || existingUser.role,
        availableincome: availableincome || existingUser.availableincome,
        totalearning: totalearning || existingUser.totalearning
        
      });
      return res.status(200).send(updatedUser);
    } catch (err) {
      return next(new Error(err));
    }
  },

  async delete(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).send({ error: 'User does not exist' });
      }
      await user.destroy();
      return res.status(200).send({});
    } catch (err) {
      return next(new Error(err));
    }
  }
};

export default UserController;
