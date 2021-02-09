CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(100),
    password varchar(100)
);

CREATE TABLE lists (
    id serial PRIMARY KEY,
    name varchar(100),
    user_id integer REFERENCES users (id)
);

CREATE TABLE items (
    id serial PRIMARY KEY,
    name varchar(100),
    is_completed BOOLEAN,
    list_id integer REFERENCES list (id)
);