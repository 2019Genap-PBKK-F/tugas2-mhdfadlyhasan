var express = require('express');
var cors = require('cors')
var app = express()
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json());

var sql = require("mssql");
    // config for your database
var config = {
    user: 'su',
    password: 'SaSa1212',
    server: '10.199.13.253', 
    database: 'nrp05111740000078'
};


app.post('/insertdatadasar/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query("Insert Into Data_Dasar values ('"+req.body.NAMA+ "')", function (err, recordset) {
            if (err) console.log(err)
            else console.log("berhasil post dengan id " + req.body.NAMA)
            res.send('berhasil mengirim data dasar');
        });
    });
  });
  app.get('/datadasar/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id,NAMA as name from Data_Dasar', function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil")
            res.send(recordset.recordset);      
        });
    });
});
app.put('/editdatadasar/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query("UPDATE Data_Dasar set [NAMA] = '"+req.body.NAMA+"'where Data_Dasar.id ="+ req.body.id , function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit data dasar")
            res.send('Berhasil ');
        });
    });
  });
  app.delete('/deletedatadasar/:idDelete', function (req, res) {
    var request = new sql.Request();
    const id = req.params.idDelete;
    request.query("Delete From Data_Dasar where Data_Dasar.id = '"+ id +"'", function (err, recordset) {
        if (err) console.log(err)
        console.log("berhasil Delete dengan id " + id)
        res.send('Berhasil');
    });
  });

  app.post('/insertkategoriunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query("Insert Into Kategori_Unit values ('"+req.body.NAMA+ "')", function (err, recordset) {
            if (err) console.log(err)
            else console.log("berhasil post dengan id " + req.body.NAMA)
            res.send('berhasil mengirim data dasar');
        });
    });
  });
  app.get('/kategoriunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id,nama as name from Kategori_Unit', function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil")
            res.send(recordset.recordset);      
        });
    });
});
app.put('/editkategoriunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query("UPDATE Kategori_Unit set [NAMA] = '"+req.body.NAMA+"'where Kategori_Unit.id ="+ req.body.id , function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit data dasar")
            res.send('Berhasil ');
        });
    });
  });
  app.delete('/deletekategoriunit/:idDelete', function (req, res) {
    var request = new sql.Request();
    const id = req.params.idDelete;
    request.query("Delete From Kategori_Unit where Kategori_Unit.id = '"+ id +"'", function (err, recordset) {
        if (err) console.log(err)
        console.log("berhasil Delete dengan id " + id)
        res.send('Berhasil');
    });
  });


  app.post('/insertunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query("Insert Into List_Unit values ('"+req.body.NAMA+ "','"+req.body.kategoriUnit+"')",
        function (err, recordset) {
            if (err) console.log(err)
            else console.log("berhasil post dengan id " + req.body.NAMA)
            res.send('berhasil mengirim data dasar');
        });
    });
  });
  app.get('/unit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id,NAMA as name,Kategori_Unit_id from List_Unit', function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil")
            res.send(recordset.recordset);      
        });
    });
});
app.put('/editunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query("UPDATE List_Unit set [NAMA] = '"+req.body.NAMA+"', [Kategori_Unit_id] = '"+req.body.Kategori+"' where List_Unit.id ="+ req.body.id , function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit data unit + " + req.body.Kategori)
            res.send('Berhasil ');
        });
    });
  });
  app.delete('/deleteunit/:idDelete', function (req, res) {
    var request = new sql.Request();
    const id = req.params.idDelete;
    request.query("Delete From List_Unit where List_Unit.id = '"+ id +"'", function (err, recordset) {
        if (err) console.log(err)
        console.log("berhasil Delete dengan id " + id)
        res.send('Berhasil');
    });
  });
  app.post('/insertcapaianunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query("Insert Into Capaian_Unit values ('"+req.body.Unit+"','"+req.body.Data_Dasar+"','"+req.body.Waktu+"','"+req.body.Capaian+"')",
        function (err, recordset) {
            if (err) console.log(err)
            else console.log("berhasil post dengan time" + req.body.Waktu)
            res.send('berhasil mengirim data dasar');
        });
    });
  });
  app.get('/capaianunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select Unit_Id, DataDasar_id , Waktu ,Capaian from Capaian_Unit', function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil")
            res.send(recordset.recordset);      
        });
    });
});
app.put('/editcapaianunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query("UPDATE Capaian_Unit set [Unit_Id] = '"+req.body.Unit+"', [DataDasar_id] = '"+req.body.Data_Dasar+"', [Capaian] = '"+ req.body.Capaian +"' where Capaian_Unit.Waktu ='"+ req.body.Waktu+"'", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil diedit data unit + " + req.body.Waktu)
                res.send('Berhasil ');
            }
            
        });
    });
  });
  app.delete('/deletecapaianunit/:idDelete', function (req, res) {
    var request = new sql.Request();
    const id = req.params.idDelete;
    console.log(id)
    request.query("Delete From Capaian_Unit where Capaian_Unit.waktu = '"+ id +"'", function (err, recordset) {
        if (err) console.log(err)
        console.log("berhasil Delete dengan id " + id)
        res.send('Berhasil');
    });
  });




app.get('/datasiswa/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id, NRP,NAMA,JENISKELAMIN,ANGKATAN from ListSiswa', function (err, recordset) {
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
        request.query("Insert Into ListSiswa values ('"+req.body.id+"','"+req.body.NRP+ "','"+req.body.NAMA+"','"+req.body.JENISKELAMIN+"','"+req.body.ANGKATAN+"')", function (err, recordset) {
            if (err) console.log(err)
            else console.log("berhasil post dengan id " + req.body.id)
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
        request.query("UPDATE ListSiswa set [NRP]='"+req.body.NRP+ "',[NAMA] = '"+req.body.NAMA+"',[JENISKELAMIN] = '"+req.body.JENISKELAMIN+"' ,[ANGKATAN] = '"+req.body.ANGKATAN+"' where ListSiswa.id ="+ req.body.id , function (err, recordset) {
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
        request.query('select TOP 1 id as Data from ListSiswa ORDER by id desc' , function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
        });
    });
  });
  app.get('/getkelamin/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query("select count(*) as jumlah from ListSiswa where JENISKELAMIN != '' GROUP BY JENISKELAMIN" , function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
            console.log(
                'someone get the data'
            )
        });
    });
  });
var server = app.listen(8014, function () {
});
// server.listen(8014, '10.199.14.46', () => {
// });
