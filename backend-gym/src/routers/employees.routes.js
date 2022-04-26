/**
 * Definicion de rutas
*/
const { Router } = require('express');
const { getEmployees, createEmployee, getEmployeeById, updateEmployeeById, deleteEmployeeById } = require('../controllers/employees.controller');
const router = Router();

router.get('/employees', getEmployees);
router.post('/employees', createEmployee);
router.get('/employees/:id', getEmployeeById);
router.put('/employees/:id', updateEmployeeById);
router.delete('/employees/:id', deleteEmployeeById);

module.exports = router;