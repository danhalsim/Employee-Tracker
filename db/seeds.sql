INSERT INTO departments (department_name)
VALUES
    ("Avengers"),
    ("Shield"),
    ("Guardians of the Galaxy");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Iron Man", 990, 1),
    ("Captain America", 900, 1),
    ("Director", 950, 2),
    ("Agent", 850, 2),
    ("Star-Lord", 800, 3),
    ("Rocket", 750, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
    ("Tony", "Stark", 1, NULL),
    ("Steve", "Rogers", 2, NULL),
    ("Nick", "Fury", 3, NULL),
    ("Mariah", "Hill", 4, 3),
    ("Peter", "Quill", 5, NULL),
    ("Rocket", "Raccoon", 6, 5);