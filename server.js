const express = require('express');
const livreRoutes = require('./routes/livreRoutes')
const app = express();
app.use(express.json());
const port = 3000;
app.use('/api',livreRoutes);

app.listen(port,()=>{
    console.log(`app listening on port http://localhost:${port}`);
    
});