const weather = document.querySelector(".js-weather");
const API_KEY = "9bf12800e52f8956a867b99d846753d0";
const COORDS = `coords`;//position 담을 객체

function getWeather(lat,lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;

    });
    //https 형식으로 써줘야함
}

//위도 경도 좌표 저장
function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        //Obj 안 붙여도 되지만 정확하게 하려고 이렇게 붙인 거
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
    //console.log(position);
}

function handleGeoError(){
    console.log("Can't access location.");
}

function askforCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
    //geolocation은 객체
    //현재 위치를 가져옴
}

function loadCoords() {
    const loadcords = localStorage.getItem(COORDS);//객체 가져오기
    if(loadcords ===null){
        askforCoords();//비어 있다면 정보 묻기
    }else{//이미 좌표를 가지고 있는 경우!
        const parseCoords = JSON.parse(loadcords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init()