const body = document.querySelector("body");

const img_Number = 4;

function handleImgLoad(){
    console.log("finished loading");
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `C:/vanilaJs_Clone/img/${imgNumber+1}.jpg`
   
    
    //image.addEventListener("loadend",handleImgLoad);
    image.classList.add("bgImage");
    body.prepend(image);
    
    
    //api에서 나온 게 아니라 로딩x
    
    //table listener를 이미지화 하기 위해 even listener를 연결
    /*body.appendChild(image);*/
}

function genRandom() {
    const number = Math.floor(Math.random()* img_Number);
    return number;
}//숫자

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();