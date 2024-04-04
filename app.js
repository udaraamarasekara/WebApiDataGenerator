const express = require('express');
const app = express();
const basicAuth = require('basic-auth')

 globalObj = {}
 var districts = ['Colombo','Kandy','Kalutara','Matale','Gampaha','Nuwara Eliya','Galle','Matara','Habmanthota','jaffna','Kilinochchi','Manner','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee','Kurunagala','puththalam','Anuradhapura','Polonnaruwa','Badulla','Monaragala','Rathnapura','Kegalle']

const maxTemperature = 40.00; 
const minTemperature = -10.00;

const minHumidity = 0.00; 
const maxHumidity = 1.00;

const minAirPressure = 900.00; 
const maxAirPressure = 1100.00;

const USERNAME = "backenduser";
const PASSWORD = "backendpass";
const auth = (req, res, next) => {
  const credentials = basicAuth(req);
   console.log(credentials)
   if (!credentials || credentials.name !== USERNAME || credentials.pass !== PASSWORD) {
    res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
      return res.status(401).send('Unauthorized');
  }

  return next();
};
app.use(auth);
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

app.get('/', (req, res) => {
    res.json({
     globalObj
    });
});
//app.listen(3000)
 app.listen(process.env.PORT || 3000)