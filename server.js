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
    user: 'sa',
    password: 'SaSa1212',
    server: '10.199.13.253', 
    database: 'nrp05111740000078'
};


app.post('/konkerdanname/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        console.log(req.body.name)
        request.input('name',sql.VarChar,req.body.name)
        // query to the database and get the records
        var query = 'select id from SatuanKerja where nama = \'' + req.body.name + '\''
        request.query(query, function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});

app.get('/login/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('email',sql.VarChar,req.query.email_user )
        // query to the database and get the records
        request.query('select id, nama from SatuanKerja where SatuanKerja.email = @email', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                res.send(recordset.recordset);      
            }
        });
    });
});

app.get('/konker/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        console.log(req.query.id_satker)
        request.input('id_satker',sql.UniqueIdentifier,req.query.id_satker )
        // query to the database and get the records
        request.query('select aspek,komponen_aspek,Nama,[Nama Master] as [Indikator Kinerja], Bobot, Target, Capaian from KontrakKerja where KontrakKerja.id_satker = @id_satker', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                res.send(recordset.recordset);      
            }
        });
    });
});


app.get('/abmas/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from abmas', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});


app.get('/testing/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        console.log(req.body.pesan)
        // query to the database and get the records
        request.query('select * from penelitian', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});


app.get('/publikasi/', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from publikasi', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});


app.get('/dosen/', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from dosen', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});

app.get('/abmas/', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from abmas', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});


app.get('/penelitian/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from penelitian', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});

app.post('/insertaspek/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('id',sql.UniqueIdentifier,req.body.id )
        request.input('aspek',sql.VarChar,req.body.aspek)
        request.input('komponen_aspek',sql.VarChar,req.body.komponen_aspek)
        //request.input('last_update',sql.VarChar,req.body.bobot )

        request.query("Insert Into aspek values " +
         "(@aspek,@komponen_aspek)", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil post dengan id ")
                res.send('berhasil mengirim data dasar');
            }
        });
    });
  });


  app.get('/aspek/', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id,aspek as name,komponen_aspek from aspek', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});



app.put('/editaspek/', function (req, res) {   
    var request = new sql.Request();
    
    request.input('id',sql.Int,req.body.id )
    request.input('aspek',sql.VarChar,req.body.aspek)
    request.input('komponen_aspek',sql.VarChar,req.body.komponen_aspek)

    sql.connect(config, function (err) {
        if (err) console.log(err);
        request.query("UPDATE aspek set " +
        " [komponen_aspek] = @komponen_aspek, "  + 
        " [aspek] = @aspek "  + 
        " where aspek.id = @id"
        , function (err, recordset) {
            if (err) console.log(err)
            else
            {
                console.log("berhasil diedit")
                res.send('Berhasil ');
            }
        });
    });
  });

  app.delete('/deleteaspek/:id/', function (req, res) {
    var request = new sql.Request();
    const id = req.params.id;
    var querys = "Delete From aspek where " +
    "aspek.id = '"+ id+"'"
    console.log(querys);
    sql.connect(config, function (err) {
        request.query( querys, function (err, recordset) {
        if (err) console.log(err)
        else
        {
            console.log("berhasil Delete dengan id ")
            res.send('Berhasil');
        }});
    });
    
  });



app.post('/insertsatuankerja/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('id',sql.UniqueIdentifier,req.body.id )
        request.input('id_jns_satker',sql.Int,req.body.id_jns_satker)
        request.input('id_induk_satker',sql.UniqueIdentifier,req.body.id_induk_satker  )
        request.input('nama',sql.VarChar,req.body.nama)
        request.input('email',sql.VarChar,req.body.email)
        request.input('expired_date',sql.DateTime,req.body.expired_date)
        //request.input('last_update',sql.VarChar,req.body.bobot )

        request.query("Insert Into satuankerja values " +
         "(NEWID() ,@id_jns_satker,@id_induk_satker,@nama,@email,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,@expired_date)", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil post dengan id " + req.body.id_periode)
                res.send('berhasil mengirim data dasar');
            }
        });
    });
  });


  app.get('/satuankerja/', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id,id_jns_satker,id_induk_satker, nama as name,email,create_date ,last_update ,expired_date from satuankerja order by create_date', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});



app.put('/editsatuankerja/', function (req, res) {   
    var request = new sql.Request();
    
    request.input('id',sql.UniqueIdentifier,req.body.id )
    request.input('id_jns_satker',sql.Int,req.body.id_jns_satker)
    request.input('id_induk_satker',sql.UniqueIdentifier,req.body.id_induk_satker  )
    request.input('nama',sql.VarChar,req.body.nama)
    request.input('email',sql.VarChar,req.body.email)
    request.input('expired_date',sql.DateTime,req.body.expired_date)

    sql.connect(config, function (err) {
        if (err) console.log(err);
        request.query("UPDATE satuankerja set " +
        " [id_jns_satker] = @id_jns_satker, "  + 
        " [id_induk_satker] = @id_induk_satker, "  + 
        " [nama] = @nama, "  + 
        " [email] = @email,  "  +
        " [expired_date] = @expired_date"  +
        " where satuankerja.id = @id"
        , function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit")
            res.send('Berhasil ');
        });
    });
  });

  app.delete('/deletesatuankerja/:id/', function (req, res) {
    var request = new sql.Request();
    const id = req.params.id;
    var querys = "Delete From satuankerja where " +
    "satuankerja.id = '"+ id+"'"
    console.log(querys);
    sql.connect(config, function (err) {
        request.query( querys, function (err, recordset) {
        if (err) console.log(err)
        else
        {
            console.log("berhasil Delete dengan id ")
            res.send('Berhasil');
        }});
    });
    
  });




app.post('/insertcapaianunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('id_satker',sql.UniqueIdentifier,req.body.id_satker )
        request.input('id_datadasar',sql.Int,req.body.id_datadasar)
        request.input('waktu',sql.DateTime,req.body.waktu )
        request.input('capaian',sql.Float,req.body.capaian )

        // query to the database and get the records
        request.query("Insert Into Capaian_Unit values (@id_satker,@id_datadasar,@waktu,@capaian)",
        function (err, recordset) {
            if (err) console.log(err)
            else res.send('berhasil mengirim data dasar');
        });
    });
  });
  app.get('/capaianunit/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id_satker,id_datadasar,waktu,capaian from Capaian_Unit', function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil")
            res.send(recordset.recordset);      
        });
    });
});
app.put('/editcapaianunit/', function (req, res) {
    var request = new sql.Request();
    request.input('id_satker',sql.UniqueIdentifier,req.body.id_satker )
    request.input('id_datadasar',sql.Int,req.body.id_datadasar)
    request.input('waktu',sql.DateTime,req.body.waktu )
    request.input('capaian',sql.Float,req.body.capaian )

    sql.connect(config, function (err) {
        if (err) console.log(err);
        request.query("UPDATE Capaian_Unit set " +
        " [capaian] = @capaian, "  + 
        " [waktu] = @waktu  "  +
        " where Capaian_Unit.id_datadasar = @id_datadasar  AND " +
        " Capaian_Unit.id_satker = @id_satker"
        , function (err, recordset) {
            if (err) console.log(err)
            else res.send('Berhasil ');
        });
    });
  });

  app.delete('/deletecapaianunit/:id_satker/:id_datadasar', function (req, res) {
    var request = new sql.Request();
    const id_satker  = req.params.id_satker;
    const id_datadasar  = req.params.id_datadasar ;
    var querys = "Delete From Capaian_Unit where " +  
    "Capaian_Unit.id_datadasar = "+ id_datadasar +" AND " +
    "Capaian_Unit.id_satker = '"+ id_satker+"'"
    sql.connect(config, function (err) {
         request.query(querys, function (err, recordset) {
        if (err) console.log(err)
        else res.send('Berhasil');
    });
    });

   
  });



  
app.post('/insertdatadasar/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('nama',sql.VarChar,req.body.nama)
        request.input('expired_date',sql.DateTime,req.body.expired_date)
        request.query("Insert Into Data_Dasar values (@nama, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,@expired_date)", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil post dengan id " + req.body.nama)
                res.send('berhasil mengirim data dasar');
            }
        });
    });
  });
  
  app.get('/datadasar/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id, nama as name, create_date,last_update,expired_date from Data_Dasar', function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil")
            res.send(recordset.recordset);      
        });
    });
});

app.put('/editdatadasar/', function (req, res) {
    var request = new sql.Request();
    request.input('id',sql.Int,req.body.id )
    request.input('nama',sql.VarChar,req.body.nama )
    request.input('expired_date',sql.DateTime,req.body.expired_date )

    sql.connect(config, function (err) {
        if (err) console.log(err);
        request.query("UPDATE Data_Dasar set " +
        " [nama] = @nama , "  + 
        " [expired_date] = @expired_date, "  + 
        " [last_update] = CURRENT_TIMESTAMP  "  +
        " where Data_Dasar.id = @id  "
        , function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit" + req.body.id)
            res.send('Berhasil ');
        });
    });
});

  app.delete('/deletedatadasar/:idDelete', function (req, res) {
    var request = new sql.Request();
    const id = req.params.idDelete;
    sql.connect(config, function (err) {
        
    request.query("Delete From Data_Dasar where Data_Dasar.id = '"+ id +"'", function (err, recordset) {
        if (err) console.log(err)
        console.log("berhasil Delete dengan id " + id)
        res.send('Berhasil');
    });
    });
  });












app.post('/insertjenis_satker/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('nama',sql.VarChar,req.body.nama )
        request.input('expired_date',sql.DateTime,req.body.expired_date )
        //request.input('last_update',sql.VarChar,req.body.bobot )

        request.query("Insert Into jenis_satker values " +
         "(@nama,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,@expired_date )", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil post dengan id " + req.body.id_periode)
                res.send('berhasil mengirim data dasar');
            }
        });
    });
  });

  app.get('/jenis_satker/', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id,nama as name,create_date ,last_update ,expired_date from jenis_satker', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});


app.put('/editjenis_satker/', function (req, res) {   
    var request = new sql.Request();
    request.input('id',sql.Int,req.body.id )
    request.input('nama',sql.VarChar,req.body.nama )
    request.input('expired_date',sql.DateTime,req.body.expired_date )
    console.log(req.body.expired_date )
    sql.connect(config, function (err) {
        if (err) console.log(err);
        request.query("UPDATE jenis_satker set " +
        " [nama] = @nama , "  + 
        " [expired_date] = @expired_date, "  + 
        " [last_update] = CURRENT_TIMESTAMP  "  +
        " where jenis_satker.id = @id  "
        , function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit " + req.body.id)
            res.send('Berhasil ');
        });
    });
  });

  app.delete('/deletejenis_satker/:id', function (req, res) {
    var request = new sql.Request();
    const id = req.params.id;
    var querys = "Delete From jenis_satker where " +  
    "jenis_satker.id  = "+ id
    console.log(querys);
    sql.connect(config, function (err) {
        
    request.query( querys, function (err, recordset) {
        if (err) console.log(err)
        else
        {
            console.log("berhasil Delete dengan id " + id)
            res.send('Berhasil');
        }
    });
    });
  });


















app.post('/insertindikator_satuankerja_log/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('id_periode',sql.Int,req.body.id_periode )
        request.input('id_master',sql.Int,req.body.id_master )
        request.input('id_satker',sql.UniqueIdentifier,req.body.id_satker )
        request.input('capaian',sql.Float,req.body.capaian)
        //request.input('last_update',sql.VarChar,req.body.bobot )

        request.query("Insert Into Indikator_SatuanKerja_Log values " +
         "(@id_satker,@id_periode,@id_master,@capaian, CURRENT_TIMESTAMP)", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil post dengan id " + req.body.id_periode)
                res.send('berhasil mengirim data dasar');
            }
        });
    });
  });

  app.get('/indikator_satuankerja_log/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id_periode,id_master,id_satker,capaian,create_date from indikator_satuankerja_log', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});
























app.post('/insertindikator_satuankerja/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('id_periode',sql.Numeric,req.body.id_periode )        
        request.input('id_master',sql.Int,req.body.id_master )
        request.input('id_satker',sql.UniqueIdentifier,req.body.id_satker )
        request.input('bobot',sql.Float,req.body.bobot)
        request.input('target',sql.Float,req.body.target)
        request.input('capaian',sql.Float,req.body.capaian)
        //request.input('last_update',sql.VarChar,req.body.bobot )

        request.query("Insert Into indikator_satuankerja values " +
         "(@id_periode,@id_master,@id_satker,@bobot,@target,@capaian,CURRENT_TIMESTAMP)", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil post dengan id " + req.body.id_periode)
                res.send('berhasil mengirim data dasar');
            }
        });
    });
  });


  app.get('/indikator_satuankerja/', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id_periode,id_master,id_satker,bobot,target,capaian,last_update from indikator_satuankerja', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});



app.put('/editindikator_satuankerja/', function (req, res) {   
    var request = new sql.Request();
    request.input('id_periode',sql.Numeric,req.body.id_periode )
    request.input('id_master',sql.Int,req.body.id_master )
    request.input('id_satker',sql.UniqueIdentifier,req.body.id_satker )
    request.input('bobot',sql.Float,req.body.bobot)
    request.input('target',sql.Float,req.body.target)
    request.input('capaian',sql.Float,req.body.capaian  )

    sql.connect(config, function (err) {
        if (err) console.log(err);
        request.query("UPDATE indikator_satuankerja set " +
        " [bobot] = @bobot, "  + 
        " [target] = @target, "  + 
        " [capaian] = @capaian, "  + 
        " [last_update] = CURRENT_TIMESTAMP  "  +
        " where indikator_satuankerja.id_periode= @id_periode  " + 
        " AND indikator_satuankerja.id_master = @id_master " +
        " AND indikator_satuankerja.id_satker = @id_satker " 
        , function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit")
            res.send('Berhasil ');
        });
    });
  });

  app.delete('/deleteindikator_satuankerja/:id/:id2/:id3', function (req, res) {
    var request = new sql.Request();
    const idperiode = req.params.id;
    const idmaster = req.params.id2;
    const idsatker = req.params.id3;
    var querys = "Delete From indikator_satuankerja where " +  
    "indikator_satuankerja.id_periode  = "+ idperiode+" AND " +
    "indikator_satuankerja.id_master  = "+ idmaster+" AND " +
    "indikator_satuankerja.id_satker LIKE '"+ idsatker+"%'"
    console.log(querys);
    sql.connect(config, function (err) {
        
    request.query( querys, function (err, recordset) {
        if (err) console.log(err)
        else
        {
            console.log("berhasil Delete dengan id ")
            res.send('Berhasil');
        }
    });
    });
  });










app.post('/insertperiode/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('nama',sql.VarChar,req.body.nama )
        //request.input('last_update',sql.VarChar,req.body.bobot )

        request.query("Insert Into periode values " +
         "(@nama,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil post dengan id " + req.body.id)
                res.send('berhasil mengirim data dasar');
            }
        });
    });
  });


  app.get('/periode/', function (req, res) {
    
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id,nama as name,create_date as Date, last_update from periode', function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil")
                res.send(recordset.recordset);      
            }
        });
    });
});



app.put('/editperiode/', function (req, res) {   
    var request = new sql.Request();
    request.input('id',sql.Numeric,req.body.id)
    request.input('nama',sql.VarChar,req.body.nama )

    sql.connect(config, function (err) {
        if (err) console.log(err);
        request.query("UPDATE periode set " +
        " [nama] = @nama, "  + 
        " [last_update] = CURRENT_TIMESTAMP  "  +
        " where periode.id= @id ", function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit")
            res.send('Berhasil ');
        });
    });
  });

  app.delete('/deleteperiode/:id', function (req, res) {
    var request = new sql.Request();
    const id = req.params.id;
    sql.connect(config, function (err) {
        
    request.query(
        "Delete From periode where periode.id = '"+ id+"'", function (err, recordset) {
        if (err) console.log(err)
        else
        {
            console.log("berhasil Delete dengan id " + id)
            res.send('Berhasil');
        }
    });
    });
  });







app.post('/insertindikatorperiode/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('id_master',sql.Int,req.body.id_master)
        request.input('id_periode',sql.Numeric,req.body.id_periode )
        request.input('bobot',sql.VarChar,req.body.bobot )

        request.query("Insert Into indikator_periode values " +
         "(@id_master,@id_periode,@bobot)", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil post dengan id " + req.body.id_master)
                res.send('berhasil mengirim data dasar');
            }
        });
    });
  });
   
  app.get('/indikatorperiode/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id_master,id_periode,bobot as name from indikator_periode', function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil")
            res.send(recordset.recordset);      
        });
    });
});
app.put('/editindikatorperiode/', function (req, res) {

    var request = new sql.Request();
    request.input('id_master',sql.Int,req.body.id_master)
    request.input('id_periode',sql.Numeric,req.body.id_periode )
    request.input('bobot',sql.VarChar,req.body.bobot )

    sql.connect(config, function (err) {
        if (err) console.log(err);
        request.query("UPDATE indikator_periode set " +
        " [bobot] = @bobot  "  +
        " where indikator_periode.id_periode = @id_periode AND indikator_periode.id_master = @id_master", function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit")
            res.send('Berhasil ');
        });
    });
  });

  app.delete('/deleteindikatorperiode/:id_master/:id_periode', function (req, res) {
    var request = new sql.Request();
    const id = req.params.id_master;
    const id2 = req.params.id_periode;
    console.log("Delete From indikator_periode where indikator_periode.id_master = '"+ id +"' AND " + 
    "indikator_periode.id_periode = " + id2 + " ")
    sql.connect(config, function (err) {
        
    request.query(
        "Delete From indikator_periode where indikator_periode.id_master = '"+ id +"' AND " + 
        "indikator_periode.id_periode = "+ id2
    , function (err, recordset) {
        if (err) console.log(err)
        else
        {
            console.log("berhasil Delete dengan id " + id)
            res.send('Berhasil');
        }
    });
    });
  });










app.post('/insertmasterindikator/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('id_aspek',sql.Int,req.body.id_aspek )
        request.input('id_penyebut',sql.Int,req.body.id_penyebut)
        request.input('id_pembilang',sql.Int,req.body.id_pembilang )
        
        request.input('nama',sql.VarChar,req.body.nama )
        request.input('deskripsi',sql.VarChar,req.body.deskripsi )
        request.input('default_bobot',sql.Float,req.body.default_bobot )
        request.input('expired_date',sql.DateTime,req.body.expired_date )

        request.query("Insert Into MasterIndikator values " +
         "(@id_aspek,@id_penyebut,@id_pembilang,@nama,@deskripsi,@default_bobot, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,@expired_date)", function (err, recordset) {
            if (err) console.log(err)
            else 
            {
                console.log("berhasil post dengan id " + req.body.id_penyebut)
                res.send('berhasil mengirim data dasar');
            }
        });
    });
  });
   
  app.get('/masterindikator/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select id,id_aspek,id_penyebut,id_pembilang, nama as name,deskripsi,default_bobot,expired_date from MasterIndikator', function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil")
            res.send(recordset.recordset);      
        });
    });
});
app.put('/editmasterindikator/', function (req, res) {
    
    var request = new sql.Request();
    request.input('id',sql.Int,req.body.id)
    request.input('id_aspek',sql.Int,req.body.id_aspek )
    request.input('id_penyebut',sql.Int,req.body.id_penyebut)
    request.input('id_pembilang',sql.Int,req.body.id_pembilang )
    request.input('nama',sql.VarChar,req.body.nama )
    request.input('deskripsi',sql.VarChar,req.body.deskripsi )
    request.input('default_bobot',sql.Float,req.body.default_bobot )
    //request.input('last_update',sql.DateTime,req.body.last_update  )
    request.input('expired_date',sql.DateTime,req.body.expired_date )

    sql.connect(config, function (err) {
        if (err) console.log(err);
        request.query("UPDATE MasterIndikator set " +
        " [id_penyebut] = @id_penyebut, "  + 
        " [id_pembilang] = @id_pembilang, "  + 
        " [id_aspek] = @id_aspek, "  + 
        " [nama] = @nama,  "  + 
        " [deskripsi] = @deskripsi,  "  + 
        " [default_bobot] = @default_bobot,  "  + 
        " [last_update] = CURRENT_TIMESTAMP,  "  + 
        " [expired_date] = @expired_date   "  + 
        " where MasterIndikator.id = @id", function (err, recordset) {
            if (err) console.log(err)
            console.log("berhasil diedit")
            res.send('Berhasil ');
        });
    });
  });

  app.delete('/deletemasterindikator/:idDelete', function (req, res) {
    var request = new sql.Request();
    const id = req.params.idDelete;
    sql.connect(config, function (err) {
        
    request.query("Delete From MasterIndikator where MasterIndikator.id = '"+ id +"'", function (err, recordset) {
        if (err) console.log(err)
        console.log("berhasil Delete dengan id " + id)
        res.send('Berhasil');
    });
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
    sql.connect(config, function (err) {
        
    request.query("Delete From Kategori_Unit where Kategori_Unit.id = '"+ id +"'", function (err, recordset) {
        if (err) console.log(err)
        console.log("berhasil Delete dengan id " + id)
        res.send('Berhasil');
    });
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
    sql.connect(config, function (err) {
        
    request.query("Delete From ListSiswa where ListSiswa.id = '"+ id +"'", function (err, recordset) {
        if (err) console.log(err)
        console.log("berhasil Delete dengan id " + id)
        res.send('Berhasil');
    });
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