const toDoForm = document.querySelector(".js-toDoForm");
const toDoinput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const ToDos_LS = "toDos";

let toDos = []; //할 일 저장하려고 만든 배열

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    //parentNode는 console.dir로 출력해서 찾았음.
    toDoList.removeChild(li);
    //to do를 깨끗하게 만들거임
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
        //모든 toDos가 'li'의 id와 같지 않을 때
        //parseInt -> string을 숫자로!
    });
    //array 안에 있는 모든 toDos를 통할거임. true인 것들(id가 1일 경우만!)인 toDos만 return.
 
    toDos = cleanToDos //바꾼 뒤 toDos에 저장
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(ToDos_LS,JSON.stringify(toDos));
}
    

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;//비어있으니까 +1
    span.innerText = text; //submit function에서 온 값.
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    li.id = newId;
    const toDoObj = {
        text : text,
        id: newId 
    };
    toDos.push(toDoObj);
    saveToDos(); //push 한 이후 호출. 전에 호출해버리면 불러도 저장할 게 아무것도 없음. toDos가 비어 있으니까!

}

//이렇게 하는 이유...local storage에도 투두를 저장해야 하기 때문.

//local storage에는 자바스크립의 data를 저장할 수 x

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoinput.value;
    paintToDo(currentValue);
    toDoinput.value=""; // 텍스트를 입력하고 엔터를 치면 사라지게 하기
}

function loadTodos() {
    const loadedToDos = localStorage.getItem(ToDos_LS);
    if(loadedToDos !== null){//불러오기 작업.
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        
        /*함수호출x,안에다 바로 만듬. 이 함수를 parsedToDos에 있는 것들을 각각에 대해 실행해줄 거임. 그 각각을 toDo라고 칭할거임.
        => parsedToDos에 저장되어 있는 각자의 text들이 console.log된 걸 볼 수 있음.
        */
    }
}


function init(){
    loadTodos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();