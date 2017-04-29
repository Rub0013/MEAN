var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

router.get('/', function(req, res, next) {

});

router.get('/users', function(req, res, next) {
    mongo.connect(url, function (err, db) {
        var allUsers = [];
        assert.equal(null, err);
        var cursor = db.collection('users').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            allUsers.push(doc);
        }, function () {
            db.close();
            res.send(allUsers);
        });
    });
});

router.delete('/delete_user', function(req, res, next) {
    var id = req.query.id;
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('users').deleteOne({"_id":objectId(id)}, function (err, result) {
            assert.equal(null, err);
            console.log('Item deleted!');
            db.close();
            res.send({
                success:true
            });
        });
    });
});

router.post('/add_user', function(req, res, next) {
    var user = req.body.user;
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('users').insertOne(user, function (err, result) {
            assert.equal(null, err);
            db.close();
            res.send({
                id: result.ops[0]._id
            });
        });
    });
});

router.post('/add_image', function(req, res, next) {
    console.log(req.files);
    res.send({
        error:false
    });
    // if(req.files){
    //     var file = req.files.new_image;
    //     var fileName = file.name;
    //     var extention = fileName.substr(fileName.lastIndexOf('.')+1);
    //     var time = Math.round(new Date().getTime() / 1000);
    //     var newName = time+"."+extention;
    //     var image = {
    //         name: newName
    //     };
    //     file.mv("../public/uploads/images/" +newName,function (err) {
    //         if(err){
    //             console.log(err);
    //             res.send({
    //                 error:true
    //             });
    //         }
    //         else{
    //             mongo.connect(url, function (err, db) {
    //                 assert.equal(null, err);
    //                 db.collection('images').insertOne(image, function (err, result) {
    //                     assert.equal(null, err);
    //                     console.log('added');
    //                     db.close();
    //                 });
    //             });
    //             res.send({
    //                 error:false
    //             });
    //         }
    //     });
    // }
});

module.exports = router;
