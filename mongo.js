var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27001, {});//本地27001端口
var dbName = new mongodb.Db('todo', server, {});
dbName.open(function (error, client) {//数据库：mongotest
    if (error) throw error;
    var collection = dbName.collection('todo');//表：user
    collection.find(function (error, cursor) {
        cursor.each(function (error, doc) {
            if (doc) {
                console.log("name:" + doc.name + " age:" + doc.age);
            }
        });
    });
});

