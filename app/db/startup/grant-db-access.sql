GRANT ALL PRIVILEGES ON upnext.* TO 'admin'@'%' WITH GRANT OPTION;
ALTER USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;