
import express from 'express';
import {Employee} from "./entities/employee.js";
import {roles} from "./entities/roles.js";
import {Grade} from "./entities/grade.js";

const app = express();
const employeeList = [new Employee(roles.employee, new Grade())]

app.get("/", (request, response) =>{

    response.send("<h2>Привет Express!</h2>");
});

app.get("/", (request, response) =>{

    response.send("<h2>Привет Express!</h2>");
});

app.get("/employee", (request, response) => {
    response.send(employeeList)
})

app.listen(3000);
