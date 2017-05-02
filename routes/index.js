var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
const fs = require('fs');
var url = 'mongodb://localhost:27017/test';
var imagesFolder = "../front/src/assets/uploads/images/";

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
    req.checkBody({
        'user.email': {
            notEmpty: {
                errorMessage: 'Write your email!'
            },
            isEmail: {
                errorMessage: 'Invalid email address!'
            }
        },
        'user.name': {
            notEmpty: {
                errorMessage: 'Write your name!'
            }
        },
        'user.phone': {
            notEmpty: {
                errorMessage: 'Write your phone number!'
            },
            isNumeric: {
                errorMessage: 'Phone number must contain only numbers!'
            }
        }
    });

    req.getValidationResult().then(function(result) {
        var errors = result.useFirstErrorOnly().array();
        if(errors.length > 0){
            res.send({
                errors: errors,
                success: false
            });
        }
        else{
            var user = req.body.user;
            mongo.connect(url, function (err, db) {
                assert.equal(null, err);
                db.collection('users').insertOne(user, function (err, result) {
                    assert.equal(null, err);
                    db.close();
                    res.send({
                        errors: false,
                        success: true,
                        id: result.ops[0]._id
                    });
                });
            });
        }
    });
});

router.post('/add_image', function(req, res, next) {
    if(req.files){
        var file = req.files.photo;
        var fileName = file.name;
        var extention = fileName.substr(fileName.lastIndexOf('.')+1);
        var time = Math.round(new Date().getTime() / 1000);
        var newName = time + "." + extention;
        var image = {
            name: newName
        };
        file.mv(imagesFolder + newName,function (err) {
            if(err){
                console.log(err);
                res.send({
                    error: true,
                    success: false
                });
            }
            else{
                mongo.connect(url, function (err, db) {
                    assert.equal(null, err);
                    db.collection('images').insertOne(image, function (err, result) {
                        assert.equal(null, err);
                        console.log('added');
                        db.close();
                        res.send({
                            error: false,
                            success: true
                        });
                    });
                });
            }
        });
    }
});

router.get('/get_images', function(req, res, next) {
    mongo.connect(url, function (err, db) {
        var allPics = [];
        assert.equal(null, err);
        var cursor = db.collection('images').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            allPics.push(doc);
        }, function () {
            db.close();
            res.send(allPics);
        });
    });
});

router.post('/remove_pic', function(req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    fs.unlink(imagesFolder + name,function (err) {
        if(err){
            console.log(err);
            res.send({
                error: true,
                success: false
            });
        }
        else{
            mongo.connect(url, function (err, db) {
                assert.equal(null, err);
                db.collection('images').deleteOne({"_id":objectId(id)}, function (err, result) {
                    assert.equal(null, err);
                    console.log('Item deleted!');
                    db.close();
                    res.send({
                        error: false,
                        success: true
                    });
                });
            });
        }
    });
});

module.exports = router;
