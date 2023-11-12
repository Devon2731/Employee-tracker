INSERT INTO department (department_name)
VALUES ("Executive"),
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("QA");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 1000000, 1),
    ("Sr.Accountant", 100000,2)
    ("Mech Engineer", 90000,4),
    ("Jr. QA", 70000, 5),
    ("Sales Manager", 90000, 3);
    ("Enigeerung Manger", 220000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, 1);
  

    