var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
const fs = require('fs');
var url = 'mongodb://localhost:27017/test';
var usersPicsFolder = "../front/src/assets/uploads/users-images/";
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');
const saltRounds = 10;
var privateKey = '31FvVSm4XvjYOh5Y';

router.get('/get_user',function (req, res, next) {
    var id = req.query.id;
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection('users');
        collection.findOne({"_id":objectId(id)},{'email':1,'name':1,'phone':1,'image':1}, function (err, doc) {
            if (err) {
                res.send({
                    errors: err,
                    success: false
                });
            }
            if (doc) {
                res.send({
                    user: doc,
                    errors: false,
                    success: true
                });
            }
            db.close();
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

router.post('/register', function(req, res, next) {
    //Run this in the mongo shell for unique emails...
    // db.{collection name}.ensureIndex( { email: 1 }, { unique: true } )

    req.checkBody({
        'email': {
            notEmpty: {
                errorMessage: 'Write your email!'
            },
            isEmail: {
                errorMessage: 'Invalid email address!'
            }
        },
        'password': {
            notEmpty: {
                errorMessage: 'Write your password!'
            }
        },
        'name': {
            notEmpty: {
                errorMessage: 'Write your name!'
            }
        },
        'phone': {
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
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.password;
            var phone = req.body.phone;
            var user = {
                name: name,
                email: email,
                phone: phone
            }
            if(req.files){
                var file = req.files.userImage;
                var fileName = file.name;
                var extention = fileName.substr(fileName.lastIndexOf('.')+1);
                var time = Math.round(new Date().getTime() / 1000);
                var newName = time + "." + extention;
                file.mv(usersPicsFolder + newName,function (err) {
                    if(!err){
                    }
                });
                user.image = newName;
            }
            bcrypt.hash(password, saltRounds, function(err, hash) {
                user.password = hash;
                mongo.connect(url, function (err, db) {
                    assert.equal(null, err);
                    db.collection('users').createIndex( { "email": 1 }, { unique: true } );
                    db.collection('users').insertOne(user, function (err, result) {
                        if(err){
                            res.send({
                                errors: err,
                                success: false,
                            });
                        }
                        else{
                            var tokenData = {
                                name: result.ops[0].name,
                                id: result.ops[0]._id
                            };
                            var token = jwt.sign(tokenData, privateKey, { expiresIn: 60*60 });
                            res.send({
                                token: token,
                                errors: false,
                                success: true,
                                id: result.ops[0]._id,
                                name: result.ops[0].name,
                                image: result.ops[0].image
                            });
                        }
                        db.close();
                    });
                });
            });
        }
    });
});

router.post('/login', function(req, res, next) {

    req.checkBody({
        'login': {
            notEmpty: {
                errorMessage: 'Write your login!'
            }
        },
        'password': {
            notEmpty: {
                errorMessage: 'Write your password!'
            }
        }
    });

    req.getValidationResult().then(function(result) {
        var errors = result.useFirstErrorOnly().array();
        if(errors.length > 0) {
            res.send({
                errors: errors,
                success: false
            });
        }
        else{
            const login = req.body.login;
            const pass = req.body.password;
            mongo.connect(url, function (err, db) {
                assert.equal(null, err);
                var collection = db.collection('users');
                collection.findOne({email:login}, function (err, doc) {
                    if (err) {
                        res.send({
                            errors: err,
                            success: false
                        });
                    }
                    if (doc) {
                        bcrypt.compare(pass, doc.password, function(err, result) {
                            if(result){
                                var tokenData = {
                                    name: doc.name,
                                    id: doc._id
                                };
                                var token = jwt.sign(tokenData, privateKey, { expiresIn: 60 });
                                res.send({
                                    info: {
                                        token: token,
                                        name: doc.name,
                                        id: doc._id
                                    },
                                    errors: false,
                                    success: true
                                });
                            }
                            else{
                                if(err){
                                    res.send({
                                        errors: err,
                                        success: false
                                    });
                                }
                                else{
                                    res.send({
                                        errors: "Wrong password!",
                                        success: false
                                    });
                                }
                            }
                        });
                    }
                    else {
                        res.send({
                            errors: "Wrong login!",
                            success: false
                        });
                    }
                    db.close();
                });
            });
        }
    });
});

router.post('/verify', function(req, res, next) {
    const verifyToken = req.body.verifyToken;
    jwt.verify(verifyToken, privateKey, function(err, decoded) {
        if (err) {
            res.send({
                error: err,
                success: false
            });
        } else{
            res.send({
                error: false,
                success: true
            });
        }
    });
});

router.post('/remove_pic', function(req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    fs.unlink(usersPicsFolder + name,function (error) {
        mongo.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection('users').update({"_id":objectId(id)}, { $unset : { image : 1} }, function (err, result) {
                assert.equal(null, err);
                db.close();
                if(err){
                    res.send({
                        error: err,
                        success: false
                    });
                }
                else{
                    res.send({
                        error: false,
                        success: true
                    });
                }
            });
        });
    });
});

router.post('/change_pic', function(req, res, next) {
    var id = req.body.userId;
    var oldImg = req.body.oldImage;
    var file = req.files.newImage;
    var fileName = file.name;
    var extention = fileName.substr(fileName.lastIndexOf('.')+1);
    var time = Math.round(new Date().getTime() / 1000);
    var newName = time + "." + extention;
    file.mv(usersPicsFolder + newName,function (err) {
        if(err){
            console.log(err);
            res.send({
                error: true,
                success: false
            });
        }
        else{
            fs.unlink(usersPicsFolder + oldImg,function (error) {
                mongo.connect(url, function (err, db) {
                    assert.equal(null, err);
                    db.collection('users').update({"_id":objectId(id)}, { $set: { image : newName } }, function (err, result) {
                        assert.equal(null, err);
                        db.close();
                        if(err){
                            res.send({
                                info: {
                                  newImage: newName
                                },
                                error: err,
                                success: false
                            });
                        }
                        else{
                            res.send({
                                error: false,
                                success: true
                            });
                        }
                    });
                });
            });
        }
    });
});

router.post('/update_user', function(req, res, next) {
    var name = req.body.name;
    var phone = req.body.phone;
    var id = req.body.id;
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('users').updateOne({"_id":objectId(id)}, { $set: { name : name, phone : phone } }, function (err, result) {
            assert.equal(null, err);
            db.close();
            res.send({
                data: {
                    name: name,
                    phone: phone
                },
                errors: false,
                success: true,
            });
        });
    });
});


module.exports = router;
