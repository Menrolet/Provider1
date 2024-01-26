DB_NAME=ti_hw_db
su postgres <<EOF
psql -U postgres  -d $DB_NAME -c "INSERT INTO emploee(surname, name, fathername) VALUES('Иванов', 'Иван', 'Иванович')"
psql -U postgres  -d $DB_NAME -c "INSERT INTO emploee(surname, name, fathername) VALUES('Сидоров', 'Сидор', 'Сидорович')"

psql -U postgres  -d $DB_NAME -c "INSERT INTO reqType(name, weight) VALUES('Простая установка', 100)"
psql -U postgres  -d $DB_NAME -c "INSERT INTO reqType(name, weight) VALUES('Полная установка', 200)"

echo "Database '$DB_NAME' is above."
EOF