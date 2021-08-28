import "./style.css";

const fetch = require('node-fetch');

const ul = document.querySelector("ul");

const form = document.querySelector("form");
const input = document.querySelector("form > input");



const todos = [
  {
    text: "Sera présent(e)",
    done: true,
    editMode: false
  },
  {
    text: "Ne sais pas encore",
    done: false,
    editMode: true
  }
];


form.addEventListener("submit", event => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});


const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if(todo.editMode){
      return createTodoEditElement(todo, index);
    }
    else{
        return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};



const createTodoElement = (todo, index) => {
  const li = document.createElement("li");

  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = `
    <i class="far fa-trash-alt"></i>
  `;
  buttonDelete.classList.add("delete");

  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = `<i class="fas fa-pen"></i>`;
  buttonEdit.classList.add("edit");

  buttonDelete.addEventListener("click", event =>{
    event.stopPropagation();
    deleteTodo(index);
  });

  buttonEdit.addEventListener("click", event =>{
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
  `;

  //  afficher ce p avec classe done si je veux barrer ma todo :
  //<p class="${todo.done ? "done" : ""}">${todo.text}</p>


  li.addEventListener("click", event =>{
    toggleTodo(index);
  });
  li.append(buttonEdit, buttonDelete);
  return li;
};


const createTodoEditElement = (todo, index) =>{
const li = document.createElement("li");

const input = document.createElement("input");
input.type = "text";
input.value = todo.text;
input.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    editTodo(index, input);
  }
});
input.addEventListener("click", event => {
    input.value = "";
  });


const buttonSave = document.createElement("button");
buttonSave.innerHTML = `
  <i class="fas fa-check"></i>
`;
buttonSave.classList.add("edit");

buttonSave.addEventListener("click", event =>{
  event.stopPropagation();
  editTodo(index, input);
});

const buttonCancel = document.createElement("button");
buttonCancel.innerHTML = `<i class="fas fa-times"></i>`;
buttonCancel.classList.add("delete");

buttonCancel.addEventListener("click", event =>{
  event.stopPropagation();
  toggleEditMode(index);
});

li.append(input, buttonSave, buttonCancel);
return li;
};


const addTodo = text => {
  text = text.trim();
  if(text){
  todos.push({
    text: `${text[0].toUpperCase()}${text.slice(1)}`,
    done: false
  });
  displayTodo();
}
};


const deleteTodo = index =>{
  todos.splice(index, 1)
  displayTodo();
};


const toggleTodo = index =>{
  todos[index].done = !todos[index].done;
  displayTodo();
};


const toggleEditMode = index =>{
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};


const editTodo = (index, input) =>{
const value = input.value;
todos[index].text = value;
todos[index].editMode = false;
displayTodo();
};

displayTodo();



// SYNTAXE DE FETCH :


// fausse requête récupérée sur https://jsonplaceholder.typicode.com/
// la requête est ensuite passée dans fetch()
// dans cet exemple, je choisis de récupérer une liste de users

const promesse = fetch('https://jsonplaceholder.typicode.com/users');
// cette requête va me retourner une promesse qui sera tenue si le serveur répond
// la promesse est résolue avec un objet response
// async me permet de la transformer en fonction asychrone
promesse.then
(async response =>{
  console.log(response);
  // pour récupérer ma liste de users :
  //j'appelle une méthode json qui retourne une promesse
  // OU j'appelle une méthode text (pour récupérer mes données sous forme de text)

  try{
    //const users = await response.json();
    //OU
    const users = await response.text();
    // que je peux parser en JSON pour obtenir aussi un résultat JSON
    console.log(JSON.parse(users));
    console.log(users);
  }
  catch(e){
    console.log(e);
  }
  })
  .catch(err => console.log(err));

  // Date : REVOIR LE INNERHTML

  const addTiming = () => {
    const time = document.querySelector(".timing");
    let date = new Date();
    let n = date.getMonth();
    let g = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let month = ["jan", "fev", "mars", "avril", "mai", "juin", "juillet", "aout", "sept", "oct", "nov", "dec"];
    let a = month[n];
    const textTime = `Nous sommes le ${g} ${a} et il est ${h}h${m}`;

    time.innerHTML = textTime;
    console.log("affiche toi");
  }
  addTiming();

  /*window.addEventListener('DOMContentLoaded', () => {
 const addTiming = () => {
   console.log("affiche toi");
   const time = document.querySelector(".timing");
   let date = new Date();
   let n = date.getMonth();
   let g = date.getDate();
   let h = date.getHours();
   let m = date.getMinutes();
   let month = ["jan", "fev", "mars", "avril", "mai", "juin", "juillet", "aout", "sept", "oct", "nov", "dec"];
   let a = month[n];
   const textTime = `Nous sommes le ${g} ${a} et il est ${h}h${m}`;

   time.innerHTML = textTime;
   console.log("affiche toi");
 }

 addTiming();
});*/
