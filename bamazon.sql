create database bamazon;
use bamazon;
create table products (
item_id integer not null auto_increment,
product_name varchar(50) not null, 
department_name varchar(50) null, 
price decimal(10,2) null, 
stock_quantity integer(10) null,
primary key (item_id)
);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (1, "Super Smash Bros Ultimate", "Video Game", 56.99, 100),
(2, "LazerTag", "Toys", 89.99, 15),
(3, "Greenies Pill Pocket Soft Dog Treats", "Dog Treats", 16.99, 130),
(4, "Catan", "Board Game", 42.90, 60),
(5, "Carbonated Bubble Clay Mask", "Skin Care", 9.45, 200),
(6, "Kellogg's Eggo Frozen Waffles", "Frozen Food", 2.59, 300),
(7, "Stainless Steel Mixing Bowls", "Kitchen", 26.99, 80),
(8, "Clear Bubble Umbrella", "Luggage & Travel Gear", 15.99, 190),
(9, "Organnic Bananas", "Fresh Produce", 1.33, 500), 
(10, "Dunder Mifflin Office T-shirt", "Clothing", 12.50, 300);