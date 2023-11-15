const mysql = require("mysql2/promise");

class Role {
  constructor(role_title, role_salary, department_id) {
    this.role_title = role_title;
    this.role_salary = role_salary;
    this.department_id = department_id;
    this.dbConfig = {
      host: "localhost",
      user: "root",
      password: "Carrtoon27!",
      database: "employees_db",
    };
  }

  async executeQuery(query, params = []) {
    const connection = await mysql.createConnection(this.dbConfig);
    try {
      const [rows, fields] = await connection.execute(query, params);
      return rows;
    } finally {
      await connection.end();
    }
  }

  async roleInsert() {
    const insertQuery = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [this.role_title, this.role_salary, this.department_id];
    await this.executeQuery(insertQuery, params);
    console.log(`\n ***SUCCESSFULLY ADDED THIS ROLE*** \n`);
  }

  async roleSelectAll() {
    const selectQuery = `SELECT id, title, salary, department_id FROM role`;
    return await this.executeQuery(selectQuery);
  }

  async roleDelete(id) {
    const delQuery = `DELETE FROM role WHERE id = ?`;
    const params = [id];
    await this.executeQuery(delQuery, params);
    console.log(`\n ***SUCCESSFULLY DELETED THIS ROLE*** \n`);
  }
}

module.exports = Role;
