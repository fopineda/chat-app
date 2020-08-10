const path = require('path')
const express = require('express')


const app = express()
const port = process.env.PORT || 3000 

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup static directory to serve (html, css, images, js)
app.use(express.static(publicDirectoryPath))


app.listen(port, () => {
    console.log('Server has successfully started on port: '+ port)
})