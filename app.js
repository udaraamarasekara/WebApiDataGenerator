import trains from './Trains.js';
import stations from './Stations.js';
import axios from 'axios'


// Example usage

function getNewLocation(current,end,movement)
{
  if(current>end)
  {
   if(current+movement>end)
    {
      return current-movement;
    } 
    else
    {
      return current +movement;
    }
  }
  else if(current<=end)
  {
    if(current+movement>end)
      {
        return current-movement;
      } 
      else
      {
        return current +movement;
      }
  }  
}




const user = "user";
const pass = "pass";
const encodedCredentials = Buffer.from(`${user}:${pass}`).toString('base64');
const api = axios.create({
  //  baseURL: `https://web-api-data-generator-666d4a95c768.herokuapp.com/`,
  baseURL:`http://localhost:3000`,
  headers:{
    'X-Requested-With':'XMLHttpRequest',
    'Accept':'application/json',
    'Authorization': `Basic ${encodedCredentials}`,
    'Content-Type': 'application/json'

  },
  withCredentials: true,
});
var trainpos = [
  {
      "train":"ruhunu kumari",
      "lat": "5.9496", 
      "lng": "80.5469" , 
  } ,
  {
      "train":"udarata manike",
      "lat": "7.2906", 
      "lng": "80.6337"
  },
  {
      "train":"yal devi",
      "lat": "9.6615", 
      "lng": "80.0255"  
  },
  {
      "train":"rajarata rajini",
      "lat": "5.9496", 
      "lng": "80.5469"
  },

];
function randomVal()
{
  return (Math.random()*0.015).toFixed(4);
}

function createValues()
{
   trains.map(train=>{
   let city2 = train.city2
   let city2lat = stations.find(station=> station.city==city2).lat
   let city2len = stations.find(station=>station.city==city2).lng
   trainpos.forEach(trainloc=>
    {
     if(trainloc.train == train.train)
     {
      trainloc.lat = getNewLocation(parseFloat(trainloc.lat),parseFloat(city2lat),parseFloat(randomVal())).toFixed(4).toString()
      trainloc.lng = getNewLocation(parseFloat(trainloc.lng),parseFloat(city2len), parseFloat(randomVal())).toFixed(4).toString()

     }
    }
   )

  })
  api.post('/trainLocation',trainpos)
}


createValues()
setInterval(createValues, 1000*60);


