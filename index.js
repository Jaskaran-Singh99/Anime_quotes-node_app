const express = require('express')
const axios = require('axios')
const fs = require('fs')
const app = express()

const homeFile = (fs.readFileSync('./public/index.html')).toString()

app.get('/', (req, res)=>{

        axios.get('https://animechan.vercel.app/api/quotes')
        .then(response=>{
            let newData = homeFile.replace('{%quotes%}', response.data[0].quote)
            newData = newData.replace('{%author%}', response.data[0].character)
            
            res.write(newData)
            res.end()
        })
    
        .catch(res=>{
            console.log(res.error)
        })


})

app.use(express.static('./public'))
const port = 3000
app.listen(port, '127.0.0.1')