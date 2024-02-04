const express = require('express');
const database = require('./server/db/database')
const app = express();
const port = process.env.PORT || 4200;
const userRouter = require('./server/routes/userRouter');
const shopRouter = require('./server/routes/shopRouter');
const timeSlotRouter = require('./server/routes/timeSlotRouter');

app.use(express.static('./dist/shears/'))
app.use(express.json())
app.use('/userApi',userRouter)
app.use('/shopApi',shopRouter)
app.use('/timeSlotApi',timeSlotRouter)
app.get('/*', (req, res) =>
    res.sendFile('index.html',{root:`${__dirname}/dist/shears/index.html`})
);

app.listen(port,()=>{console.log(`app listen on port : ${port}`)});