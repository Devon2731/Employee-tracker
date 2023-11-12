const mysql = require('mysql2/promise');

class Employee {
    constructor (first_name, last_name, role_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
    async employeeInsert() {
        const db = await mysql.createConnection(
            {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_db',
        }
        );
        const insertQery = `insert into employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)`
        const params = [this.first_name, this.last_name, this.role_id, this.manager_id];
        const [rows, fields] = await db.execute(insertQery, params);
        console.log(`\n ***SUCCESSFULLY ADDED THIS EMPLOYEE*** \n`)
        return;
    }

    async employeeSelectAll() {
        const db = await mysql.createConnection(
            {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_db',
        },
        console.log(`Connecting to the employee database`));
        const selectQery = `select id, first_name, last_name, role_id, manager_id from employee`;
        const [rows, fields] = await db.execute(selectQery);
        return(rows);
    }
}

module.exports = Employee;