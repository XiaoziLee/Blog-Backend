const express = require("express")
const user = require("./routes/user")
const blog = require('./routes/blogs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const port = 4000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/user",user)
app.use('/blogs',blog)



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})