#installs DB. Requres installed and running postgresql
DB_NAME=ti_hw_db
DB_USER=ti_hw
DB_USER_PASS=ti_hw
su postgres <<EOF
createdb  $DB_NAME;
psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_USER_PASS';"

psql -U postgres -d  $DB_NAME -c "CREATE TABLE IF NOT EXISTS reqType ( 
	id			SERIAL PRIMARY KEY,
	name		VARCHAR(45) NOT NULL,
	weight		INTEGER
);"

psql -U postgres -d  $DB_NAME -c "CREATE TABLE IF NOT EXISTS emploee ( 
	code		SERIAL PRIMARY KEY,
	name		VARCHAR(45) NOT NULL,
	surname		VARCHAR(45) NOT NULL,
	fathername	VARCHAR(45) NOT NULL
);"

psql -U postgres -d  $DB_NAME -c "CREATE TABLE IF NOT EXISTS request ( 
	id					SERIAL PRIMARY KEY,
	assigner			INTEGER REFERENCES emploee(code) ON DELETE CASCADE,
	type				INTEGER REFERENCES reqType(id) ON DELETE CASCADE,
	address				VARCHAR(45) NOT NULL
);"

psql -U postgres -d  $DB_NAME -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public to $DB_USER;"
psql -U postgres -d  $DB_NAME -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public to $DB_USER;"
echo "Postgres User '$DB_USER' and database '$DB_NAME' created."
EOF