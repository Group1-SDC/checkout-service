-- Inside the root directory,
    -- run cqlsh -f database/cass/schema.cql

DROP KEYSPACE IF EXISTS checkout;

CREATE KEYSPACE checkout
    WITH REPLICATION = {
        'class' : 'SimpleStrategy',
        'replication_factor' : 1
    } ;

USE checkout;

DROP TABLE IF EXISTS checkout.items;

CREATE TABLE items (
    id int PRIMARY KEY,
    category varchar,
    name varchar,
    base_price varchar,
    current_price varchar,
    primary_color varchar,
    secondary_color varchar,
    tertiary_color varchar,
    heart boolean,
    sizes list<varchar>
);

COPY items FROM '/Users/AndrewSong/SDC/checkout-service/database/csv/items_colors_sizes.csv' WITH DELIMITER='|' AND HEADER=TRUE;
