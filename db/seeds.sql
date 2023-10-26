INSERT INTO departments (department_name)
VALUES
    ("Avengers"),
    ("Shield"),
    ("Guardians of the Galaxy"),

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Iron Man", 1000, 1),
    ("Captain America", 950, 1),
    ("Director", 900, 2),
    ("Agent", 850, 2),
    ("Star-Lord", 800, 3),
    ("Rocket", 750, 3),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Tony", "Stark", 1, 1),
    ("Steve", "Rogers", 2, NULL),
    ("Nick", "Fury", 3, 2),
    ("Mariah", "Hill", 4, NULL),
    ("Peter", "Quill", 5, 3),
    ("Rocket", "Raccoon", 6, NULL);