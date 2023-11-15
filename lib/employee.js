const mysql = require("mysql2/promise");

class Employee {
  constructor(fName, lName, roleID, manager_id) {
    this.first_name = fName;
    this.last_name = lName;
    this.role_id = roleID;
    this.manager_id = manager_id;
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

  async empInsert() {
    const insertQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [this.first_name, this.last_name, this.role_id, this.manager_id];
    await this.executeQuery(insertQuery, params);
    console.log(`\n ***SUCCESSFULLY ADDED THE EMPLOYEE *** \n`);
  }

  async empSelectAll() {
    const selectQuery = `SELECT id, first_name, last_name, role_id, manager_id FROM employee`;
    return await this.executeQuery(selectQuery);
  }
}

module.exports = Employee;
