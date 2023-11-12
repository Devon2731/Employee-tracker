const mysql = require('mysql2/promise');

class Department {
    constructor (department_name) {
        this.department_name = department_name;
    }
    
    async deptInsert() {
        const db = await mysql.createConnection(
            {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_db',
        }
        );
        const insertQery = `insert into department (department_name) values (?)`
        const params = [this.department_name];
        const [rows, fields] = await db.execute(insertQery, params);
        console.log(`\n ***SUCCESSFULLY ADDED THIS DEPARTMENT*** \n`);
        return;
    }

    async deptSelectAll() {
        const db = await mysql.createConnection(
            {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_db',
        },
        console.log(`Connecting to the employee database...`));
        const selectQery = `select id, department_name from department`;
        const [rows, fields] = await db.execute(selectQery);
        return(rows);
    }
    
}

module.exports = Department;