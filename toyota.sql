USE `toyota_db`;

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders`
(
`customer_id` int
(10) PRIMARY KEY NOT NULL,
`customer_name` varchar
(100) DEFAULT NULL,
`customer_town` varchar
(100) DEFAULT NULL,
`customer_type` varchar
(25) DEFAULT NULL,
`item_name` varchar
(100) DEFAULT NULL, 
`item_code` int
(100) DEFAULT NULL, 
`quantity` int
(10) DEFAULT NULL,
`container_oversize` varchar
(10) DEFAULT NULL,
`shipping_method` varchar
(10) DEFAULT NULL
);