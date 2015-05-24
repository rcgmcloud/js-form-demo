var items = [];

window.onload  = function(){
  var request = new XMLHttpRequest();
  request.onload = function(){
    items = this.response;
    appendItemList(items);
  };
  request.responseType = 'json';
  request.open('GET', 'http://localhost:3000/items', true);
  request.send();
}

function appendItemList(items){
  if(!(items instanceof Array)){
    items = [items];
  }
  items.forEach(function(item) {
    if(item.hasOwnProperty('description')){
      var paragraph = document.createElement('p');
      paragraph.innerHTML = item.description;
      paragraph.id = item.id;
      document.body.appendChild(paragraph);
    }
  })
}

//======================================

var form = document.createElement('form');
form.method = "POST";
form.action = "http://localhost:3000/items";

form.onsubmit = function(event){
  event.preventDefault();
  var descriptionValue = document.querySelector('input[name="description"]').value;
  var nameValue = document.querySelector('input[name="name"]').value;
  var emailValue = document.querySelector('input[name="email"]').value;
  submitItem({name: nameValue, description: descriptionValue, email: emailValue});
  this.reset();
};

function submitItem(item){
  var request = new XMLHttpRequest();
  request.onload = function(){
    items = this.response;
    appendItemList(items);
  };
  request.responseType = 'json';
  request.open('POST', 'http://localhost:3000/items', true);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(item));
}

function InputField(name){
  var input = document.createElement('input');
  input.name = name;
  input.placeholder = name;
  form.appendChild(input);
}

new InputField('name');
new InputField('description');
new InputField('email');

var button = document.createElement('button');

button.innerHTML = "Submit";
button.type = "submit";
document.body.appendChild(form);
form.appendChild(button);


function submitGithubForm(event){
  var username = input.value;
  form.action = "https://api.github.com/users/" + username + "/repos";
}

//function DeleteItem()