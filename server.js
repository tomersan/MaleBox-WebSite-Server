//libaries
const express = require("express")
const cors = require("cors")
const path = require("path")
const http = require("http")
const { MAX } = require("mssql")


require('events').EventEmitter.defaultMaxListeners = MAX;
require('events').EventEmitter.prototype._maxListeners = MAX


//create port
const port = process.env.port||5001
process.setMaxListeners(0);

// app setting
var app = express()
app.use(cors())
app.use(express.json())

//routes and api
app.get(`/` , async(req , res)=>{
    res.send(`colololo`)
})

var bodyParser = require('body-parser');
var app = express();
var jsonParser       = bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' })

app.use(jsonParser);
app.use(urlencodedParser);

app.use(`/api/users` , require('./routes/user'))
app.use(`/api/items` , require('./routes/item'))
app.use(`/api/category` , require('./routes/category'))
app.use(`/api/order` , require('./routes/order'))
app.use(`/api/wishlist` , require('./routes/wishlist'))
app.use(`/api/itemsinorder` , require('./routes/itemsinorder'))
app.use(`/api/homepage` , require('./routes/homepage'))


//create the server
var server = http.createServer(app)

//run the server
server.listen(port, () => { console.log(`the server is live at http://localhost:${port}`) })

