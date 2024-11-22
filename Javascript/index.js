const databox=document.getElementById('databox');
const button=document.getElementById('search');
const errordata=document.getElementById("error-data");

button.addEventListener('click',()=>{
  const Latitude=document.getElementById('Latitude').value;
  const Longitude=document.getElementById('Longitude').value;

  if(Latitude && Longitude){
  weatherapi(Latitude,Longitude);
  locationapi(Latitude,Longitude);
  errordata.innerHTML="";
  databox.style.display="block";
  Latitude.value="";
  Longitude.value="";
  document.getElementById('Latitude').value = "";
  document.getElementById('Longitude').value = "";
  }
  else{
    errordata.style.textAlign="center";
    errordata.innerHTML="Enter Latitude and Longitude!!"
    databox.style.display="none";
  }
});





const weatherapi=async(lat,long)=>{
  try{
    const currentweather=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,wind_direction_10m`);
    const dailyweather=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,wind_speed_10m_max`);

    const currentresponse=await currentweather.json();
    const dailyresponse=await dailyweather.json();

    const currentobj=currentresponse.current;
    document.getElementById('temperature_2m').innerHTML=`${currentobj.temperature_2m}°C`;
    document.getElementById('relative_humidity_2m').innerHTML=`${currentobj.relative_humidity_2m}%`;
    document.getElementById('is_day').innerHTML=currentobj.is_day;
    document.getElementById('wind_direction_10m').innerHTML=`${currentobj.wind_direction_10m}°`;
    document.getElementById('wind_speed_10m').innerHTML=`${currentobj.wind_speed_10m}km/h`;
    document.getElementById('time').innerHTML=currentobj.time;
    
    const dailyobj=dailyresponse.daily;
    for(let i=0;i<=6;i++){
      document.getElementById(`temp_max_${i}`).innerHTML=`${dailyobj.temperature_2m_max[i]}°C`;
      document.getElementById(`temp_min_${i}`).innerHTML=`${dailyobj.temperature_2m_min[i]}°C`;
      document.getElementById(`sunrise_${i}`).innerHTML=dailyobj.sunrise[i];
      document.getElementById(`sunset_${i}`).innerHTML=dailyobj.sunset[i];
      document.getElementById(`uv_max_${i}`).innerHTML=dailyobj.uv_index_max[i];
      document.getElementById(`wind_speed_max_${i}`).innerHTML=`${dailyobj.wind_speed_10m_max[i]}km/h`;
    }

  }catch(e){
    console.log("Error",e);
    
  }
} 



const locationapi= async (lat,long)=>{
  try{
    const api= await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`)
  
    const response=await api.json()
    const address=response.address
   document.getElementById('cityname').innerHTML=address.state_district;
   document.getElementById('state').innerHTML=address.state;
  }catch(e){
    console.log("Error",e);
  }
}



