
const inquirer = require('inquirer')
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

//   view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

  const questions = [
    {
    type: 'list',
    name: 'department',
    message: 'What kind of license should your project have?',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a role', 'add an employee', 'update an employee role'],
    },

]

inquirer.prompt(questions).then((data) => {
    if (data.department === 'view all departments') {
        
        const sql = `SELECT * FROM department`;
  
        db.query(sql, (err, rows) => {
          if (err) {
            console.log(err)
          }
            console.table(rows)
        });
    } else if (data.department === 'view all roles') {
        
        const sql = `SELECT * FROM role`;
  
        db.query(sql, (err, rows) => {
          if (err) {
            console.log(err)
          }
            console.table(rows)
        });
    }
}
