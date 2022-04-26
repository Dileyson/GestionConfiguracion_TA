/**
 * controlador de empleados
 */
// const res = require('express/lib/response');
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  password: config.dbPassword,
  database: config.dbDatabase,
  port: config.dbPort
});

const getEmployees = async (req, res) => {
  const response = await pool.query('SELECT * FROM employee')
  res.status(200).json(response.rows);
};

const createEmployee = async (req, res) => {
  const { name, role, salary, birth } = req.body;
  try {
    const response = await pool.query("INSERT INTO employee ( name, role, salary, birth) VALUES ($1, $2, $3, $4)",
      [name, role, salary, birth]);
    res.status(201).send({
      message: "Empleado agregado",
      body: {
        employee: { name, role, salary, birth },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getEmployeeById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
  }
}

const updateEmployeeById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { name, role, salary, birth } = req.body;
    const response = await pool.query(`UPDATE employee 
    SET name = $1, 
    role = $2, 
    salary = $3, 
    birth = $4  
    WHERE id = $5`,
      [name, role, salary, birth, id]
    )
    res.status(201).send({
      message: "Empleado Actualizado",
      body: {
        employee: { name, role, salary, birth },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

const deleteEmployeeById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await pool.query('DELETE FROM employee WHERE id = $1', [id]);
    res.status(200).send({ message: "Empleado borrado" });
  } catch (error) {
    console.error('deleteEmployeeById', error);
    res.status(500).send({
      message: "Ocurrio un error"
    });
  }
}

// ==> Método eliminar un empleado con un id dado:
exports.deleteEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM employee WHERE id = $1", [id]);
    res.status(200).send({ message: "Empleado borrado" });
  } catch (error) {
    console.error('deleteEmployeeById', error);
    res.status(500).send({
      message: "Ocurrio un error"
    });
  }
};

module.exports = { getEmployees, createEmployee, getEmployeeById, updateEmployeeById, deleteEmployeeById }