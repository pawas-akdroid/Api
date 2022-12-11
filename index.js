const express = require('express')
const app = express()
const axios = require("axios")
require('dotenv').config({ encoding: 'latin1' })
const port = process.env.APP_PORT
// const PointDomain = process.env.PointDomain
const PointDomain = `http://localhost:6001/api/v1/merchant/`


const cors = require('cors');
const helmet = require('helmet');
const { ApiValidators } = require('./src/validators/Main');
const { errorHandler } = require('./src/responses/Responses')

app.use(
    helmet({
        crossOriginResourcePolicy: { policy: 'same-site' }
    })
)
app.use(cors())
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(express.json({ limit: '2mb' }))
app.post("/merchant-api",ApiValidators, (req, res)=>{
    axios.post(`${PointDomain}/main-api-controller`, req.body).then((data)=>{
        errorHandler(res, data)
    }).catch((err)=>{
        errorHandler(res, err)
    })
})
app.listen(port, () => console.log(`Server - ${process.pid} http://localhost:${port}`))
