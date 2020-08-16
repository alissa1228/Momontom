/*
1. 쿼리 셀렉터. : 원하는 셀렉터를 다 가져옴. 클래스,태그 css 선택 방식으로.(찾은 첫번째 것을 가져옴)
2. 쿼리셀렉터올 : 클래스 명에 따른 엘리먼트들을 모두 가져옴. 이건 array를 준다.
3. getelementbyID, getelementByTagName(태그로 엘리먼트를 가져옴. input body등등)
*/

const form = document.querySelector(".js-form"),
input = document.querySelector("input"),
greeting = document.querySelector(".js-greeting");
const user_ls = "currentUser",
showing_cn = "showing";

function handleSubmit(event){
    event.preventDefault(); //기본 이벤트 막기
    const currentValue = input.value;
    console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(showing_cn);
    form.addEventListener("submit",handleSubmit);
}

//local storage : 정보를 유저 컴퓨터에 저장하는 방법.

function paintGreeting(text) {
    form.classList.remove(showing_cn); //텍스트 색칠하려면 form을 숨겨야.
    greeting.classList.add(showing_cn);
    greeting.innerText = `Hello ${text}`;
}

function saveName(text){
    localStorage.setItem(user_ls,text);
}

function loadName(){
    const currentUser = localStorage.getItem(user_ls);
    if(currentUser === null) {
        askForName();
        
    }else{
        //유저O -> 로컬 스토리지에 있는 유저를 찍어줘라
        paintGreeting(currentUser);
    }
}


function init(){
    loadName();
}

init();

