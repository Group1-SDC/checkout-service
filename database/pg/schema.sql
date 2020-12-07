-- In the service's root directory, 
    -- $ npm run seedPG
DROP DATABASE IF EXISTS checkout;

CREATE DATABASE checkout;

\c checkout;

DROP TABLE IF EXISTS sizes CASCADE;
DROP TABLE IF EXISTS colors CASCADE;
DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE sizes (
    id INTEGER PRIMARY KEY,
    sizes VARCHAR(255)
);

CREATE TABLE colors (
    id INTEGER PRIMARY KEY,
    color VARCHAR(255)
);

CREATE TABLE items (
    id INTEGER PRIMARY KEY,
    category VARCHAR(255),
    name VARCHAR(255),
    base_price VARCHAR(255),
    current_price VARCHAR(255),
    primary_color INTEGER REFERENCES colors (id),
    secondary_color INTEGER REFERENCES colors (id),
    tertiary_color INTEGER REFERENCES colors (id),
    heart BOOLEAN,
    sizes INTEGER REFERENCES sizes (id)
);

COPY sizes (id, sizes) FROM '/Users/AndrewSong/SDC/checkout-service/database/csv/sizes.csv' WITH (FORMAT csv, DELIMITER '|', HEADER);

COPY colors (id, color) FROM '/Users/AndrewSong/SDC/checkout-service/database/csv/colors.csv' WITH (FORMAT csv, DELIMITER '|', HEADER);

COPY items (id, category, name, base_price, current_price, primary_color, secondary_color, tertiary_color, heart, sizes) FROM '/Users/AndrewSong/SDC/checkout-service/database/csv/items.csv' WITH (FORMAT csv, DELIMITER '|', HEADER);
