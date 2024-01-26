#Drop ve_ru database
DB_NAME=ti_hw_db
su postgres <<EOF
dropdb $DB_NAME
EOF