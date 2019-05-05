var express = require('express');
var app     = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
app.set('view engine', 'ejs');

app.get('/index',function(req,res)
{
res.sendfile(__dirname+'/index.html');
});
app.get('/Chart',function(req,res)
{
res.sendfile(__dirname+'/Chart.js');
});


app.get('/select1',function(req,res)
{
MongoClient.connect(url, function(err, db) 
{
    if (err) throw err;
   
    dbo = db.db("chart");
    // myobj={name:name,email:email,feed_msg:feed}
    dbo.collection("chart").find({}).toArray(function(err, result) {
        if (err) throw err;
    // console.log("1 document inserted");
    console.log(result)
    // for(var i = 0; i < result.length;i++){
    //     console.log("hai")
    //     console.log(result[i]);
    // } 
    db.close(); 

res.render("pages/select1",
{
    output:result
})  
    })
});
});


app.get('/select2',function(req,res)
{
MongoClient.connect(url, function(err, db) 
{
    if (err) throw err;
   
    dbo = db.db("chart");
    // myobj={name:name,email:email,feed_msg:feed}
    var query = { votes: {$lt:10} };
    dbo.collection("chart").find(query).toArray(function(err, result) {
        if (err) throw err;
    // console.log("1 document inserted");
    console.log(result)
    // for(var i = 0; i < result.length;i++){
    //     console.log("hai")
    //     console.log(result[i]);
    // } 
    db.close(); 

res.render("pages/select1",
{
    output:result
})  
    })
});
});


app.listen('8000');
app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});