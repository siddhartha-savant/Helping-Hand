import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

// This creates the route for URL and call the controller when specific command is found

router.route('/users')
    .get(userController.index)
    .post(userController.save)


router.route('/users/login').post(userController.authUser);

router.route('/users/verify/:id').get(userController.verifyUser);

router.route('/users/:id')
    .get(userController.get)
    .put(userController.update)
    .delete(userController.remove);

router.route('/visit')
    .get(userController.index1)
    .post(userController.saveVisit)

router.route('/visit/:id')
    .get(userController.getVisit)
    .put(userController.updateVisit)

export default router;