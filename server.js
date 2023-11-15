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

    switch (answers.likeToDo) {
      case 'view all departments':
        await displayAllDepts();
        break;
      case 'view all roles':
        await displayAllRoles();
        break;
      case 'view all employees':
        await displayAllEmployees();
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

  return mainPrompt(); // Consider using a loop instead of recursion
}

async function displayAllDepts() {
  try {
    const depts = await Department.deptSelectAll();
    console.log('\n *** LIST OF DEPARTMENTS *** \n');
    console.table(depts);
  } catch (err) {
    console.error("Error while fetching and displaying departments", err.message);
  }
}

async function displayAllRoles() {
  try {
    const roles = await Role.roleSelectAll();
    console.log('\n *** LIST OF ROLES ***\n');
    console.table(roles);
  } catch (error) {
    console.error('Error while fetching and displaying roles:', error.message);
  }
}

async function displayAllEmployees() {
  try {
    const employees = await Employee.empSelectAll();
    console.log('\n *** LIST OF EMPLOYEES ***\n');
    console.table(employees);
  } catch (error) {
    console.error('Error while fetching and displaying employees:', error.message);
  }
}

// Start the program with the main prompt
mainPrompt();
