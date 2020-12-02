const express = require('express');

const app = express();
app.use(() => {
    console.log('hellow server..');
    console.log('ini lagi');
})

// get '/users/ ==> [{name: usup}]

app.listen(4000);