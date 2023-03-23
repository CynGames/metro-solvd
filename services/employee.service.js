const fs = require('fs');
const employees = require("../database/data/employees.data.json");

const find = async (req) => {
    const {name, password} = req.body;

    const employeesData = JSON.parse(fs.readFileSync('./database/data/employees.data.json', 'utf8'));


    return employeesData.find(employee => employee.name === name && employee.password === password);
}

const create = async (req) => {
    if (!req.body.name || !req.body.password) {
        return false;
    }

    const {name, password} = req.body;

    const employee = {
        name,
        password
    }

    employees.push(employee);

    fs.writeFileSync('./database/data/employees.data.json', JSON.stringify(employees));

    return true;
}

module.exports = {
    find,
    create
}
