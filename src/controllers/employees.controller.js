/**
 * controlador de empleados
 */

 const db = require("../config/database");

 // ==> Metodo responsable de crear empleado:
 exports.createEmployee = async (req, res) => {
   const { id, name, role, salary, birth } = req.body;
   try {
     const { rows } = await db.query(
       "INSERT INTO employee ( name, role, salary, birth) VALUES ($1, $2, $3, $4)",
       [id, name, role, salary, birth]
     );
     res.status(201).send({
       message: "Empleado agregado",
       body: {
         employee: { name, role, salary, birth },
       },
     });
   } catch (error) {
     console.error('createEmployee', error);
     res.status(500).send({
       message: "Ocurrio un error"
     });
   }
 };
 
 // ==> Metodo responsable de mostrar lista de empleados:
 exports.listAllEmployees = async (req, res) => {
   try {
     const { rows } = await db.query(`SELECT 
                                       id,
                                       name, 
                                       role, 
                                       salary,  
                                       to_char(birth, 'yyyy-MM-dd') as birth 
                                     FROM employee ORDER BY name asc`);
     res.status(200).send(rows);
   } catch (error) {
     console.error('listAllEmployees', error);
     res.status(500).send({
       message: "Ocurrio un error"
     });
   }
 };
 
 // ==> Metodo responsable de mostrar empleado por Id:
 exports.findEmployeeById = async (req, res) => {
   const { id } = req.params;
   try {
     const { rows } = await db.query(`SELECT 
                                       id,
                                       name, 
                                       role,
                                       salary,
                                       to_char(birth, 'yyyy-MM-dd') as birth 
                                     FROM employee WHERE id = $1`,
       [id]
     );
     if (!rows.length) {
       throw 'Empleado no encontrado';
     }
     res.status(200).send(rows[0]);
   } catch (error) {
     console.error('findEmployeeById', error);
     if (error == 'Empleado no encontrado') {
       res.status(404).send({
         message: "Empleado no encontrado"
       });
     } else {
       res.status(500).send({
         message: "Ocurrio un error"
       });
     }
   }
 };
 
 // ==> Metodo responsable de actualizar un empleado por un id dado:
 exports.updateEmployeeById = async (req, res) => {
   const { id } = req.params;
   try {
     const { name, role, salary, birth } = req.body;
     const { rows } = await db.query(`UPDATE employee 
                                     SET name = $1, 
                                     role = $2, 
                                     salary = $3, 
                                     birth = $4,  
                                     WHERE id = $5`,
       [name, job_role, salary, birth, employee_registration, id]
     );
     res.status(200).send({ message: "Empleado actualizado" });
   } catch (error) {
     console.error('updateEmployeeById', error);
     res.status(500).send({
       message: "Ocorrio un error"
     });
   }
 };
 
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