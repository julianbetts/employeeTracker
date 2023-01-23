
const inquirer = require('inquirer')
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

//   view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const questions = [
  {
    type: 'list',
    name: 'department',
    message: 'What kind of license should your project have?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add department', 'add a role', 'add an employee', 'update an employee role', 'exit'],
  },

]

const departmentQuestion = [
  {
    type: 'input',
    name: 'department_name',
    message: 'what is the name of new department?',
  },
]

const roleQuestion = [
  {
    type: 'input',
    name: 'title',
    message: 'what is the title name?',
  },

  {
    type: 'input',
    name: 'salary',
    message: 'what is the salary?',
  },
  
  {
    type: 'input',
    name: 'department_id',
    message: 'enter department id',
  }

]

const employeeQuestion = [
  {
    type: 'input',
    name: 'first_name',
    message: 'enter first name',
  },

  {
    type: 'input',
    name: 'last_name',
    message: 'enter last name',
  },

  {
    type: 'input',
    name: 'role_id',
    message: 'enter role id',
  },

  {
    type: 'input',
    name: 'manager_id',
    message: 'enter manager id',
  },
]

const updateRoleQ = [

  {
    type: 'input',
    name: 'employee_id',
    message: 'enter new employee id',
  },

  {
    type: 'input',
    name: 'role_id',
    message: 'enter new role id',
  },

]

//yellow is outer most, purple, then blue, then cycles
function promptfunc() {
  inquirer.prompt(questions).then((data) => {
    if (data.department === 'view all departments') {

      const sql = `SELECT * FROM department`;

      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err)
        }
        console.table(rows)
        promptfunc()
      });
    } else if (data.department === 'view all roles') {

      const sql = `SELECT * FROM role`;

      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err)
        }
        console.table(rows)
        promptfunc()
      });
    } else if (data.department === 'view all employees') {

      const sql = `SELECT * FROM employee`;

      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err)
        }
        console.table(rows)
        promptfunc()
      });
    } else if (data.department === 'add a role') {

      inquirer.prompt(roleQuestion).then(data => {
        console.log(data)
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;

        db.query(sql, [data.title, data.salary, data.department_id ], (err, rows) => {
          if (err) {
            console.log(err)
          }
          console.log('added new department')
          promptfunc()
        });

      })

    } else if (data.department === 'add department') {
      
      inquirer.prompt(departmentQuestion).then(data => {
        console.log(data)
        const sql = `INSERT INTO department (department_name)
        VALUES (?)`;

        db.query(sql, [data.department_name], (err, rows) => {
          if (err) {
            console.log(err)
          }
          console.log('added new department')
          promptfunc()
        });

      })
    } else if (data.department === 'add an employee') {

      inquirer.prompt(employeeQuestion).then(data => {
        console.log(data)
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;

        db.query(sql, [data.first_name, data.last_name, data.role_id, data.manager_id], (err, rows) => {
          if (err) {
            console.log(err)
          }
          console.log('added new employee')
          promptfunc()
        });

      })
      
    }else if (data.department === 'update an employee role') {

      inquirer.prompt(updateRoleQ).then(data => {
        console.log(data)
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

        db.query(sql, [data.role_id, data.employee_id], (err, rows) => {
          if (err) {
            console.log(err)
          }
          console.log('updated employee')
          promptfunc()
        });

      })

    } else {
      exit()
    }
  })
}

function exit() { //add to end else chain
  process.exit(0)
}

promptfunc()