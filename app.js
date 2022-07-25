
const express = require('express');
const { STATUS_CODES } = require('http');
const https = require('https');
const { removeData } = require('jquery');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function (req,res) {
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function (req,res) {

    const appId="afe672b4a3696023c59632675013c069"
    const query = req.body.cityName
    const units="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appId+"&units="+units
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDescrpition = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temp in "+query+" is "+temp+" degree celcius </h1>")
            res.write("<h1> Weather Description is "+weatherDescrpition+"</h1>")
            res.write("<img src="+imageURL+">");
            res.send()
        })
    })
})

app.listen(3000,function () {
    console.log('This is listing to port 3000');
})
