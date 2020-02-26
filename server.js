var express = require('express');
var app = express();

app.get('/api/datasiswa', function (req, res) {
   
    var sql = require("mssql");
    // config for your database
    var config = {
        user: 'su',
        password: 'SaSa1212',
        server: '10.199.13.253', 
        database: 'nrp05111740000078' 
    };
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select Nama from Mahasiswa', function (err, recordset) {
            if (err) console.log(err)
            
            console.log("berhasil")
            res.send(recordset);
        });
    });
});


app.get('/', function (req, res) {
  res.end("Selamat Datang,Implementasi API get di Sql server, request map api di '10.199.14.46:8014/api/datasiswa'");
  // return "Implementasi API get di Sql server, request map api di '10.199.14.46:8014/api/datasiswa'"
});

var server = app.listen(8014, '10.199.14.46', function () {
});
// server.listen(8014, '10.199.14.46', () => {
// });
