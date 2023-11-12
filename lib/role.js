const mysql = require('mysql2/promise');

class Role {
    constructor (role_title, role_salary, department_id) {
        this.role_title = role_title;
        this.role_salary = role_salary;
        this.department_id = department_id;
        
    }
    async roleInserst() {
        const db = await mysql.createConnection(
            {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_db',
        }
        );
        const insertQery = `insert into role (title, salary, department_id) values (?,?,?)`
        const params = [this.role_title, this.role_salary, this.department_id];
        const [rows, fields] = await db.execute(insertQery, params);
        console.log(`\n ***SUCCESSFULLY ADDED THIS ROLE*** \n`)
        return(rows);
    }

    async roleSelectAll() {
        const db = await mysql.createConnection(
            {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_db',
        },
    );
        const selectQery = `select id, title, salary, department_id from role`;
        const [rows, fields] = await db.execute(selectQery);
        return(rows);
    }

    async roleDelete(id) {
        const db = await mysql.createConnection(
            {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_db',
            }
        );
        const deleteQery = `delete from role where id = ?`;
        const params = [id];
        const [rows, fields] = await db.execute(deleteQery, params);
        console.log(`\n ***SUCCESSFULLY DELETED THIS ROLE*** \n`);
        return;
    }
}

module.exports = Role;