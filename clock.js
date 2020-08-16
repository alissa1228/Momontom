const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("h1");
//query selector는 element의 자식을 탐색.


function getTime() {
    const date = new Date(); //객체라고 생각하면 됨.
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours <10 ? `0${hours}` : hours}:${minutes <10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    // ?가 if처럼 적용.   
    //seconds가 10보다 작으면 앞에 0을 붙여라, 아니면 그냥 seconds 출력.
}

function init() {//나눠서 문제해결 하기 위해 이렇게 만드는 거임
    getTime();
    setInterval(getTime,1000);
}

init();