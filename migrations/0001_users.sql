-- Migration number: 0001 	 2024-07-04T06:28:57.853Z
-- Migration number: 0001 	 2023-12-29T05:13:41.515Z
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, user_name TEXT);