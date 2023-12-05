const { Router } = require('express');
const { getEnroll, signInCurso, signOutCurso } = require('../controllers/enroll');
const { validateJWT } = require('../middlewares/verifyJWT');
const router = Router();

router.get("/", [validateJWT], getEnroll);
router.post("/:id", [validateJWT], signInCurso);
router.delete("/:id", [validateJWT], signOutCurso);

module.exports = router;