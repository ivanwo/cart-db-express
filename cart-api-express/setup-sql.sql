--db setup steps
CREATE TABLE cart
(
    id SERIAL PRIMARY KEY,
    product VARCHAR(40),
    price FLOAT,
    quantity SMALLINT
);
INSERT INTO cart
    (product, price, quantity)
VALUES
    ('Jelly', 1, 10);
INSERT INTO cart
    (product, price, quantity)
VALUES
    ('Jam', 1.5, 10);
INSERT INTO cart
    (product, price, quantity)
VALUES
    ('Marmalade', 2, 10);