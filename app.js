const express = require('express');
const cors = require('cors');
const app = express();
var corsOptions = {
    origin: ' https://backend-web-api-75f83f1efeee.herokuapp.com/ ',
    optionsSuccessStatus: 200 ,
    methods: "GET"
}
app.use(cors(corsOptions))
 globalObj = {}
 var districts = ['Colombo','Kandy','Kalutara','Matale','Gampaha','Nuwara Eliya','Galle','Matara','Habmanthota','jaffna','Kilinochchi','Manner','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee','Kurunagala','puththalam','Anuradhapura','Polonnaruwa','Badulla','Monaragala','Rathnapura','Kegalle']

const maxTemperature = 40.00; 
const minTemperature = -10.00;

const minHumidity = 0.00; 
const maxHumidity = 1.00;

const minAirPressure = 900.00; 
const maxAirPressure = 1100.00;


function randomVal(min,max)
{
  return (Math.random()*(max-min)+min).toFixed(2);
}

function createValues()
{
 globalObj = districts.map((district)=>{
   return {
     district:district,
     temperature: randomVal(minTemperature,maxTemperature),
     humidity: randomVal(minHumidity,maxHumidity),
     airPressure: randomVal(minAirPressure,maxAirPressure)
   }
  })  
}


createValues()
setInterval(createValues, 5000*60);

app.get('/',cors(), (req, res) => {
    res.json({
     globalObj
    });
});
app.listen(process.env.PORT || 3000)