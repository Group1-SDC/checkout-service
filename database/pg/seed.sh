#!/bin/bash

###################################
# Bash script to create db and seed
###################################

# Path to bash script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)"

#Database variables
DATABASE="checkout"

#Import csv files
SIZES="database/csv/sizes.csv"
COLORS="database/csv/colors.csv"
ITEMS="database/csv/items.csv"

# Import db
SCHEMA="$DIR/schema.sql"
psql checkout < $SCHEMA

# Import CSV files into db
psql -d $DATABASE -c "\copy sizes (id, sizes) FROM '$SIZES' CSV HEADER;"

psql -d $DATABASE -c "\copy colors (id, color) FROM '$COLORS' CSV HEADER;"

psql -d $DATABASE -c "\copy items (id, category, name, base_price, current_price, primary_color, secondary_color, tertiary_color, heart, sizes) FROM '$ITEMS' CSV HEADER;"
