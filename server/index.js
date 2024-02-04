const express = require('express');
const database = require('./db/database')
const app = express();
const port = process.env.PORT || 4200;
const userRouter = require('./routes/userRouter');
const shopRouter = require('./routes/shopRouter');
const timeSlotRouter = require('./routes/timeSlotRouter');

app.use(express.static('./dist/shears/'))
app.use(express.json())
app.use('/userApi',userRouter)
app.use('/shopApi',shopRouter)
app.use('/timeSlotApi',timeSlotRouter)
app.get('/*', (req, res) =>
    res.sendFile('index.html',{root:'./dist/shears/'})
);

app.listen(port,()=>{console.log(`app listen on port : ${port}`)});