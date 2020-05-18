
window.addEventListener("load",()=>{

    let long;
    let lat;
    //getting html elements
    let curTemp = document.querySelector(".temperature-degree");
    let tempDescr = document.querySelector(".temperature-description");
    let timeZone = document.querySelector(".location-timezone");
    let getIcon = document.querySelector(".location");
    let url = "http://openweathermap.org/img/wn/"; //10d@2x.png"
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const key = "09e5c52ec07e9419af52dd31544416e9";
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            fetch(api)
                .then(value=>{
                    return value.json();
                })
                .then(getInfo)
            
        })
    }
    let getInfo = (json)=>{
        let currentTemperature = json.main.temp;
        let tempFa = (currentTemperature-273.15) * 9/5 + 32
        tempFa = Math.round(tempFa);
        curTemp.innerText = tempFa;
        //description
        let des = (json.weather[0].description);
        tempDescr.innerText = des;
        //time zone
        let currentLocation = json.name;
        timeZone.innerText = currentLocation;
        //icons
       let getCurrentIcon = json.weather[0].icon;
       let finalUrl = `${url}${getCurrentIcon}@2x.png`;
       let img = document.createElement("img");
       img.src = finalUrl;
       getIcon.appendChild(img);
    }
});