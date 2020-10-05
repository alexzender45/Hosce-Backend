import { validateSignUp } from '../middlewares/authentication';
import Auth from '../controllers/AuthController';
import { authorizeUsers, authorizeAdmins, isAdmin } from '../middlewares/authorization';
import UserController from '../controllers/UserController';
import { validateCode } from '../middlewares/code'
import CodeGen from '../controllers/CodeController'

const routes = (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Voiceer API' });
  });

  /**
   * AUTHENTICATION ENDPOINTS
   */
  app.post('/api/auth/sign_up', validateSignUp, Auth.signUp);
  app.post('/api/auth/sign_in', Auth.signIn);

  /**
   * USER ENDPOINTS
   */
  app.get('/api/users',authorizeUsers, authorizeAdmins, UserController.fetchAll);
  app.get('/api/users/:userId', authorizeUsers, UserController.fetchOne);
  app.put('/api/users/:userId', authorizeUsers, authorizeAdmins, UserController.update);
  app.post('/api/users/:userId', authorizeUsers, authorizeAdmins, UserController.changeStatus);
  app.delete('/api/users/:userId', authorizeUsers, authorizeAdmins, UserController.delete);
/**
   * CODE ENDPOINTS
   */
  app.post('/api/create_code',validateCode, CodeGen.generateCode);
  app.get('/api/all_codes', authorizeUsers, authorizeAdmins, CodeGen.fetchAllCodes);
};
export default routes;