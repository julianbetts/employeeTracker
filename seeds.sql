INSERT INTO department (department_name)
VALUES ('humanResources'),
('sales'),
('costodial');

INSERT INTO role (title, salary, department_id)
VALUES ( 'tech', 200, 1),
       ( 'hr', 300, 2),
       ( 'helper', 2000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ( 'john', 'doe', 1, null),
       ( 'jane', 'doe', 2, null),
       ( 'sam', 'frodo', 3, null);