const mysql = require("mysql2/promise");

class Department {
  constructor(department_name) {
    this.department_name = department_name;
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
      const [rows] = await connection.execute(query, params);
      return rows;
    } finally {
      await connection.end();
    }
  }

  async deptInsert() {
    const insertQuery = `INSERT INTO department (department_name) VALUES (?)`;
    const params = [this.department_name];
    await this.executeQuery(insertQuery, params);
    console.log(`\n ***SUCCESSFULLY ADDED THIS DEPARTMENT*** \n`);
  }

  async deptSelectAll() {
    const selectQuery = `SELECT id, department_name FROM department`;
    return await this.executeQuery(selectQuery);
  }

  async deptDelete(id) {
    const delQuery = `DELETE FROM department WHERE id = ?`;
    const params = [id];
    await this.executeQuery(delQuery, params);
    console.log(`\n ***SUCCESSFULLY DELETED THIS DEPARTMENT*** \n`);
  }

  async deptUpdate(id) {
    const updateQuery = `UPDATE department SET department_name = ? WHERE id = ?`;
    const params = [this.department_name, id];
    await this.executeQuery(updateQuery, params);
    console.log(`\n ***SUCCESSFULLY UPDATED THIS DEPARTMENT*** \n`);
  }
}

module.exports = Department;
