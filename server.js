var express = require('express');
var cors = require('cors')
app.use(cors())
var app = express()
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var sql = require("mssql");
    // config for your database
    var config = {
        user: 'su',
        password: 'SaSa1212',
        server: '10.199.13.253', 
        database: 'nrp05111740000078'
    };
app.get('/datasiswa/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id, NRP,NAMA from ListSiswa', function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil")
            res.send(recordset.recordset);      
        });
    });
});


app.get('/', function (req, res) {
  res.end("Selamat Datang,Implementasi API get di Sql server, request map api di '10.199.14.46:8014/api/datasiswa'");
  // return "Implementasi API get di Sql server, request map api di '10.199.14.46:8014/api/datasiswa'"
});

app.post('/insertdata/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query("Insert Into ListSiswa values ('"+req.body.id+"','"+req.body.NRP+ "','"+req.body.NAMA+"')", function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil post dengan id " + req.body.id)
            res.send('yeet');
        });
    });
  });
  app.delete('/deletesiswa/:idDelete', function (req, res) {
    var request = new sql.Request();
    const id = req.params.idDelete;
    console.log(
        'diterima request delete ' + req.params.idDelete
    )
    request.query("Delete From ListSiswa where ListSiswa.id = '"+ id +"'", function (err, recordset) {
        if (err) console.log(err)
        console.log("berhasil Delete dengan id " + id)
        res.send('Berhasil');
    });
  });

  app.put('/editdata/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query("UPDATE ListSiswa set [NRP]='"+req.body.NRP+ "',[NAMA] = '"+req.body.NAMA+"' where ListSiswa.id ="+ req.body.id , function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit")
            res.send('yeet');
        });
    });
  });

  app.get('/datacount/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select count (*) as Data from ListSiswa' , function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
        });
    });
  });
var server = app.listen(8014, function () {
});
// server.listen(8014, '10.199.14.46', () => {
// });
