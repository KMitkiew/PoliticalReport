const express = require('express');
const router = express.Router();

const {
	getUserData,
	updateUserData,
	getPoliticData,
	updateSubscriptionStatus,
	changeSubscriptionNumber,
	createUser,
} = require('../controllers/user');

router.route('/').get(getUserData);
router.route('/user-details').put(updateUserData);
router.route('/observations').get(getPoliticData);
router.route('/observations/:politicId').put(updateSubscriptionStatus);
router.route('/subscription/:politicId').put(changeSubscriptionNumber);
router.route('/').post(createUser);

module.exports = router;
