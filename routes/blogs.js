const express = require('express')
const router = express.Router()
const db = require('../db/db')
const moment = require('moment')
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");

router.post('/submitBlog',(req, res) =>{
    const tokenData = jwt.verify(req.headers.token,constants.privateKey)
    db.connectionPool.query({
        sql: 'select * from users where nick_name = ? and password = ?',
        values:[tokenData.nick_name,tokenData.password]
    },(err,result,fields)=>{
        if(err){
            console.log(err)
        }
        if(result && result.length === 1){
            const userId = result[0].id
            const currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            db.connectionPool.query({
                sql: 'insert into blogs(user_id,blog_title,blog_text,blog_update_date) values(?,?,?,?)',
                values:[userId,req.body.blog_title,req.body.blog_text,currentTime]
            },(err, result, fields) => {
                if(err){
                    console.log(err)
                }
                if(result.affectedRows === 1){
                    res.send(JSON.stringify({
                        status: 'OK'
                    }))
                }else{
                    res.send(JSON.stringify({
                        status: 'FAILED'
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


router.get('/getAllBlogs',(req,res)=>{
    db.connectionPool.query({
        sql: 'select * from blogs'
    },(err,result,fields)=>{
        console.log(result)
        res.send(JSON.stringify({
            blogsList: result
        }))
    })
})


router.post('/getBlogById',(req,res)=>{
    db.connectionPool.query({
        sql: 'select * from blogs where blog_id = ?',
        values: [req.body.blogId]
    },(err,result,fields)=>{
        if(err){
            console.log(err)
        }else{
            if(result && result.length === 1){
                res.send(JSON.stringify({
                    blogData: result[0]
                }))
            }
        }
    })
})



module.exports = router