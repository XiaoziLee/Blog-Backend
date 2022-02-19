const express = require('express')
const router = express.Router()
const db = require('../db/db')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const constant = require('../utils/constants')
/*
insert sql statement result
OkPacket {
    fieldCount: 0,   
    affectedRows: 1, 
    insertId: 1,     
    serverStatus: 2, 
    warningCount: 0, 
    message: '',     
    protocol41: true,
    changedRows: 0   
}
*/
router.post('/register', (req, res)=> {
    console.log(req.body)
    let information = req.body
    db.connectionPool.query({
        sql:'insert into users (user_name,nick_name,password,email,phone_number) values(?,?,?,?,?)',
        values:[information.user_name,information.nick_name,md5(information.password),information.email,information.phone_number]
    },(err,result,fields)=>{
        if(err){
            console.log(err)
            res.send(JSON.stringify({
                status: 'NO'
            }))
        }else{
            console.log(result)
            res.send(JSON.stringify({
                status: 'OK'
            }))
        }
    })

})

/*
select statement result
[
  RowDataPacket {
    id: 1,
    user_name: 'lihangyu',
    nick_name: 'YangYiXiaoZi',
    password: '25f9e794323b453885f5181f1b624d0b',
    email: 'email',
    phone_number: 'phone_number'
  }
]
*/
router.get('/register', (req, res)=> {
    db.connectionPool.query({
        sql:'insert into users (user_name,nick_name,password,email,phone_number) values(?,?,?,?,?)',
        values:['lihangyu','YangYiXiaoZi',md5('123456789'),'2415358701@qq.com','18518069253']
    },(err,result,fields)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send(JSON.stringify({
            status: 'OK'
        }))
    })
})

/*
{ nick_name: 'YangYiXiaoZi', password: '123456789' }
*/
router.post('/login', (req, res)=> {
    let information = req.body
    console.log(information)
    db.connectionPool.query({
        sql:'select * from users where nick_name = ? and password = ?',
        values:[information.nick_name,md5(information.password)]
    },(err,result,fields)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        if(result && result.length === 1){
            jwt.sign({
                'nick_name': information.nick_name,
                'password': md5(information.password)
            },constant.privateKey,{
                algorithm: 'HS256',
                expiresIn: 60 * 60 * 24 * 365
            },(err,token)=>{
                if(err){
                    res.send(JSON.stringify({
                        status: 'FAILED',
                    }))
                }else {
                    res.send(JSON.stringify({
                        status: 'OK',
                        token: token
                    }))
                }
            })
        }else{
            res.send(JSON.stringify({
                status: 'FAILED'
            }))
        }
    })
})


router.get('/showAllUsers', (req, res)=> {
    db.connectionPool.query({
        sql:'select * from users'
    },(err,result,fields)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
})


router.get('/deleteAllUserInfo', (req, res)=> {
    db.connectionPool.query({
        sql:'truncate table users'
    },(err,result,fields)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
})

module.exports = router