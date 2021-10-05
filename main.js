const express = require('express');
const fs = require('fs');
const app = express();

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "*");
    next();
})
const PORT = process.env.PORT || 3000;
let cities;

fs.readFile('data/cities.json', 'utf8', function(err, data){
    cities = JSON.parse(data);
});

app.get('/api/cities', (req, res, next) => {
    if (!req.query.ids) {
        next();
        return;
    }
    const queryStr = req.query.ids;
    const citiesNames = queryStr.split(',');
    const citiesWithInfo = citiesNames.map((cityName)=>cities.find(elem => elem.id === cityName));
    res.send(citiesWithInfo);
});

app.get('/api/cities', (req, res, next) => {
    if (req.query.all !== 'true') {
      next();
      return;
    }
    res.send(cities);
});

app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}!`);
});