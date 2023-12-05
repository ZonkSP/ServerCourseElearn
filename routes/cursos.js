const { Router } = require('express');
const { getCourses, getCourseFromId, getCoursesofProfessor, addCurso, deleteCurso } = require('../controllers/cursos');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyRole } = require('../middlewares/verifyRole');
const router = Router();

router.get("/", getCourses);
router.get("/coursesTeacher", [validateJWT, verifyRole], getCoursesofProfessor);
router.get("/:id", [validateJWT], getCourseFromId);
router.post("/addCurso", [validateJWT, verifyRole], addCurso);
router.delete("/:id", [validateJWT, verifyRole], deleteCurso);

module.exports = router;