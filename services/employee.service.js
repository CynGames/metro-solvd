// const fs = require('fs');
// const employees = require('../metro_db/data/employees.data.json');
//
// const find = async (req) => {
//     const { name, password } = req.body;
//
// eslint-disable-next-line max-len
//     const employeesData = JSON.parse(fs.readFileSync('./metro_db/data/employees.data.json', 'utf8'));
//
// eslint-disable-next-line max-len
//     return employeesData.find((employee) => employee.name === name && employee.password === password);
// };
//
// const create = async (req) => {
//     if (!req.body.name || !req.body.password) {
//         return false;
//     }
//
//     const { name, password } = req.body;
//
//     const employee = {
//         name,
//         password,
//     };
//
//     employees.push(employee);
//
//     fs.writeFileSync('./metro_db/data/employees.data.json', JSON.stringify(employees));
//
//     return true;
// };
//
// module.exports = {
//     find,
//     create,
// };
