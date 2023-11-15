INSERT INTO department (department_name)
VALUES ("Executive"),
       ("Finance"),
       ("Sales"),
       ("Engineering"),
       ("Legal");

INSERT INTO role (title,salary,department_id) 
VALUES  ('CEO',1000000,1),
        ('Sr.Accountant',100000,2),
        ('Mech Engineer',90000,4),
        ('Lawyer',70000,5),
        ('Sales Manager',90000,3),
        ('Salesperson',60000,3),
        ('Lead Engineer',220000,4);

INSERT into employee (first_name,last_name,role_id,manager_id)
VALUES ('John','Doe',1,),
       ('Mike','Chan',2,5),
        ('Becky','Vicky',3,4)
        ('Jane','Doe',4,2),
        ('Oscar','Gomez',5,3),
        ('Kevin','Tupik',6,3),
        ('Ashley','Rodriguez',7,1)
        ('Kunal','Singh',8,5);

    