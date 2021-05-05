const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const port = process.env.PORT || 4001;

const index = require('./routes/index');

const app = express();
app.use(index);
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

let interval;

io.on('connect',(socket)=>{
   console.log('new client connected');
   if(interval){
       clearInterval(interval);
   }

   interval = setInterval(()=>{
       getApiEndPoint(socket);
   },1000);

   socket.on('product list',()=>{productList(socket)});

   socket.on('disconnect',()=>{
      console.log('user disconnected');
      clearInterval(interval);
   });
});

const getApiEndPoint = (socket) =>{
    const response = new Date();
    socket.emit('fromAPI',response);
}

const productList = (socket) =>{
    console.log('request received');
    const products = [1,2,34,5];
    socket.emit('product list',JSON.stringify(products));
}

server.listen(port,()=>{console.log(`server running at port ${port}`)});
