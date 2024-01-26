#clear all tables with everything in it
DB_NAME=ti_hw_db
su postgres <<EOF
psql -U postgres  -d $DB_NAME -c "TRUNCATE TABLE reqType CASCADE;"
psql -U postgres  -d $DB_NAME -c "TRUNCATE TABLE emploee CASCADE;"
psql -U postgres  -d $DB_NAME -c "TRUNCATE TABLE request CASCADE;"
echo "Database '$DB_NAME' is above."
EOF
