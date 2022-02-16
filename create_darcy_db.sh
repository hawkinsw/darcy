#/usr/bin/env bash 

rm -rf darcy.db 2>&1 > /dev/null

echo "create table eslint (key varchar(255), value varchar(255));" | sqlite3 darcy.db

if [ $? -eq 0 ]; then
				echo "Successfully created the eslint table in the Darcy database."
				exit 0;
else
				echo "Failed to create the eslint table in the Darcy database."
				exit 1;
fi
