const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost',
     user:'root',
     password: '',
     database: 'webdev101test',
     connectionLimit: 5
});

pool.getConnection()
    .then(conn => {

        // conn.query('create table todo_rel(ID SERIAL PRIMARY KEY, title varchar(255), created_at timestamp, status int)', (err, res) => {
        // conn.query('create table users_rel(ID SERIAL PRIMARY KEY, name varchar(255))', (err, res) => {
        // conn.query('alter table todo_rel add column user_id integer', (err, res) => {
        // conn.query('insert into users_rel(name) values(\'Gandalf\'),(\'Frodo\'),(\'Bilbo\')', (err, res) => {
        conn.query("insert into todo_rel(title, user_id) values('Wake up', 1), ('Stand up', 2), ('Get down', 2)", (err, res) => {
            console.log(err, res)
            conn.end();
        })

    }).catch(err => {
        console.log(err);
      //not connected
    });