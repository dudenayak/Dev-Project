let addtodoButton = document.getElementById("todoAdd");
let todoContainer = document.getElementById("todoContainer");
let inputField = document.getElementById("inputField");

addtodoButton.addEventListener("click", function () {
  var para = document.createElement("p");
  para.innerText = inputField.value;
  todoContainer.appendChild(para);
  inputField.value = "";
  para.addEventListener("click", function () {
    para.style.textDecoration = "line-through";
  });
  para.addEventListener("dblclick", function () {
    todoContainer.removeChild(para);
  });
});
