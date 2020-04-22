IF EXISTS
DROP TABLE orders;

CREATE TABLE orders(
customer_id int(10) PRIMARY KEY,
customer_name varchar(100),
town varchar(100),
customer_type varchar(25),
item_name varchar(100), 
item_price int(10),
quantity int(10),
container_oversize varchar(10),
shipping_method varchar(10)
)