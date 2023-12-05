const { Router } = require('express');
const { registerUser, getUsers, loginUser, getInforUser } = require('../controllers/users');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyRole } = require('../middlewares/verifyRole');
const router = Router();

router.get("/", [validateJWT, verifyRole], getUsers);
router.get("/infoUser", [validateJWT], getInforUser);
router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;