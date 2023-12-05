const { Router } = require('express');
const { getCourses, getCourseFromId } = require('../controllers/cursos');
const { validateJWT } = require('../middlewares/verifyJWT');
const router = Router();

router.get("/", getCourses);
router.get("/:id", [validateJWT], getCourseFromId);

module.exports = router;