const inquirer = require('inquirer');
const Department = require('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');

async function mainPrompt() {
  try {
    const answers = await inquirer.prompt({
      message: "What would you like to do?",
      name: "likeToDo",
      type: "list",
      choices: [
        "view all departments",
        "add a new department",
        "view all roles",
        "add a new role",
        "view all employees",
        "add a new employee",
        "update an employee role",
        "update an employee manager",
        "delete an employee",
        "delete a role",
        "delete a department",
        "all done!!"
      ],
      filter(val) {
        return val.toLowerCase();
      }
    });

    switch (answers.likeToDo.toLowerCase()) {
      case 'view all departments':
        await displayAllDepts();
        break;
      case 'view all roles':
        await displayAllRoles();
        break;
      case 'view all employees':
        await displayAllEmployees();
        break;
      case 'add a new department':
        await addDepartment();
        break;
      case 'add a new role':
        await addRole();
        break;
      case 'add a new employee':
        await addEmployee();
        break;
      case 'update an employee role':
        await updateEmployeeRole();
        break;
      case 'update an employee manager':
        await updateEmployeeManager();
        break;
      case 'delete an employee':
        await deleteEmployee();
        break;
      case 'delete a role':
        await deleteRole();
        break;
      case 'delete a department':
        await deleteDepartment();
        break;
      case 'all done!!':
        console.log('Hope you loved using employee manager!!');
        process.exit(0);
      default:
        console.log('Invalid option. Please choose a valid option.');
    }
  } catch (error) {
    console.error('Error in main prompt:', error.message);
    process.exit(1);
  }

  return mainPrompt();
}

async function displayAllDepts() {
  try {
    const departmentInstance = new Department();
    const depts = await departmentInstance.deptSelectAll();
    console.log('\n *** LIST OF DEPARTMENTS *** \n');
    console.table(depts);
    console.log('All departments displayed successfully!');
  } catch (err) {
    console.error("Error while fetching and displaying departments", err.message);
    process.exit(1);
  }
}

async function displayAllRoles() {
  try {
    const roleInstance = new Role();
    const roles = await roleInstance.roleSelectAll();
    console.log('\n *** LIST OF ROLES ***\n');
    console.table(roles);
    console.log('All roles displayed successfully!');
  } catch (error) {
    console.error('Error while fetching and displaying roles:', error.message);
    process.exit(1);
  }
}

async function displayAllEmployees() {
  try {
    const employeeInstance = new Employee();
    const employees = await employeeInstance.empSelectAll();
    console.log('\n *** LIST OF EMPLOYEES ***\n');
    console.table(employees);
    console.log('All employees displayed successfully!');
  } catch (error) {
    console.error('Error while fetching and displaying employees:', error.message);
    process.exit(1);
  }
}



async function addRole() {
    try {
      const roleQuestions = [
        {
          message: "Enter the role title:",
          name: "roleTitle",
          type: "input",
        },
        {
          message: "Enter the salary for the role:",
          name: "roleSalary",
          type: "input",
        },
        {
          message: "Enter the department ID for the role:",
          name: "departmentId",
          type: "input",
        },
      ];
  
      const answers = await inquirer.prompt(roleQuestions);
      const roleInstance = new Role(
        answers.roleTitle,
        parseFloat(answers.roleSalary),
        parseInt(answers.departmentId)
      );
  
      await roleInstance.roleInsert();
      console.log('Role added successfully!');
    } catch (error) {
      console.error('Error while adding a new role:', error.message);
    }
  }
  
  async function addEmployee() {
    try {
      const employeeQuestions = [
        {
          message: "Enter the first name:",
          name: "firstName",
          type: "input",
        },
        {
          message: "Enter the last name:",
          name: "lastName",
          type: "input",
        },
        {
          message: "Enter the role ID for the employee:",
          name: "roleId",
          type: "input",
        },
        {
          message: "Enter the manager ID for the employee (or leave empty for none):",
          name: "managerId",
          type: "input",
        },
      ];
  
      const answers = await inquirer.prompt(employeeQuestions);
      const employeeInstance = new Employee(
        answers.firstName,
        answers.lastName,
        parseInt(answers.roleId),
        answers.managerId ? parseInt(answers.managerId) : null
      );
  
      await employeeInstance.empInsert();
      console.log('Employee added successfully!');
    } catch (error) {
      console.error('Error while adding a new employee:', error.message);
    }
  }

  async function updateEmployeeRole() {
    try {
      const employeeQuestions = [
        {
          message: "Enter the ID of the employee whose role you want to update:",
          name: "employeeId",
          type: "input",
        },
        {
          message: "Enter the new role ID for the employee:",
          name: "newRoleId",
          type: "input",
        },
      ];
  
      const answers = await inquirer.prompt(employeeQuestions);
  
      const employeeInstance = new Employee();
      const employeeId = parseInt(answers.employeeId);
      const newRoleId = parseInt(answers.newRoleId);
  
      const employeeExists = await employeeInstance.doesEmployeeExist(employeeId);
  
      if (!employeeExists) {
        console.log(`Employee with ID ${employeeId} does not exist.`);
        return;
      }
  
      await employeeInstance.updateEmployeeRole(employeeId, newRoleId);
  
      console.log(`Role for employee with ID ${employeeId} updated successfully.`);
    } catch (error) {
      console.error('Error while updating employee role:', error.message);
    }
  }

  async function updateEmployeeManager() {
    try {
      const employeeQuestions = [
        {
          message: "Enter the ID of the employee whose manager you want to update:",
          name: "employeeId",
          type: "input",
        },
        {
          message: "Enter the new manager ID for the employee (or leave empty for none):",
          name: "newManagerId",
          type: "input",
        },
      ];
  
      const answers = await inquirer.prompt(employeeQuestions);
  
      const employeeInstance = new Employee();
      const employeeId = parseInt(answers.employeeId);
      const newManagerId = answers.newManagerId ? parseInt(answers.newManagerId) : null;
  
      const employeeExists = await employeeInstance.doesEmployeeExist(employeeId);
  
      if (!employeeExists) {
        console.log(`Employee with ID ${employeeId} does not exist.`);
        return;
      }
  
      await employeeInstance.updateEmployeeManager(employeeId, newManagerId);
  
      console.log(`Manager for employee with ID ${employeeId} updated successfully.`);
    } catch (error) {
      console.error('Error while updating employee manager:', error.message);
    }
  }

  async function deleteEmployee() {
    try {
      const employeeQuestions = [
        {
          message: "Enter the ID of the employee you want to delete:",
          name: "employeeId",
          type: "input",
        },
      ];

      const answers = await inquirer.prompt(employeeQuestions);
      const employeeInstance = new Employee();
      const employeeId = parseInt(answers.employeeId);

      const employeeExists = await employeeInstance.doesEmployeeExist(employeeId);

      if (!employeeExists) {
        console.log(`Employee with ID ${employeeId} does not exist.`);
        return;
      }

      await employeeInstance.deleteEmployee(employeeId);

      console.log(`Employee with ID ${employeeId} deleted successfully.`);
    } catch (error) {
      console.error('Error while deleting employee:', error.message);
    }
  }

  async function deleteRole() {
    try {
      const roleIdAnswer = await inquirer.prompt({
        message: "Enter the ID of the role you want to delete:",
        name: "roleId",
        type: "input",
      });
  
      const roleId = parseInt(roleIdAnswer.roleId);
  
      const roleInstance = new Role();
  
      const roleExists = await roleInstance.doesRoleExist(roleId);
  
      if (roleExists) {
        await roleInstance.roleDelete(roleId);
        console.log(`Role with ID ${roleId} deleted successfully!`);
      } else {
        console.log(`Role with ID ${roleId} does not exist.`);
      }
    } catch (error) {
      console.error('Error while deleting role:', error.message);
    }
  }

  async function deleteDepartment() {
    try {
      const departmentQuestions = [
        {
          message: "Enter the ID of the department you want to delete:",
          name: "departmentId",
          type: "input",
        },
      ];

      const answers = await inquirer.prompt(departmentQuestions);
      const departmentInstance = new Department();
      const departmentId = parseInt(answers.departmentId);

      const departmentExists = await departmentInstance.doesDepartmentExist(departmentId);

      if (!departmentExists) {
        console.log(`Department with ID ${departmentId} does not exist.`);
        return;
      }

      await departmentInstance.deleteDepartment(departmentId);

      console.log(`Department with ID ${departmentId} deleted successfully.`);
    } catch (error) {
         console.error('Error while deleting department:', error.message);
    }
  }
  
  mainPrompt();
