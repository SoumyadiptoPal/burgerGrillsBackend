const connectToMongo=require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
//changed
app.use('/api/burgers', require('./routes/burgers'))
app.use('/api/Initialburgers', require('./routes/Initialburgers'))
app.use('/api/carts', require('./routes/cart'))
app.use('/api/order', require('./routes/order'))
app.use('/api/kitchen', require('./routes/kitchen'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;