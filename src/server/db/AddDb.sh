#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE DATABASE gambit;
	\connect gambit
	CREATE TABLE users (email text primary key,salt text, password_hash text);
EOSQL
