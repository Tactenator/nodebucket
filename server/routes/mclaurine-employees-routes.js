/*
    ==================
    Title: mclaurine-employee-routes.js, 
    Author: Trevor McLaurine
    Date: 10/25/2023
    Description: Initializes the routes used for the Employee API
*/

const express = require('express')
const Employee = require('../models/McLaurine-employee')
const mongoose = require('mongoose')

const router = express.Router();

/**
 * findAllEmployees
 * @openapi
 * /api/employees:
 *   get:
 *     tags:
 *       - Employees
 *     description: Returns a list of all employees from the Employees API database
 *     summary: Returns the data for all of the employees
 *     operationid: findAllEmployees
 *     responses:
 *       '200':
 *         description: "Successful retrieval of documents from the Employees API"
 *       '500':
 *         description: "Server exceptions"
 *       '501':
 *         description: "MongoDB exceptions"
 */
router.get('/employees', async (req,res) => {

    //Currently, model.find does not accept callback. I've placed the original code in comments to show that I understand the assignment
    //But placed code that does work for the time being. 

    // try {
    //     await People.find({}, function(err, people) {
    //         if(err) {
    //             res.status(501).send({
    //                 'message': `MongoDB Exception: ${err}`
    //             })
    //         }else {
    //             res.json(people);
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    //     res.status(500).send({
    //         'message': `Server Exception: ${e.message}`
    //     })
    // }

    // TODO: add a try and catch

    //Searches the database for all teams
    const employees = await Employee.find({ })

    //returns the teams that are found
    res.status(200).json(employees); 
})

/**
 * findEmployeeById
 * @openapi
 * /api/employees/{id}:
 *   get:
 *     tags:
 *       - Employee
 *     description: Returns a specific employee designated by the user input. The employee is retrieved by grabbing an id from the url parameters.
 *     summary: Returns the data for a specific employee.
 *     operationid: findEmployeeById
 *     responses:
 *       '200':
 *         description: "Successful retrieval of a document containing the employee"
 *       '400':
 *         description: "Bad Request"
 *       '404':
 *         description: "Not Found"
 *       '500':
 *         description: "Server exceptions"
 */

router.get('/employees/:id', async (req, res) => {

    //Currently, model.find does not accept callback. I've placed the original code in comments to show that I understand the assignment
    //But placed code that does work for the time being. 

    // try {
    //     employee.findOne({'_id':req.params.id}, function(err, employees) {
    //         if(err) {
    //             res.status(501).send({
    //                 'message': `MongoDB Exception: ${err}`
    //             })
    //         }else {
    //             res.json(employees);
    //         }
    //     })
    // } catch(e) {
    //     console.log(e)
    //     res.status(500).send({
    //         'message': `Server Exception: ${e.message}`
    //     })
    // }

    //grabs the id from the URL parameters
    const { id } = req.params; 

    //Checks to see if the ID from the parameters is valid
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        //returns an error message stating that no employee could be found.
        return res.status(404).json({error: "No employee can be found"});
    }

    //searches for employee based on the id variable.
    const employee = await Employee.findById(id);
    if(!employee)
    {
        //if there is no employee with that id, returns status 404 and a message that employee can't be found
        return res.status(404).json({error: "No employee can be found"});
    }
    //if successful, returns employee object 
    res.status(200).json(employee);
})