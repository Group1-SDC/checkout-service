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

# Run generate.js
node database/generate.js

# Import CSV files into db
psql -d $DATABASE -c "\copy sizes FROM '$SIZES' CSV HEADER;"

psql -d $DATABASE -c "\copy colors FROM '$COLORS' CSV HEADER;"

psql -d $DATABASE -c "\copy items FROM '$ITEMS' CSV HEADER;"
