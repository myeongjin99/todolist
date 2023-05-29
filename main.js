/*form이라는 요소를 가져오기*/
const form = document.querySelector('form');

/*사용자가 어떤 텍스트를 입력했는지 가져오기*/
const input = document.querySelector('input');

/*submit이벤트가 일어날 때 input에서 사용자가 작성한 텍스트를 가져다가 리스트에 아이템으로 추가해줘야해서 ul태그 가져와야함*/
const ul = document.querySelector('ul');

/*  1.삭제 버튼 추가하기
    2. 저장 되게끔
    3. 삭제 버튼 => 저장된 데이터 업데이트
*/

/*전체 아이템을 저장할 배열*/
let todos = [];

const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const delItem = (event) => {
    const target = event.target.parentElement;
    /*type은 다르지만 내용물이 같으면 지워지게끔 =를 하나 뺀다*/
    todos = todos.filter((todo) => todo.id !== parseInt(target.id));
    save();

    target.remove();
}
const addItem = (todo) => {
    if(todo.text !== ''){
        /*li태그를 생성하여 사용자가 작성한 텍스트를 넣어보도록 하자*/
        const li = document.createElement('li');
        /*값이 들어갈 때마다 삭제버튼도 생겨야한다*/
        const button = document.createElement('button');
        const span = document.createElement('span');


        span.innerText = todo.text;
        button.innerText = '삭제';
        button.addEventListener('click',delItem)

        /*innerText속성에다가 사용자가 작성한 텍스트인 text의 값을 넣어줄 것이다.*/
        li.innerText = todo.text;
        /*ul태그의 자식요소로 붙여주기*/
        li.appendChild(span);
        li.appendChild(button);
        ul.appendChild(li);
        li.id = todo.id;


        /*input값을 넣고나면 자동으로 reset되게 해주는 것*/
        text = '';
    }
}
const handler = (event) => {
    event.preventDefault();


    const todo = {
        id: Date.now(),
        text: input.value,
    };
    /*todos라는 곳에 추가하기*/

    todos.push(todo);
    addItem(todo);
    save();

    input.value='';
}

const init = () => {
    const userTodos = JSON.parse(localStorage.getItem('todos'));

    if(userTodos){
        userTodos.forEach((todo) => {
            addItem(todo);

    });

    todos = userTodos;
    }
};
/*form에서 서브밋이 일어날 때 동작할 이벤트 리스너를 등록해보자*/
/*핸들러 함수를 작성해줄것이다*/
init();
form.addEventListener('submit',handler);

