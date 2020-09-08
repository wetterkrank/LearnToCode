const mariadb = require('mariadb/callback');
  const conn = mariadb.createConnection({host: 'localhost', user:'root', password: '', database: 'webdev101test'});
  conn.query("SELECT NOW()", (err, rows) => {
      console.log(rows);
      conn.end();
  });