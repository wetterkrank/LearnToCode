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

      conn.query("SELECT todo_rel.title, users_rel.name FROM todo_rel JOIN users_rel ON users_rel.id = todo_rel.user_id")
        .then((rows) => {
          console.log(rows); // выдает title, name; meta
          conn.end();
          pool.end();
        })
        .catch(err => {
        //handle error
        console.log("Some error:", err); 
        conn.end();
        })

    }).catch(err => {
      console.log("Couldn't connect:", err)
      //not connected
    });

console.log("Exit finally");